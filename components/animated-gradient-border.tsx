"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface AnimatedGradientBorderProps {
  children: ReactNode
  className?: string
  borderWidth?: number
  duration?: number
  colors?: string[]
  borderRadius?: string
  glowAmount?: number
}

export const AnimatedGradientBorder = ({
  children,
  className = "",
  borderWidth = 2,
  duration = 8,
  colors = ["#6366f1", "#8b5cf6", "#d946ef", "#8b5cf6"],
  borderRadius = "1rem",
  glowAmount = 10,
}: AnimatedGradientBorderProps) => {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(90deg, ${colors.join(", ")})`,
          backgroundSize: `${colors.length * 100}% 100%`,
          borderRadius,
          filter: `blur(${glowAmount}px)`,
          opacity: 0.5,
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%"],
        }}
        transition={{
          duration,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      <div
        className="absolute inset-0 z-0"
        style={{
          padding: borderWidth,
          borderRadius,
          background: `linear-gradient(90deg, ${colors.join(", ")})`,
          backgroundSize: `${colors.length * 100}% 100%`,
          mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          maskComposite: "exclude",
        }}
      >
        <motion.div
          className="w-full h-full"
          style={{
            background: `linear-gradient(90deg, ${colors.join(", ")})`,
            backgroundSize: `${colors.length * 100}% 100%`,
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%"],
          }}
          transition={{
            duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}

