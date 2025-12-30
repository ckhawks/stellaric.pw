import "dotenv/config";
import express, { Express, Request } from "express";
import { WebSocketServer, WebSocket } from "ws";
import http from "http";
import { RedisClient } from "./src/redis";
import { MessageHandler } from "./src/message-handler";
import { ConnectionMetadata, ClientMessage, WSMessage } from "./src/types";
import { getClientIP, hashIP } from "./src/utils";
import { testConnection, incrementClickCounter, canClickIP } from "./src/database";

const app: Express = express();
const PORT = parseInt(process.env.PORT || "8080", 10);

let messageHandler: MessageHandler;
let redisClient: RedisClient;
const connectedClients = new Map<WebSocket, ConnectionMetadata>();

// Express health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    connectedClients: connectedClients.size,
  });
});

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// WebSocket connection handling
wss.on("connection", (ws: WebSocket, req: http.IncomingMessage) => {
  const clientIP = getClientIP(req);
  const ipHash = hashIP(clientIP);

  // Check connection limit per IP
  if (!messageHandler.getConnectionLimiter().canConnect(ipHash)) {
    console.warn(`Connection rejected: IP ${ipHash.substring(0, 8)}... exceeded max connections`);
    ws.send(
      JSON.stringify({
        type: "error",
        error: "Too many connections from your IP",
      })
    );
    ws.close();
    return;
  }

  console.log(`New WebSocket connection from ${ipHash.substring(0, 8)}... (${connectedClients.size + 1} total)`);

  // Send initial connection confirmation
  const connectionMessage: WSMessage = {
    type: "connection",
    payload: { message: "Connected to chat server" },
  };
  ws.send(JSON.stringify(connectionMessage));

  // Handle incoming messages
  ws.on("message", async (data: Buffer) => {
    try {
      const clientMessage: ClientMessage = JSON.parse(data.toString());

      if (clientMessage.type === "request_history") {
        const userId = clientMessage.payload.userId;
        if (!userId) {
          ws.send(
            JSON.stringify({
              type: "error",
              error: "Missing userId",
            })
          );
          return;
        }

        // Track connection
        connectedClients.set(ws, {
          userId,
          connectedAt: new Date(),
        });

        // Send message history
        const messages = await messageHandler.getInitialMessages(100);
        const historyMessage: WSMessage = {
          type: "history",
          payload: messages.map((msg) => ({
            id: msg.id,
            anonymous_user_id: msg.anonymous_user_id,
            pseudonym: msg.pseudonym,
            message: msg.message,
            timestamp: msg.timestamp.toISOString(),
          })),
        };
        ws.send(JSON.stringify(historyMessage));
      } else if (clientMessage.type === "send_message") {
        const { userId, message } = clientMessage.payload;

        if (!userId || !message) {
          ws.send(
            JSON.stringify({
              type: "error",
              error: "Missing userId or message",
            })
          );
          return;
        }

        const result = await messageHandler.handleIncomingMessage(
          userId,
          message,
          ipHash
        );

        if (!result.success) {
          ws.send(
            JSON.stringify({
              type: "error",
              error: result.error,
            })
          );
        }
        // Success response sent via Redis pub/sub broadcast
      } else if (clientMessage.type === "click") {
        // Handle click counter increments
        try {
          const canClick = await canClickIP(ipHash);

          if (!canClick) {
            ws.send(
              JSON.stringify({
                type: "error",
                error: "Rate limited. You can click once per second.",
              })
            );
            return;
          }

          const newCount = await incrementClickCounter();

          // Broadcast new click count to all clients
          await redisClient.publishClick({
            total_clicks: newCount.toString(),
            timestamp: new Date().toISOString(),
          });

          console.log(`Click recorded from ${ipHash.substring(0, 8)}..., new total: ${newCount}`);
        } catch (error) {
          console.error("Error handling click:", error);
          ws.send(
            JSON.stringify({
              type: "error",
              error: "Failed to process click",
            })
          );
        }
      }
    } catch (error) {
      console.error("Error processing WebSocket message:", error);
      ws.send(
        JSON.stringify({
          type: "error",
          error: "An error occurred",
        })
      );
    }
  });

  // Handle client disconnect
  ws.on("close", () => {
    connectedClients.delete(ws);
    messageHandler.getConnectionLimiter().recordDisconnect(ipHash);
    console.log(`Client disconnected from ${ipHash.substring(0, 8)}... (${connectedClients.size} remaining)`);
  });

  // Handle errors
  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

// Subscribe to Redis messages and broadcast to all connected clients
function setupRedisBroadcast() {
  redisClient.subscribeToMessages((message) => {
    const broadcastMessage: WSMessage = {
      type: "message",
      payload: message,
    };

    const messageString = JSON.stringify(broadcastMessage);

    // Send to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(messageString);
      }
    });

    console.log(`Broadcasted message to ${wss.clients.size} clients`);
  });

  // Subscribe to click updates
  redisClient.subscribeToClicks((clickData) => {
    const broadcastMessage: WSMessage = {
      type: "click_update",
      payload: clickData,
    };

    const messageString = JSON.stringify(broadcastMessage);

    // Send to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(messageString);
      }
    });

    console.log(`Broadcasted click update to ${wss.clients.size} clients`);
  });
}

// Start server
async function startServer() {
  try {
    // Test database connection
    console.log("Testing database connection...");
    const dbConnected = await testConnection();
    if (!dbConnected) {
      throw new Error("Failed to connect to database");
    }
    console.log("Database connection successful");

    // Initialize Redis client
    redisClient = new RedisClient();
    console.log("Redis client initialized");

    // Initialize message handler
    messageHandler = new MessageHandler(redisClient);
    console.log("Message handler initialized");

    // Setup Redis broadcast
    setupRedisBroadcast();
    console.log("Redis broadcast listener setup");

    // Start HTTP server
    server.listen(PORT, () => {
      console.log(`WebSocket server running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully...");
  server.close(() => {
    console.log("HTTP server closed");
  });

  // Close all WebSocket connections
  wss.clients.forEach((client) => {
    client.close();
  });

  // Cleanup resources
  if (messageHandler) {
    messageHandler.destroy();
  }
  if (redisClient) {
    await redisClient.close();
  }

  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("SIGINT received, shutting down gracefully...");
  server.close(() => {
    console.log("HTTP server closed");
  });

  // Close all WebSocket connections
  wss.clients.forEach((client) => {
    client.close();
  });

  // Cleanup resources
  if (messageHandler) {
    messageHandler.destroy();
  }
  if (redisClient) {
    await redisClient.close();
  }

  process.exit(0);
});

startServer();
