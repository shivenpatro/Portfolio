"use client"

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

interface ParallaxScrollProps {
  children: ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down" | "left" | "right"
  offset?: [number, number]
}

export const ParallaxScroll = ({
  children,
  className = "",
  speed = 0.5,
  direction = "up",
  offset = [0, 1],
}: ParallaxScrollProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  })

  const getTransformValue = () => {
    switch (direction) {
      case "up":
        return [0, `-${100 * speed}px`]
      case "down":
        return [0, `${100 * speed}px`]
      case "left":
        return [`-${100 * speed}px`, 0]
      case "right":
        return [`${100 * speed}px`, 0]
      default:
        return [0, `-${100 * speed}px`]
    }
  }

  const y = useTransform(scrollYProgress, [0, 1], getTransformValue())
  const springY = useSpring(y, { stiffness: 100, damping: 30 })

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

