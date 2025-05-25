"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp } from "lucide-react"

interface ScrollToTopProps {
  threshold?: number
  size?: "sm" | "md" | "lg"
  position?: "bottom-right" | "bottom-left" | "bottom-center"
  color?: string
  backgroundColor?: string
  className?: string
  icon?: React.ReactNode
  showLabel?: boolean
  label?: string
}

export const ScrollToTop = ({
  threshold = 300,
  size = "md",
  position = "bottom-right",
  color = "white",
  backgroundColor = "#8b5cf6",
  className = "",
  icon,
  showLabel = false,
  label = "Back to top",
}: ScrollToTopProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > threshold) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [threshold])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return {
          button: "w-8 h-8",
          icon: "w-4 h-4",
          fontSize: "text-xs",
        }
      case "md":
        return {
          button: "w-10 h-10",
          icon: "w-5 h-5",
          fontSize: "text-sm",
        }
      case "lg":
        return {
          button: "w-12 h-12",
          icon: "w-6 h-6",
          fontSize: "text-base",
        }
      default:
        return {
          button: "w-10 h-10",
          icon: "w-5 h-5",
          fontSize: "text-sm",
        }
    }
  }

  const getPositionStyles = () => {
    switch (position) {
      case "bottom-right":
        return "bottom-4 right-4"
      case "bottom-left":
        return "bottom-4 left-4"
      case "bottom-center":
        return "bottom-4 left-1/2 transform -translate-x-1/2"
      default:
        return "bottom-4 right-4"
    }
  }

  const sizeStyles = getSizeStyles()
  const positionStyles = getPositionStyles()

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed ${positionStyles} z-50 flex flex-col items-center ${className}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            className={`${sizeStyles.button} flex items-center justify-center rounded-full shadow-lg focus:outline-none`}
            style={{ backgroundColor }}
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {icon || <ChevronUp className={`${sizeStyles.icon}`} style={{ color }} />}
          </motion.button>
          {showLabel && <span className={`mt-1 ${sizeStyles.fontSize} text-muted-foreground`}>{label}</span>}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

