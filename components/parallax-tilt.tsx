"use client"

import React, { useState, useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface ParallaxTiltProps {
  children: ReactNode
  className?: string
  tiltMaxAngleX?: number
  tiltMaxAngleY?: number
  perspective?: number
  scale?: number
  transitionSpeed?: number
  gyroscope?: boolean
}

export const ParallaxTilt = ({
  children,
  className = "",
  tiltMaxAngleX = 10,
  tiltMaxAngleY = 10,
  perspective = 1000,
  scale = 1.05,
  transitionSpeed = 0.2,
  gyroscope = false,
}: ParallaxTiltProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 300 }
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltMaxAngleY, -tiltMaxAngleY]), springConfig)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltMaxAngleX, tiltMaxAngleX]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !isHovered) return

    const rect = containerRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const normalizedX = mouseX / width - 0.5
    const normalizedY = mouseY / height - 0.5

    x.set(normalizedX)
    y.set(normalizedY)
  }

  const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
    if (!containerRef.current || !isHovered || !gyroscope) return
    if (e.beta === null || e.gamma === null) return

    const normalizedX = Math.min(Math.max(e.gamma / 45, -0.5), 0.5)
    const normalizedY = Math.min(Math.max(e.beta / 45 - 0.5, -0.5), 0.5)

    x.set(normalizedX)
    y.set(normalizedY)
  }

  React.useEffect(() => {
    if (gyroscope) {
      window.addEventListener("deviceorientation", handleDeviceOrientation)
      return () => window.removeEventListener("deviceorientation", handleDeviceOrientation)
    }
  }, [gyroscope, isHovered])

  return (
    <motion.div
      ref={containerRef}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        x.set(0)
        y.set(0)
      }}
      onMouseMove={handleMouseMove}
      style={{
        perspective: perspective,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          scale: isHovered ? scale : 1,
          transition: `transform ${transitionSpeed}s ease-out`,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

