"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { motion, Variants } from "framer-motion"

interface AnimatedNameProps {
  name: string
  className?: string
  color?: string
  hoverColor?: string
  fontSize?: string
  letterSpacing?: string
  staggerDelay?: number
  initialDelay?: number
}

export const AnimatedName = ({
  name,
  className = "",
  color = "#8b5cf6",
  hoverColor = "#d946ef",
  fontSize = "4rem",
  letterSpacing = "0.05em",
  staggerDelay = 0.1,
  initialDelay = 0.5,
}: AnimatedNameProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [randomRotations, setRandomRotations] = useState<number[]>([]);
  const letters = name.split("")
  const containerRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    setRandomRotations(letters.map(() => Math.random() * 10 - 5));
  }, [letters.length]);

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
        delay: initialDelay + i * staggerDelay,
          duration: 0.5,
          ease: "easeOut",
        },
    }),
    }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const canvas = document.getElementById('pixelated-canvas')
      if (canvas) {
        const event = new MouseEvent('mousemove', {
          clientX: e.clientX,
          clientY: e.clientY,
        })
        canvas.dispatchEvent(event)
      }
    }

    container.addEventListener('mousemove', handleMouseMove)
    return () => container.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <motion.h1
      ref={containerRef}
      className={`flex justify-center items-center flex-nowrap ${className}`}
      style={{
        fontSize,
        letterSpacing,
        fontWeight: 700,
      }}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          custom={index}
          variants={letterVariants}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
          style={{
            color: hoveredIndex === index ? hoverColor : color,
            display: "inline-block",
            transition: "color 0.3s ease",
            textShadow: hoveredIndex === index ? `0 0 15px ${hoverColor}` : "none",
            cursor: "default",
          }}
          whileHover={{
            scale: 1.2,
            rotate: randomRotations[index] || 0,
            transition: { type: "spring", stiffness: 500, damping: 10 },
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h1>
  )
}
