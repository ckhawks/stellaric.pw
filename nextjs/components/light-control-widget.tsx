"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ColorPicker } from "@/components/color-picker";
import { Lightbulb } from "lucide-react";
import { toast } from "sonner";

const NAME_MAX_LENGTH = 40;
const MESSAGE_MAX_LENGTH = 280;
const NAME_STORAGE_KEY = "light-control-name";

export function LightControlWidget() {
  const [currentColor, setCurrentColor] = useState<string>("#FF0000");
  const [inputColor, setInputColor] = useState<string>("#FF0000");
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  // Fetch current light color on mount
  useEffect(() => {
    const fetchLightColor = async () => {
      try {
        const response = await fetch("/api/hue/light");
        if (!response.ok) {
          throw new Error("Failed to fetch light info");
        }
        const data = await response.json();
        setCurrentColor(data.color || "#FF0000");
        setInputColor(data.color || "#FF0000");
      } catch (error) {
        console.error("Error fetching light color:", error);
        toast.error("Failed to load light info");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLightColor();
  }, []);

  // Remember the name so repeat visitors don't retype it
  useEffect(() => {
    const saved = window.localStorage.getItem(NAME_STORAGE_KEY);
    if (saved) {
      setName(saved);
    }
  }, []);

  const trimmedName = name.trim();
  const hasChangedColor = inputColor !== currentColor;
  const canSubmit = !isLoading && !isSending && trimmedName.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!trimmedName) {
      toast.error("Please leave a name");
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch("/api/hue/light", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          color: inputColor,
          name: trimmedName,
          message: message.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update light");
      }

      window.localStorage.setItem(NAME_STORAGE_KEY, trimmedName);
      setCurrentColor(data.color || inputColor);
      setMessage("");
      toast.success("Light updated - thanks for signing it");
    } catch (error) {
      console.error("Error updating light:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update light color"
      );
    } finally {
      setIsSending(false);
    }
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
          result[3],
          16
        )}`
      : "255, 0, 0";
  };

  return (
    <div className="mt-12">
      <h2 className="font-sans text-2xl font-bold text-foreground mb-6">
        Control my light in my apartment!
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Color Picker Card */}
          <Card className="p-6 border-border bg-card">
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="w-5 h-5 text-accent" />
              <h3 className="font-mono text-sm font-semibold text-foreground">
                COLOR_CONTROL
              </h3>
            </div>

            <div className="space-y-6">
              {/* Light Bulb Visualization */}
              <div className="flex flex-col items-center justify-center py-8">
                <div className="relative">
                  {/* Glow effect - the "light" from the bulb */}
                  <div
                    className="absolute inset-0 rounded-full blur-3xl opacity-60 transition-colors duration-300"
                    style={{
                      backgroundColor: inputColor,
                      width: "200px",
                      height: "200px",
                      marginLeft: "-50px",
                      marginTop: "-50px",
                    }}
                  />

                  {/* Light bulb SVG */}
                  <svg
                    width="100"
                    height="140"
                    viewBox="0 0 100 140"
                    className="relative z-10"
                  >
                    {/* Bulb */}
                    <circle cx="50" cy="45" r="35" fill={inputColor} />

                    {/* Highlight on bulb for depth */}
                    <ellipse
                      cx="38"
                      cy="30"
                      rx="12"
                      ry="15"
                      fill="white"
                      opacity="0.3"
                    />

                    {/* Base of bulb */}
                    <rect
                      x="42"
                      y="75"
                      width="16"
                      height="12"
                      rx="2"
                      fill="currentColor"
                      className="text-foreground"
                    />

                    {/* Screw base */}
                    <rect
                      x="40"
                      y="87"
                      width="20"
                      height="18"
                      rx="3"
                      fill="currentColor"
                      className="text-muted-foreground"
                      opacity="0.5"
                    />

                    {/* Screw lines */}
                    <line
                      x1="50"
                      y1="87"
                      x2="50"
                      y2="105"
                      stroke="currentColor"
                      className="text-muted-foreground"
                      strokeWidth="1"
                      opacity="0.3"
                    />
                  </svg>
                </div>

                {/* Color value display */}
                <p className="mt-6 font-mono text-sm text-foreground">
                  {inputColor}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {hasChangedColor ? "Preview - not sent yet" : "Currently on"}
                </p>
              </div>

              {/* Custom Color Picker */}
              <div>
                <label className="text-xs text-muted-foreground block mb-3">
                  Choose Color
                </label>
                <ColorPicker
                  value={inputColor}
                  onChange={setInputColor}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </Card>

          {/* Sign-in Card */}
          <Card className="p-6 border-border bg-card">
            <div className="space-y-6">
              <div>
                <h4 className="font-mono text-sm font-semibold text-foreground mb-2">
                  SIGN_THE_CHANGE
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Pick a color, then leave your name so I know who did it. A
                  message is optional - say hi, tell me what the color is for,
                  whatever. It goes straight to my phone.
                </p>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="light-name"
                  className="text-xs text-muted-foreground block"
                >
                  Your name
                </label>
                <Input
                  id="light-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={NAME_MAX_LENGTH}
                  placeholder="Who's turning the lights?"
                  required
                  autoComplete="nickname"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="light-message"
                  className="text-xs text-muted-foreground block"
                >
                  Message (optional)
                </label>
                <Textarea
                  id="light-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={MESSAGE_MAX_LENGTH}
                  rows={3}
                  placeholder="Anything you want to say"
                />
                <p className="text-xs text-muted-foreground text-right font-mono">
                  {message.length}/{MESSAGE_MAX_LENGTH}
                </p>
              </div>

              <Button type="submit" disabled={!canSubmit} className="w-full">
                {isSending ? "Updating light..." : "Change the light"}
              </Button>

              <div className="pt-4 border-t border-border space-y-2">
                <p className="text-xs text-muted-foreground">
                  <span className="font-mono text-accent">Connection:</span>
                  {isLoading ? (
                    <span className="ml-2 text-muted-foreground">
                      Loading...
                    </span>
                  ) : (
                    <span className="ml-2 text-foreground">Active</span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-mono text-accent">Current Color:</span>
                  <span className="ml-2 text-foreground font-mono">
                    {currentColor}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-mono text-accent">RGB Value:</span>
                  <span className="ml-2 text-foreground font-mono">
                    rgb({hexToRgb(currentColor)})
                  </span>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
}
