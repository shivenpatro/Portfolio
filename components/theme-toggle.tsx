import { useState, useRef } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: (val: boolean) => void;
}

// Animated theme toggle that triggers a radial wipe from the button position
export const ThemeToggle = ({ isDark, onToggle }: ThemeToggleProps) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    // coordinates for radial origin
    const rect = btnRef.current?.getBoundingClientRect();
    if (rect) {
      document.documentElement.style.setProperty("--reveal-x", `${rect.left + rect.width / 2}px`);
      document.documentElement.style.setProperty("--reveal-y", `${rect.top + rect.height / 2}px`);
      document.documentElement.style.setProperty("--next-bg", isDark ? "#f9fafb" : "#0f172a");
    }
    // add helper class ⇒ starts scale animation
    document.body.classList.add("theme-changing");
    requestAnimationFrame(() => document.body.classList.add("reveal-active"));

    // Wait until circle fully expanded (600ms) then switch theme
    setTimeout(() => {
      onToggle(!isDark);
      // start fading overlay out
      document.body.classList.add("reveal-fade");
    }, 600);

    // clean-up after fade completes (additional 300ms)
    setTimeout(() => {
      document.body.classList.remove("theme-changing", "reveal-active", "reveal-fade");
    }, 900);
  };

  return (
    <motion.button
      ref={btnRef}
      onClick={handleClick}
      className="p-2 rounded-full bg-muted border border-border"
      whileHover={{ scale: 1.05, rotate: 15 }}
      whileTap={{ scale: 0.9, rotate: -15 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="w-5 h-5 sm:w-6 sm:h-6" /> : <Moon className="w-5 h-5 sm:w-6 sm:h-6" />}
    </motion.button>
  );
}; 