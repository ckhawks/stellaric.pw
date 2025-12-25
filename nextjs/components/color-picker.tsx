"use client";

import { useRef, useEffect, useState } from "react";

// Color conversion utilities
const hslToRgb = (h: number, s: number, l: number) => {
  s = s / 100;
  l = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [
    Math.round(255 * f(0)),
    Math.round(255 * f(8)),
    Math.round(255 * f(4)),
  ];
};

const rgbToHex = (r: number, g: number, b: number) => {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
      .toUpperCase()
  );
};

const hexToHsl = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { h: 0, s: 0, l: 50 };

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) {
    return { h: 0, s: 0, l: Math.round(l * 100) };
  }

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h = 0;
  switch (max) {
    case r:
      h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      break;
    case g:
      h = ((b - r) / d + 2) / 6;
      break;
    case b:
      h = ((r - g) / d + 4) / 6;
      break;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  isLoading?: boolean;
}

export function ColorPicker({ value, onChange, isLoading = false }: ColorPickerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hsl, setHsl] = useState(() => hexToHsl(value));
  const [isDragging, setIsDragging] = useState(false);

  // Update HSL when the value prop changes (e.g., when light color is fetched)
  useEffect(() => {
    setHsl(hexToHsl(value));
  }, [value]);

  // Draw the color wheel
  useEffect(() => {
    // Don't draw while loading
    if (isLoading) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 8;

    // Draw color wheel using imageData
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const dx = x - centerX;
        const dy = y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const index = (y * width + x) * 4;

        if (distance <= radius) {
          // Calculate hue from angle
          const angle = Math.atan2(dy, dx);
          const hue = ((angle * 180) / Math.PI + 90 + 360) % 360;

          // Calculate saturation from distance
          const saturation = Math.min(100, (distance / radius) * 100);

          // Use current lightness
          const [r, g, b] = hslToRgb(hue, saturation, hsl.l);

          data[index] = r;
          data[index + 1] = g;
          data[index + 2] = b;
          data[index + 3] = 255;
        } else {
          // Outside circle - transparent
          data[index + 3] = 0;
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);

    // Draw border circle
    ctx.strokeStyle = "#888888";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();
  }, [hsl.l, isLoading]);

  // Update canvas listeners on mount
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const radius = Math.min(rect.width, rect.height) / 2 - 8;

      const dx = x - centerX;
      const dy = y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= radius) {
        // Calculate hue from angle
        const angle = Math.atan2(dy, dx);
        const h = ((angle * 180) / Math.PI + 90 + 360) % 360;

        // Calculate saturation from distance
        const s = Math.min(100, (distance / radius) * 100);

        const newHsl = { ...hsl, h: Math.round(h), s: Math.round(s) };
        setHsl(newHsl);

        const [r, g, b] = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
        onChange(rgbToHex(r, g, b));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, hsl]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(rect.width, rect.height) / 2 - 8;

    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= radius) {
      // Calculate hue from angle
      const angle = Math.atan2(dy, dx);
      const h = ((angle * 180) / Math.PI + 90 + 360) % 360;

      // Calculate saturation from distance
      const s = Math.min(100, (distance / radius) * 100);

      const newHsl = { ...hsl, h: Math.round(h), s: Math.round(s) };
      setHsl(newHsl);

      const [r, g, b] = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
      onChange(rgbToHex(r, g, b));
    }
  };

  const handleLightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const l = parseInt(e.target.value);
    const newHsl = { ...hsl, l };
    setHsl(newHsl);

    const [r, g, b] = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    onChange(rgbToHex(r, g, b));
  };

  // Calculate indicator position on wheel
  const centerX = 150;
  const centerY = 150;
  const radius = 142;
  const angle = (hsl.h - 90) * (Math.PI / 180);
  const distance = (hsl.s / 100) * radius;
  const indicatorX = centerX + distance * Math.cos(angle);
  const indicatorY = centerY + distance * Math.sin(angle);

  // Get RGB values for display
  const [r, g, b] = hslToRgb(hsl.h, hsl.s, hsl.l);
  const currentHex = rgbToHex(r, g, b);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {/* Loading State */}
        <div className="flex justify-center">
          <div className="relative inline-block rounded-full border-2 border-border bg-gradient-to-b from-card to-background animate-pulse" style={{ width: '300px', height: '300px' }} />
        </div>
        <div className="space-y-2">
          <div className="h-2 rounded bg-border animate-pulse" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="h-8 rounded bg-border animate-pulse" />
          <div className="h-8 rounded bg-border animate-pulse" />
          <div className="h-8 rounded bg-border animate-pulse" />
        </div>
        <div className="flex gap-3">
          <div className="w-16 h-16 rounded border-2 border-border bg-border animate-pulse flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-8 rounded bg-border animate-pulse" />
            <div className="h-8 rounded bg-border animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Color Wheel */}
      <div className="flex justify-center">
        <div className="relative inline-block">
          <canvas
            ref={canvasRef}
            width={300}
            height={300}
            onClick={handleCanvasClick}
            onMouseDown={() => setIsDragging(true)}
            className="border-2 border-border rounded-full cursor-crosshair"
            style={{ display: 'block' }}
          />

          {/* Color Indicator Circle */}
          <div
            className="absolute w-6 h-6 rounded-full border-2 border-white shadow-lg pointer-events-none"
            style={{
              left: `${(indicatorX / 300) * 100}%`,
              top: `${(indicatorY / 300) * 100}%`,
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 8px rgba(0, 0, 0, 0.5), 0 0 0 2px white",
            }}
          />
        </div>
      </div>

      {/* Lightness Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs text-muted-foreground">Lightness</label>
          <span className="text-xs text-muted-foreground font-mono">
            {hsl.l}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={hsl.l}
          onChange={handleLightnessChange}
          className="w-full h-2 rounded appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right,
              hsl(${hsl.h}, ${hsl.s}%, 0%),
              hsl(${hsl.h}, ${hsl.s}%, 25%),
              hsl(${hsl.h}, ${hsl.s}%, 50%),
              hsl(${hsl.h}, ${hsl.s}%, 75%),
              hsl(${hsl.h}, ${hsl.s}%, 100%))`,
          }}
        />
        <style>{`
          input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: white;
            border: 2px solid #666;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }
          input[type="range"]::-moz-range-thumb {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: white;
            border: 2px solid #666;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }
        `}</style>
      </div>

      {/* HSL & Color Values Display */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <label className="text-xs text-muted-foreground block mb-1">
            Hue
          </label>
          <div className="text-sm font-mono text-foreground">{hsl.h}°</div>
        </div>
        <div>
          <label className="text-xs text-muted-foreground block mb-1">
            Saturation
          </label>
          <div className="text-sm font-mono text-foreground">{hsl.s}%</div>
        </div>
        <div>
          <label className="text-xs text-muted-foreground block mb-1">
            Lightness
          </label>
          <div className="text-sm font-mono text-foreground">{hsl.l}%</div>
        </div>
      </div>

      {/* Color Preview and Hex Display */}
      <div className="flex gap-3">
        <div
          className="w-16 h-16 rounded border-2 border-border flex-shrink-0"
          style={{ backgroundColor: currentHex }}
        />
        <div className="flex-1 space-y-2">
          <div>
            <label className="text-xs text-muted-foreground block mb-1">
              Hex
            </label>
            <div className="font-mono text-sm text-foreground">
              {currentHex}
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">
              RGB
            </label>
            <div className="font-mono text-sm text-foreground">
              rgb({r}, {g}, {b})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
