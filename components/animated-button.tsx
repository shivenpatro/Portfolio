"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface AnimatedButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gradient"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  icon?: ReactNode
  iconPosition?: "left" | "right"
  fullWidth?: boolean
  gradientColors?: string[]
  hoverScale?: number
  pressScale?: number
  borderRadius?: string
  glowAmount?: number
}

export const AnimatedButton = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
  disabled = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  gradientColors = ["#6366f1", "#8b5cf6", "#d946ef"],
  hoverScale = 1.05,
  pressScale = 0.95,
  borderRadius = "9999px",
  glowAmount = 10,
}: AnimatedButtonProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-primary hover:bg-primary/90 text-primary-foreground"
      case "secondary":
        return "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
      case "outline":
        return "bg-transparent border border-primary text-primary hover:bg-primary/10"
      case "ghost":
        return "bg-transparent hover:bg-primary/10 text-primary"
      case "gradient":
        return "text-white"
      default:
        return "bg-primary hover:bg-primary/90 text-primary-foreground"
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "py-1.5 px-3 text-sm"
      case "md":
        return "py-2.5 px-5 text-base"
      case "lg":
        return "py-3 px-6 text-lg"
      default:
        return "py-2.5 px-5 text-base"
    }
  }

  const getGradientBackground = () => {
    if (variant === "gradient") {
      return {
        background: `linear-gradient(90deg, ${gradientColors.join(", ")})`,
        backgroundSize: "200% 100%",
      }
    }
    return {}
  }

  const getGlowStyles = () => {
    if (variant === "gradient") {
      return {
        boxShadow: `0 0 ${glowAmount}px 0 rgba(99, 102, 241, 0.4)`,
      }
    }
    return {}
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`relative flex items-center justify-center font-medium transition-colors duration-200 ${getVariantStyles()} ${getSizeStyles()} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      style={{
        borderRadius,
        ...getGradientBackground(),
        ...getGlowStyles(),
      }}
      whileHover={
        !disabled
          ? {
              scale: hoverScale,
              backgroundPosition: ["0% 50%", "100% 50%"],
              transition: {
                backgroundPosition: {
                  duration: 0.8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                },
              },
            }
          : {}
      }
      whileTap={!disabled ? { scale: pressScale } : {}}
      animate={
        variant === "gradient"
          ? {
              backgroundPosition: ["0% 50%", "100% 50%"],
              transition: {
                backgroundPosition: {
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                },
              },
            }
          : {}
      }
    >
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </motion.button>
  )
}
