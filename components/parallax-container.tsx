"use client"

import { useRef, ReactNode } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

interface ParallaxContainerProps {
  children: ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down"
  offset?: [string, string]
}

export const ParallaxContainer = ({
  children,
  className = "",
  speed = 0.5,
  direction = "up",
  offset = ["start end", "end start"]
}: ParallaxContainerProps) => {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any
  })

  const yRange = direction === "up" ? [-100 * speed, 100 * speed] : [100 * speed, -100 * speed]
  const y = useTransform(scrollYProgress, [0, 1], yRange)
  const smoothY = useSpring(y, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y: smoothY }}>
        {children}
      </motion.div>
    </div>
  )
}