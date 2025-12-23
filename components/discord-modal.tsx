"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DiscordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DiscordModal({ isOpen, onClose }: DiscordModalProps) {
  const [copied, setCopied] = useState(false);
  const discordHandle = "Stellaric";

  const handleCopy = () => {
    navigator.clipboard.writeText(discordHandle);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Let's connect on Discord</DialogTitle>
          <DialogDescription>Find me and say hello!</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-secondary/50 border border-border rounded p-4 flex items-center justify-between gap-3">
            <code className="font-mono text-lg font-semibold text-foreground">
              {discordHandle}
            </code>
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-secondary rounded transition-colors"
              title="Copy Discord username"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5 text-muted-foreground hover:text-foreground" />
              )}
            </button>
          </div>

          <p className="text-sm text-muted-foreground">
            Feel free to add me or send a message! I'm always up for chatting
            about dev, design, or just hanging out.
          </p>
        </div>

        <DialogFooter>
          <Button
            onClick={onClose}
            variant="default"
            className="cursor-pointer"
          >
            Awesome!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
