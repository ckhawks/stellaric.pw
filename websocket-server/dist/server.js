"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const http_1 = __importDefault(require("http"));
const redis_1 = require("./src/redis");
const message_handler_1 = require("./src/message-handler");
const utils_1 = require("./src/utils");
const database_1 = require("./src/database");
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || "8080", 10);
let messageHandler;
let redisClient;
const connectedClients = new Map();
// Express health check endpoint
app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        connectedClients: connectedClients.size,
    });
});
const server = http_1.default.createServer(app);
const wss = new ws_1.WebSocketServer({ server });
// WebSocket connection handling
wss.on("connection", (ws, req) => {
    const clientIP = (0, utils_1.getClientIP)(req);
    const ipHash = (0, utils_1.hashIP)(clientIP);
    // Check connection limit per IP
    if (!messageHandler.getConnectionLimiter().canConnect(ipHash)) {
        console.warn(`Connection rejected: IP ${ipHash.substring(0, 8)}... exceeded max connections`);
        ws.send(JSON.stringify({
            type: "error",
            error: "Too many connections from your IP",
        }));
        ws.close();
        return;
    }
    console.log(`New WebSocket connection from ${ipHash.substring(0, 8)}... (${connectedClients.size + 1} total)`);
    // Send initial connection confirmation
    const connectionMessage = {
        type: "connection",
        payload: { message: "Connected to chat server" },
    };
    ws.send(JSON.stringify(connectionMessage));
    // Handle incoming messages
    ws.on("message", async (data) => {
        try {
            const clientMessage = JSON.parse(data.toString());
            if (clientMessage.type === "request_history") {
                const userId = clientMessage.payload.userId;
                if (!userId) {
                    ws.send(JSON.stringify({
                        type: "error",
                        error: "Missing userId",
                    }));
                    return;
                }
                // Track connection
                connectedClients.set(ws, {
                    userId,
                    connectedAt: new Date(),
                });
                // Send message history
                const messages = await messageHandler.getInitialMessages(100);
                const historyMessage = {
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
            }
            else if (clientMessage.type === "send_message") {
                const { userId, message } = clientMessage.payload;
                if (!userId || !message) {
                    ws.send(JSON.stringify({
                        type: "error",
                        error: "Missing userId or message",
                    }));
                    return;
                }
                const result = await messageHandler.handleIncomingMessage(userId, message, ipHash);
                if (!result.success) {
                    ws.send(JSON.stringify({
                        type: "error",
                        error: result.error,
                    }));
                }
                // Success response sent via Redis pub/sub broadcast
            }
        }
        catch (error) {
            console.error("Error processing WebSocket message:", error);
            ws.send(JSON.stringify({
                type: "error",
                error: "An error occurred",
            }));
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
        const broadcastMessage = {
            type: "message",
            payload: message,
        };
        const messageString = JSON.stringify(broadcastMessage);
        // Send to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                client.send(messageString);
            }
        });
        console.log(`Broadcasted message to ${wss.clients.size} clients`);
    });
}
// Start server
async function startServer() {
    try {
        // Test database connection
        console.log("Testing database connection...");
        const dbConnected = await (0, database_1.testConnection)();
        if (!dbConnected) {
            throw new Error("Failed to connect to database");
        }
        console.log("Database connection successful");
        // Initialize Redis client
        redisClient = new redis_1.RedisClient();
        console.log("Redis client initialized");
        // Initialize message handler
        messageHandler = new message_handler_1.MessageHandler(redisClient);
        console.log("Message handler initialized");
        // Setup Redis broadcast
        setupRedisBroadcast();
        console.log("Redis broadcast listener setup");
        // Start HTTP server
        server.listen(PORT, () => {
            console.log(`WebSocket server running on port ${PORT}`);
            console.log(`Health check: http://localhost:${PORT}/health`);
        });
    }
    catch (error) {
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
//# sourceMappingURL=server.js.map