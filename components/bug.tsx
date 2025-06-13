"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useBugHuntStore } from "@/hooks/use-bug-hunt-store";

// register plugin once
if (typeof window !== "undefined" && gsap) {
  gsap.registerPlugin(MotionPathPlugin);
}

interface BugProps {
  id: number;
  onComplete: () => void;
}

export default function Bug({ id, onComplete }: BugProps) {
  const ref = useRef<HTMLDivElement>(null);
  const catchBug = useBugHuntStore((s) => s.catchBug);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    // random start and end positions
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const startX = Math.random() * vw;
    const startY = Math.random() * vh;

    const endX = Math.random() * vw;
    const endY = Math.random() * vh;

    const midX = Math.random() * vw;
    const midY = Math.random() * vh;

    gsap.set(el, { x: startX, y: startY, scale: 0.8 + Math.random() * 0.4 });

    const tl = gsap.timeline({ onComplete });
    tl.to(el, {
      duration: 8 + Math.random() * 4,
      ease: "none",
      motionPath: {
        path: [
          { x: startX, y: startY },
          { x: midX, y: midY },
          { x: endX, y: endY },
        ],
      },
    });

    return () => {
      tl.kill();
    };
  }, [id, onComplete]);

  const handleClick = () => {
    catchBug();
    onComplete(); // remove bug immediately
  };

  return (
    <div
      ref={ref}
      onClick={handleClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 24,
        height: 24,
        cursor: "pointer",
        zIndex: 30,
        pointerEvents: "auto",
      }}
    >
      {/* simple bug SVG */}
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="6" fill="#EF4444" />
        <line x1="12" y1="0" x2="12" y2="4" stroke="#000" strokeWidth="2" />
        <line x1="12" y1="20" x2="12" y2="24" stroke="#000" strokeWidth="2" />
        <line x1="0" y1="12" x2="4" y2="12" stroke="#000" strokeWidth="2" />
        <line x1="20" y1="12" x2="24" y2="12" stroke="#000" strokeWidth="2" />
        <line x1="5" y1="5" x2="8" y2="8" stroke="#000" strokeWidth="2" />
        <line x1="19" y1="19" x2="16" y2="16" stroke="#000" strokeWidth="2" />
        <line x1="5" y1="19" x2="8" y2="16" stroke="#000" strokeWidth="2" />
        <line x1="19" y1="5" x2="16" y2="8" stroke="#000" strokeWidth="2" />
      </svg>
    </div>
  );
} 