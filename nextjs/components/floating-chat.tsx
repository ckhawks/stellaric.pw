"use client";

import { useEffect, useRef } from "react";
import { X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatRelativeTime, formatDetailedTime } from "@/lib/date-utils";
import { getColorFromString } from "@/lib/color-utils";
import { useChatContext } from "@/context/chat-context";

export function FloatingChat() {
  const {
    messages,
    inputMessage,
    setInputMessage,
    isConnected,
    isConnecting,
    isSending,
    userId,
    isChatOpen,
    setIsChatOpen,
    handleSendMessage,
  } = useChatContext();

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive or chat opens
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollableDiv = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      ) as HTMLElement;

      if (scrollableDiv) {
        setTimeout(() => {
          scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
        }, 0);
      }
    }
  }, [messages, isChatOpen]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isChatOpen) {
    return null;
  }

  return (
    <div className="fixed top-20 right-4 w-96 h-[600px] z-100 rounded-lg shadow-2xl border border-border bg-card flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-accent" />
          <h3 className="font-mono text-sm font-semibold text-foreground">
            CHAT_STREAM
          </h3>
        </div>
        <div className="flex items-center gap-2">
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
          <Button
            onClick={() => setIsChatOpen(false)}
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
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
            className="flex-1 text-sm"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!isConnected || isSending || !inputMessage.trim()}
            size="sm"
            className="px-3"
          >
            <span className="text-xs">Send</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
