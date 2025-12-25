"use client";

import { useEffect, useState, useCallback } from "react";

export function GlitchTitle() {
  const [glitchKey, setGlitchKey] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  const triggerGlitch = useCallback(() => {
    setGlitchKey((k) => k + 1);
    setIsGlitching(true);
  }, []);

  useEffect(() => {
    // Initial delay before first glitch
    const initialDelay = setTimeout(() => {
      triggerGlitch();
    }, 2000);

    // Set up recurring glitch cycle
    const interval = setInterval(() => {
      triggerGlitch();
    }, 5000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [triggerGlitch]);

  // Reset isGlitching after animation completes
  useEffect(() => {
    if (isGlitching) {
      const timeout = setTimeout(() => {
        setIsGlitching(false);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [isGlitching, glitchKey]);

  return (
    <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
      {/* SVG Filters for glitch effect */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          {/* Glitch filter - subtle distortion */}
          <filter
            id="glitch-combined"
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
          >
            {/* Create noise pattern */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.15"
              numOctaves="1"
              seed="42"
              result="noise"
            />

            {/* Subtle displacement */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />

            {/* Boost saturation for chromatic effect */}
            <feColorMatrix in="displaced" type="saturate" values="1.3" />
          </filter>
        </defs>
      </svg>

      <span className="relative inline-block">
        {/* Base text */}
        <span className="text-foreground">STELLARIC</span>

        {/* Glitched text overlay with wipe effect - DISABLED */}
        {false && (
          <span
            key={glitchKey}
            className="absolute inset-0 text-foreground glitch-wipe-active"
            style={{
              filter: "url(#glitch-combined)",
            }}
            aria-hidden="true"
          >
            STELLARIC
          </span>
        )}

        {/* Scan line effect - DISABLED */}
        {false && (
          <span
            key={`scanline-${glitchKey}`}
            className="absolute inset-0 overflow-hidden pointer-events-none"
            aria-hidden="true"
          >
            <span className="absolute w-full h-[3px] bg-white/40 top-1/2 glitch-scanline" />
          </span>
        )}
      </span>
    </h1>
  );
}
