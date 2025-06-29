"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

interface ParallaxTextProps {
  children: React.ReactNode
  className?: string
  speed?: number
  direction?: "left" | "right"
}

export const ParallaxText = ({
  children,
  className = "",
  speed = 0.5,
  direction = "right"
}: ParallaxTextProps) => {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const xRange = direction === "right" ? [-100 * speed, 100 * speed] : [100 * speed, -100 * speed]
  const x = useTransform(scrollYProgress, [0, 1], xRange)
  const smoothX = useSpring(x, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ x: smoothX }}>
        {children}
      </motion.div>
    </div>
  )
}