"use client";

import { useState, useEffect } from "react";

interface TypingTextProps {
  text: string;
  speed?: number; // ms per character
  className?: string;
  loop?: boolean; // whether to type-delete loop
  fontFamily?: string;
  onDone?: () => void;
}

export default function TypingText({ text, speed = 120, className = "", loop = false, fontFamily, onDone }: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const isTyping = loop ? true : displayed.length < text.length;

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // typing forward
        if (displayed.length < text.length) {
          setDisplayed(text.slice(0, displayed.length + 1));
        } else {
          if (loop) {
            setIsDeleting(true);
          } else if (onDone) {
            onDone();
          }
        }
      } else {
        // deleting
        if (displayed.length > 0) {
          setDisplayed(text.slice(0, displayed.length - 1));
        } else {
          // pause before typing again
          setIsDeleting(false);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, text, speed]);

  return (
    <span
      className={`relative ${className}`}
      style={fontFamily ? { fontFamily } : undefined }
    >
      {displayed}
      <span className={`absolute -right-0.5 top-0 h-[1em] w-px bg-current ${isTyping ? 'animate-blink' : 'opacity-0'}`} />
    </span>
  );
} 