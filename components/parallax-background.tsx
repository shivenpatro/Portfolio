"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

interface ParallaxBackgroundProps {
  children?: React.ReactNode
  className?: string
  speed?: number
  opacity?: [number, number]
  scale?: [number, number]
}

export const ParallaxBackground = ({
  children,
  className = "",
  speed = 0.3,
  opacity = [1, 0.3],
  scale = [1, 1.1]
}: ParallaxBackgroundProps) => {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.5, 1], [opacity[0], opacity[1], opacity[0]])
  const scaleTransform = useTransform(scrollYProgress, [0, 1], scale)
  
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })
  const smoothOpacity = useSpring(opacityTransform, { stiffness: 100, damping: 30 })
  const smoothScale = useSpring(scaleTransform, { stiffness: 100, damping: 30 })

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div 
        style={{ 
          y: smoothY,
          opacity: smoothOpacity,
          scale: smoothScale
        }}
        className="absolute inset-0"
      >
        {children}
      </motion.div>
    </div>
  )
}