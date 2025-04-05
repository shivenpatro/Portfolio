"use client"

import { useState, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface AnimatedTooltipProps {
  children: ReactNode
  content: ReactNode
  position?: "top" | "bottom" | "left" | "right"
  delay?: number
  offset?: number
  className?: string
  contentClassName?: string
  arrow?: boolean
}

export const AnimatedTooltip = ({
  children,
  content,
  position = "top",
  delay = 0.2,
  offset = 10,
  className = "",
  contentClassName = "",
  arrow = true,
}: AnimatedTooltipProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  let timer: NodeJS.Timeout

  const getPositionStyles = () => {
    switch (position) {
      case "top":
        return {
          container: "bottom-full left-1/2 transform -translate-x-1/2",
          offset: `${-offset}px`,
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          arrow:
            "top-full left-1/2 transform -translate-x-1/2 border-t-gray-800 border-l-transparent border-r-transparent border-b-transparent",
        }
      case "bottom":
        return {
          container: "top-full left-1/2 transform -translate-x-1/2",
          offset: `${offset}px`,
          initial: { opacity: 0, y: -10 },
          animate: { opacity: 1, y: 0 },
          arrow:
            "bottom-full left-1/2 transform -translate-x-1/2 border-b-gray-800 border-l-transparent border-r-transparent border-t-transparent",
        }
      case "left":
        return {
          container: "right-full top-1/2 transform -translate-y-1/2",
          offset: `${-offset}px`,
          initial: { opacity: 0, x: 10 },
          animate: { opacity: 1, x: 0 },
          arrow:
            "left-full top-1/2 transform -translate-y-1/2 border-l-gray-800 border-t-transparent border-b-transparent border-r-transparent",
        }
      case "right":
        return {
          container: "left-full top-1/2 transform -translate-y-1/2",
          offset: `${offset}px`,
          initial: { opacity: 0, x: -10 },
          animate: { opacity: 1, x: 0 },
          arrow:
            "right-full top-1/2 transform -translate-y-1/2 border-r-gray-800 border-t-transparent border-b-transparent border-l-transparent",
        }
      default:
        return {
          container: "bottom-full left-1/2 transform -translate-x-1/2",
          offset: `${-offset}px`,
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          arrow:
            "top-full left-1/2 transform -translate-x-1/2 border-t-gray-800 border-l-transparent border-r-transparent border-b-transparent",
        }
    }
  }

  const positionStyles = getPositionStyles()

  const handleMouseEnter = () => {
    clearTimeout(timer)
    setIsMounted(true)
    timer = setTimeout(() => {
      setIsVisible(true)
    }, delay * 1000)
  }

  const handleMouseLeave = () => {
    clearTimeout(timer)
    setIsVisible(false)
    timer = setTimeout(() => {
      setIsMounted(false)
    }, 200)
  }

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}
      <AnimatePresence>
        {isMounted && (
          <motion.div
            className={`absolute z-50 ${positionStyles.container}`}
            style={{
              [position === "top" || position === "bottom" ? "marginTop" : "marginLeft"]: positionStyles.offset,
            }}
            initial={positionStyles.initial}
            animate={isVisible ? positionStyles.animate : positionStyles.initial}
            exit={positionStyles.initial}
            transition={{ duration: 0.2 }}
          >
            <div
              className={`bg-gray-800 text-white text-sm rounded-md py-2 px-3 whitespace-nowrap ${contentClassName}`}
            >
              {content}
            </div>
            {arrow && <div className={`absolute w-0 h-0 border-4 ${positionStyles.arrow}`} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

