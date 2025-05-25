"use client"

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

interface ParallaxScrollProps {
  children: ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down" | "left" | "right"
  offset?: [number, number]
  /**
   * Disable the parallax effect altogether. This is automatically enabled on mobile devices (<768px) to avoid
   * unnecessary scroll calculations that can cause jank on low-powered GPUs.
   */
  disabled?: boolean
}

export const ParallaxScroll = ({
  children,
  className = "",
  speed = 0.5,
  direction = "up",
  offset = [0, 1],
  disabled,
}: ParallaxScrollProps) => {
  // Short-circuit the motion logic on mobile or when explicitly disabled.
  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches

  if (disabled || isMobile) {
    return (
      <div ref={undefined} className={className}>
        {children}
      </div>
    )
  }

  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  })

  const getTransformValue = () => {
    switch (direction) {
      case "up":
        return [0, -100 * speed]
      case "down":
        return [0, 100 * speed]
      case "left":
        return [-100 * speed, 0]
      case "right":
        return [100 * speed, 0]
      default:
        return [0, -100 * speed]
    }
  }

  const y = useTransform(scrollYProgress, [0, 1], getTransformValue() as any)
  const springY = useSpring(y as any, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      ref={ref}
      className={className}
      style={direction === "left" || direction === "right" ? { x: springY } : { y: springY }}
    >
      {children}
    </motion.div>
  )
}

