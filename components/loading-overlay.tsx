"use client";

import { useDisableScroll } from "../hooks/useDisableScroll";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { preloadComponents } from "@/lib/preloader";

gsap.registerPlugin(useGSAP);

type LoadingOverlayProps = {
  onFinish?: () => void;
};

const WELCOME_TEXT = "Welcome to";
const NAME_TEXT = "my portfolio";

function splitToSpans(text: string) {
  return text.split("").map((char, idx) => (
    <span
      key={`${text}-${idx}`}
      className="char inline-block will-change-transform"
      style={{ display: "inline-block" }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}

export default function LoadingOverlay({ onFinish }: LoadingOverlayProps) {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useDisableScroll(visible);

  useGSAP(
    () => {
      const introAnimation = gsap.timeline({ defaults: { ease: "power3.out" } });

      introAnimation
        .from(".char", {
        yPercent: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
      })
        .to(".char", {
          scale: 1.1,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
        })
        .to(
          ".char",
          {
            textShadow: "0 0 20px rgba(16, 185, 129, 0.9), 0 0 40px rgba(16, 185, 129, 0.7)",
            duration: 0.6,
            stagger: 0.02,
          },
          "-=0.2"
        );
      
      const handleFinish = async () => {
        await Promise.all([
          preloadComponents(),
          introAnimation.then()
        ]);

        onFinish?.();
        
        await new Promise(resolve => setTimeout(resolve, 100));

        gsap.to(container.current, {
            clipPath: "circle(0% at 50% 50%)",
            duration: 1.2,
            ease: "power2.inOut",
            onComplete: () => {
              setVisible(false);
          },
        });
      };

      handleFinish();
    },
    { scope: container }
  );

  if (!visible) return null;

  const pseudo = (seed:number)=> {
    let s = Math.sin(seed) * 10000;
    return s - Math.floor(s);
  };

  return (
    <div
      ref={container}
      className="overlay pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center bg-neutral-950 text-white"
      style={{ clipPath: "circle(100% at 50% 50%)" }}
    >
      {Array.from({ length: 7 }).map((_, i) => {
        const r1 = pseudo(i+1);
        const r2 = pseudo(i+2);
        const r3 = pseudo(i+3);
        const r4 = pseudo(i+4);
        const size = Math.floor(r1 * 80) + 40; 
        const startX = r2 * 100 - 50; 
        const startY = r3 * 100 - 50;
        const duration = r4 * 10 + 8;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-emerald-500/30 blur-3xl"
            style={{ width: size, height: size, top: "50%", left: "50%", x: startX, y: startY }}
            animate={{ x: [startX, startX * -1], y: [startY, startY * -1] }}
            transition={{ duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
        );
      })}

      <div className="logo relative z-10 select-none text-center font-bold">
        <h1 className="text-4xl md:text-6xl leading-tight tracking-wide">
          {splitToSpans(WELCOME_TEXT)}
        </h1>
        <h2 className="mt-2 text-2xl md:text-4xl font-semibold text-emerald-400">
          {splitToSpans(NAME_TEXT)}
        </h2>
      </div>
    </div>
  );
} 