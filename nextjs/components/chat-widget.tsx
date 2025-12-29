"use client";

import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Loader2 } from "lucide-react";
import { formatRelativeTime, formatDetailedTime } from "@/lib/date-utils";
import { getColorFromString } from "@/lib/color-utils";
import { useChatContext } from "@/context/chat-context";

export function ChatWidget() {
  const {
    messages,
    inputMessage,
    setInputMessage,
    isConnected,
    isConnecting,
    isSending,
    userId,
    now,
    handleSendMessage,
  } = useChatContext();

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    // ScrollArea wraps a viewport, so we need to find the scrollable element
    if (scrollAreaRef.current) {
      // Get the scrollable viewport div (created by ScrollArea component)
      const scrollableDiv = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      ) as HTMLElement;

      if (scrollableDiv) {
        // Scroll to bottom with smooth behavior
        setTimeout(() => {
          scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
        }, 0);
      }
    }
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="p-0 border-border bg-card flex flex-col h-[600px] overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 p-6 border-b border-border flex-shrink-0">
          <MessageCircle className="w-5 h-5 text-accent" />
          <h3 className="font-mono text-sm font-semibold text-foreground">
            CHAT_STREAM
          </h3>
          <div className="ml-auto flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span className="text-xs text-muted-foreground">
              {isConnecting
                ? "Connecting..."
                : isConnected
                  ? "Connected"
                  : "Disconnected"}
            </span>
          </div>
        </div>

        {/* Messages area */}
        <ScrollArea className="flex-1 overflow-hidden" ref={scrollAreaRef}>
          <div className="space-y-3 p-4">
            {messages.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-8">
                No messages yet. Be the first to say something!
              </p>
            )}

            {messages.map((msg) => {
              const pseudonymColor = getColorFromString(msg.pseudonym || "");
              const isOwnMessage = msg.anonymous_user_id === userId;
              return (
              <div
                key={msg.id}
                className="flex flex-col gap-1 px-2 py-1.5 rounded"
              >
                <div className="flex items-baseline gap-2">
                  <span
                    className="font-sans text-xs font-semibold"
                    style={{ color: pseudonymColor }}
                  >
                    {msg.pseudonym || "NO_PSEUDONYM"}
                  </span>
                  {isOwnMessage && (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-accent/20 text-accent font-medium">
                      You
                    </span>
                  )}
                  <span
                    className="text-xs text-muted-foreground cursor-help ml-auto"
                    title={formatDetailedTime(msg.timestamp)}
                  >
                    {formatRelativeTime(msg.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-foreground break-words">
                  {msg.message}
                </p>
              </div>
            );
            })}
          </div>
        </ScrollArea>

        {/* Input area */}
        <div className="p-4 border-t border-border flex-shrink-0">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              disabled={!isConnected || isSending}
              maxLength={500}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!isConnected || isSending || !inputMessage.trim()}
              size="icon"
            >
              {isSending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </Card>
  );
}
