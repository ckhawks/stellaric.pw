"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";

export interface ChatMessage {
  id: number;
  anonymous_user_id: string;
  pseudonym: string;
  message: string;
  timestamp: string;
}

interface ChatContextType {
  messages: ChatMessage[];
  inputMessage: string;
  setInputMessage: (message: string) => void;
  isConnected: boolean;
  isConnecting: boolean;
  isSending: boolean;
  userId: string;
  now: Date;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  handleSendMessage: () => void;
  playMessageSound: () => void;
  unreadCount: number;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within ChatProvider");
  }
  return context;
}

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [now, setNow] = useState(new Date());
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [lastChatViewedAt, setLastChatViewedAt] = useState<number>(0);

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttempts = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastMessageIdRef = useRef<number>(0);

  // Update current time for relative timestamps
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Generate or retrieve user ID from localStorage
  useEffect(() => {
    let storedUserId = localStorage.getItem("chat_user_id");
    if (!storedUserId) {
      storedUserId = crypto.randomUUID();
      localStorage.setItem("chat_user_id", storedUserId);
    }
    setUserId(storedUserId);

    // Load last viewed timestamp from localStorage
    const storedLastViewed = localStorage.getItem("chat_last_viewed_at");
    if (storedLastViewed) {
      setLastChatViewedAt(parseInt(storedLastViewed, 10));
    }
  }, []);

  // WebSocket connection management
  useEffect(() => {
    if (!userId) return;

    const connectWebSocket = () => {
      setIsConnecting(true);

      // Determine WebSocket URL
      let wsUrl = process.env.NEXT_PUBLIC_WS_URL;
      if (!wsUrl) {
        const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
        wsUrl = `${protocol}//${window.location.hostname}:8081`;
      }

      try {
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => {
          console.log("WebSocket connected");
          setIsConnected(true);
          setIsConnecting(false);
          reconnectAttempts.current = 0;

          // Request message history
          ws.send(
            JSON.stringify({
              type: "request_history",
              payload: { userId },
            })
          );
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);

            if (data.type === "history") {
              // Initial message load
              setMessages(data.payload);
              if (data.payload.length > 0) {
                lastMessageIdRef.current =
                  data.payload[data.payload.length - 1].id;
                // Only set last viewed if it's the first time (no previous value)
                if (lastChatViewedAt === 0) {
                  const newestMessageTime = new Date(
                    data.payload[data.payload.length - 1].timestamp
                  ).getTime();
                  setLastChatViewedAt(newestMessageTime);
                  localStorage.setItem(
                    "chat_last_viewed_at",
                    newestMessageTime.toString()
                  );
                }
              }
            } else if (data.type === "message") {
              // New message broadcast
              // Only play sound if this is a new message (not from history)
              if (data.payload.id > lastMessageIdRef.current) {
                playMessageSound();
              }
              lastMessageIdRef.current = data.payload.id;

              setMessages((prev) => [...prev, data.payload]);
            } else if (data.type === "error") {
              console.error("Chat error:", data.error);
            }
          } catch (error) {
            console.error("Error parsing WebSocket message:", error);
          }
        };

        ws.onerror = (error) => {
          console.error("WebSocket error:", error);
        };

        ws.onclose = () => {
          console.log("WebSocket disconnected");
          setIsConnected(false);
          setIsConnecting(false);

          // Attempt to reconnect with exponential backoff
          if (reconnectAttempts.current < 5) {
            const delay = Math.min(
              1000 * Math.pow(2, reconnectAttempts.current),
              30000
            );
            reconnectAttempts.current++;

            reconnectTimeoutRef.current = setTimeout(() => {
              console.log(`Reconnecting... (attempt ${reconnectAttempts.current})`);
              connectWebSocket();
            }, delay);
          }
        };
      } catch (error) {
        console.error("Error creating WebSocket:", error);
        setIsConnecting(false);
      }
    };

    connectWebSocket();

    // Cleanup
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }
    };
  }, [userId]);

  // Update last viewed timestamp when chat opens
  useEffect(() => {
    if (isChatOpen) {
      const now = Date.now();
      setLastChatViewedAt(now);
      localStorage.setItem("chat_last_viewed_at", now.toString());
    }
  }, [isChatOpen]);

  // Calculate unread count
  const unreadCount = messages.filter(
    (msg) => new Date(msg.timestamp).getTime() > lastChatViewedAt
  ).length;

  const playMessageSound = () => {
    if (!audioRef.current) return;
    try {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.debug("Could not play message sound:", err);
      });
    } catch (error) {
      console.debug("Error playing sound:", error);
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !wsRef.current || !isConnected) return;

    if (inputMessage.length > 500) {
      console.error("Message too long (max 500 characters)");
      return;
    }

    setIsSending(true);

    try {
      wsRef.current.send(
        JSON.stringify({
          type: "send_message",
          payload: {
            userId,
            message: inputMessage.trim(),
          },
        })
      );

      setInputMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  // Initialize audio element
  useEffect(() => {
    if (typeof window !== "undefined" && !audioRef.current) {
      const audio = new Audio("/message-sound.wav");
      audio.preload = "auto";
      audioRef.current = audio;
    }
  }, []);

  const value: ChatContextType = {
    messages,
    inputMessage,
    setInputMessage,
    isConnected,
    isConnecting,
    isSending,
    userId,
    now,
    isChatOpen,
    setIsChatOpen,
    handleSendMessage,
    playMessageSound,
    unreadCount,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}
