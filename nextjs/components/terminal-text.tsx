"use client";

import { useEffect, useState } from "react";

const GLITCH_CHARS = [
  "░",
  "▒",
  "▓",
  "█",
  "▄",
  "▀",
  "├",
  "┤",
  "┬",
  "┴",
  "═",
  "║",
  "╔",
  "╗",
  "╝",
  "╚",
];

// Characters for the "magic" effect - looks like random noise clearing up
const MAGIC_CHARS = "░▒▓█▄▀├┤┬┴═║╔╗╝╚@#$%^&*()[]{}+-=/\\|~`!?;:.,<>";
const ALPHANUMERIC =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

interface GlitchState {
  [index: number]: boolean;
}

interface TerminalTextProps {
  text: string;
  delay?: number;
  withCursor?: boolean;
  className?: string;
  onComplete?: () => void;
  glitch?: boolean;
  magic?: boolean;
}

export function TerminalText({
  text,
  delay = 0,
  withCursor = false,
  className = "",
  onComplete,
  glitch = false,
  magic = false,
}: TerminalTextProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [glitchState, setGlitchState] = useState<GlitchState>({});
  const [magicState, setMagicState] = useState<{ [index: number]: boolean }>(
    {}
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;

    // Animation completes after the typing duration + delay
    const animationDuration = 1500; // matches the CSS animation duration
    const timer = setTimeout(() => {
      onComplete?.();
    }, animationDuration);

    return () => clearTimeout(timer);
  }, [isVisible, onComplete]);

  // Magic effect - characters "settle" into correct ones
  useEffect(() => {
    if (!magic || !isVisible) return;

    // Initialize all characters as magic (not settled)
    const initialMagicState: { [index: number]: boolean } = {};
    for (let i = 0; i < text.length; i++) {
      initialMagicState[i] = true;
    }
    setMagicState(initialMagicState);

    // Settle characters one by one with a stagger
    let settledCount = 0;
    const settleInterval = setInterval(() => {
      settledCount++;
      if (settledCount >= text.length) {
        setMagicState({});
        clearInterval(settleInterval);
        return;
      }

      setMagicState((prev) => {
        const newState = { ...prev };
        // Randomly settle 1-2 characters per interval
        const toSettle = Math.floor(Math.random() * 2) + 1;
        for (let i = 0; i < toSettle && settledCount < text.length; i++) {
          const randomIdx = Math.floor(Math.random() * text.length);
          delete newState[randomIdx];
          settledCount++;
        }
        return newState;
      });
    }, 40); // Quick settling effect

    return () => clearInterval(settleInterval);
  }, [magic, text, isVisible]);

  // Glitch effect
  useEffect(() => {
    if (!glitch || !isVisible) return;

    const glitchInterval = setInterval(() => {
      // Random chance to glitch (30% chance every interval)
      if (Math.random() > 0.7) {
        // Randomly select 1-3 characters to glitch
        const glitchCount = Math.floor(Math.random() * 3) + 1;
        const newGlitchState: GlitchState = {};

        for (let i = 0; i < glitchCount; i++) {
          const randomIndex = Math.floor(Math.random() * text.length);
          newGlitchState[randomIndex] = true;
        }

        setGlitchState(newGlitchState);

        // Unglitch after 80-150ms
        const unglitchTimer = setTimeout(() => {
          setGlitchState({});
        }, Math.random() * 70 + 80);

        return () => clearTimeout(unglitchTimer);
      }
    }, 2000 + Math.random() * 1000); // Check every 2-3 seconds

    return () => clearInterval(glitchInterval);
  }, [glitch, text, isVisible]);

  if (!isVisible) return null;

  const displayText = text
    .split("")
    .map((char, idx) => {
      // Magic effect takes priority - show random chars while settling
      if (magicState[idx]) {
        return MAGIC_CHARS[Math.floor(Math.random() * MAGIC_CHARS.length)];
      }
      // Then apply glitch effect
      if (glitchState[idx]) {
        return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      }
      return char;
    })
    .join("");

  return (
    <span
      className={`terminal-text ${
        withCursor ? "with-cursor" : ""
      } ${className}`}
    >
      {displayText}
    </span>
  );
}

interface TerminalListProps {
  items: string[];
  itemClassName?: string;
  containerClassName?: string;
  staggerDelay?: number;
  glitch?: boolean;
  magic?: boolean;
}

export function TerminalList({
  items,
  itemClassName = "",
  containerClassName = "",
  staggerDelay = 500,
  glitch = false,
  magic = false,
}: TerminalListProps) {
  return (
    <div className={containerClassName}>
      {items.map((item, index) => (
        <TerminalText
          key={index}
          text={item}
          delay={index * staggerDelay}
          className={itemClassName}
          glitch={glitch}
          magic={magic}
        />
      ))}
    </div>
  );
}
