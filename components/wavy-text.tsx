"use client";

import { motion, Variants } from "framer-motion";
import { CSSProperties } from "react";

interface WavyTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  style?: CSSProperties;
}

export function WavyText({
  text,
  className,
  delay = 0,
  duration = 0.5,
  style,
}: WavyTextProps) {
  const letters = text.split("");

  const container: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const child: Variants = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: duration,
      },
    },
  };

  return (
    <motion.h2
      className={`flex overflow-hidden ${className}`}
      style={style}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h2>
  );
} 