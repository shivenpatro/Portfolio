"use client"

import type React from "react"
import { useState, useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface ThreeDCardProps {
  children: ReactNode
  className?: string
  glareColor?: string
  borderColor?: string
  shadowColor?: string
  perspective?: number
  tiltAmount?: number
  glareAmount?: number
  borderRadius?: string
  scale?: number
}

// Helper to detect mobile size at runtime (client-only component).
const isMobileDevice = () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches

export const ThreeDCard = ({
  children,
  className = "",
  glareColor = "rgba(255, 255, 255, 0.4)",
  borderColor = "rgba(255, 255, 255, 0.1)",
  shadowColor = "rgba(0, 0, 0, 0.3)",
  perspective = 1000,
  tiltAmount = 10,
  glareAmount = 0.5,
  borderRadius = "1rem",
  scale = 1.02,
}: ThreeDCardProps) => {
  // On mobile we skip all the motion logic and just render a normal div to improve performance.
  if (isMobileDevice()) {
    return (
      <div
        className={`relative overflow-hidden ${className}`}
        style={{ borderRadius }}
      >
        {children}
      </div>
    )
  }
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const glareX = useMotionValue(0)
  const glareY = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 300 }
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltAmount, -tiltAmount]), springConfig)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltAmount, tiltAmount]), springConfig)
  const glareOpacity = useSpring(useMotionValue(0), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isHovered) return

    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const normalizedX = mouseX / width - 0.5
    const normalizedY = mouseY / height - 0.5

    x.set(normalizedX)
    y.set(normalizedY)

    // Calculate glare position
    glareX.set(mouseX / width)
    glareY.set(mouseY / height)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        perspective,
        transformStyle: "preserve-3d",
        borderRadius,
      }}
      onMouseEnter={() => {
        setIsHovered(true)
        glareOpacity.set(glareAmount)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        x.set(0)
        y.set(0)
        glareOpacity.set(0)
      }}
      onMouseMove={handleMouseMove}
      whileHover={{ scale }}
    >
      <motion.div
        className="w-full h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          border: `1px solid ${borderColor}`,
          borderRadius,
          boxShadow: `0 10px 30px -5px ${shadowColor}`,
        }}
      >
        {children}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${useTransform(
              glareX,
              [0, 1],
              ["0%", "100%"],
            )} ${useTransform(glareY, [0, 1], ["0%", "100%"])}, ${glareColor}, transparent)`,
            opacity: glareOpacity,
            borderRadius,
          }}
        />
      </motion.div>
    </motion.div>
  )
}

