"use client";

import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { ColorPicker } from "@/components/color-picker";
import { Lightbulb } from "lucide-react";
import { toast } from "sonner";

export function LightControlWidget() {
  const [currentColor, setCurrentColor] = useState<string>("#FF0000");
  const [inputColor, setInputColor] = useState<string>("#FF0000");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  const handleColorChange = (color: string) => {
    setInputColor(color);

    // Clear existing debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new debounce timer - waits 600ms after user stops changing color
    debounceTimerRef.current = setTimeout(() => {
      sendColorToLight(color);
    }, 600);
  };

  const sendColorToLight = async (color: string) => {
    setIsSending(true);
    try {
      const response = await fetch("/api/hue/light", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ color }),
      });

      if (!response.ok) {
        throw new Error("Failed to update light");
      }

      const data = await response.json();
      setCurrentColor(data.color || color);
    } catch (error) {
      console.error("Error updating light:", error);
      toast.error("Failed to update light color");
      // Reset to previous color on error
      setInputColor(currentColor);
    } finally {
      setIsSending(false);
    }
  };

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Ensure it starts with # and is a valid hex color
    if (!value.startsWith("#")) {
      value = "#" + value;
    }
    value = value.toUpperCase().slice(0, 7);
    setInputColor(value);
  };

  const handleHexInputBlur = () => {
    // Validate hex color format
    if (/^#[0-9A-F]{6}$/.test(inputColor)) {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      sendColorToLight(inputColor);
    } else {
      // Reset to current color if invalid
      setInputColor(currentColor);
      toast.error("Invalid color format");
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
            </div>

            {/* Custom Color Picker */}
            <div>
              <label className="text-xs text-muted-foreground block mb-3">
                Choose Color
              </label>
              <ColorPicker
                value={inputColor}
                onChange={handleColorChange}
                isLoading={isLoading}
              />
            </div>

            {isSending && (
              <p className="text-xs text-muted-foreground animate-pulse text-center">
                Updating light...
              </p>
            )}
          </div>
        </Card>

        {/* Info Card */}
        <Card className="p-6 border-border bg-card">
          <div className="space-y-4">
            <div>
              <h4 className="font-mono text-sm font-semibold text-foreground mb-2">
                INTERACT
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Drag around the color wheel to explore millions of hues. Adjust the
                brightness slider to find the perfect mood for the apartment. The
                light responds in real-time as you select colors—watch the bulb
                preview glow with your choice before it updates.
              </p>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                <span className="font-mono text-accent">Connection:</span>
                {isLoading ? (
                  <span className="ml-2 text-muted-foreground">Loading...</span>
                ) : (
                  <span className="ml-2 text-foreground">Active</span>
                )}
              </p>
            </div>

            <div className="pt-2 space-y-2">
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
    </div>
  );
}
