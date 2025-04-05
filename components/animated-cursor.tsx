"use client"

import { useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface AnimatedCursorProps {
  color?: string
}

export const AnimatedCursor = ({ color = "#ffffff" }: AnimatedCursorProps) => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springOptions = { damping: 25, stiffness: 700 }
  const cursorX = useSpring(mouseX, springOptions)
  const cursorY = useSpring(mouseY, springOptions)

  const dotSpringOptions = { damping: 50, stiffness: 900 }
  const cursorDotX = useSpring(mouseX, dotSpringOptions)
  const cursorDotY = useSpring(mouseY, dotSpringOptions)

  const scale = useMotionValue(1)
  const scaleSpring = useSpring(scale, { damping: 15, stiffness: 150 })
  const opacity = useMotionValue(1)
  const opacitySpring = useSpring(opacity, { damping: 15, stiffness: 150 })

  useEffect(() => {
    // Debounced mouse position update with requestAnimationFrame for better performance
    let rafId: number | null = null
    let lastMouseX = 0
    let lastMouseY = 0

    const updateMousePosition = (e: MouseEvent) => {
      lastMouseX = e.clientX
      lastMouseY = e.clientY

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          mouseX.set(lastMouseX)
          mouseY.set(lastMouseY)
          rafId = null
        })
      }
    }

    const handleMouseDown = () => {
      scale.set(0.8)
    }

    const handleMouseUp = () => {
      scale.set(1)
    }

    const handleMouseEnter = () => {
      opacity.set(1)
    }

    const handleMouseLeave = () => {
      opacity.set(0)
    }

    // Use event delegation for link hover instead of attaching to each element
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "A" || target.tagName === "BUTTON" || target.closest("a") || target.closest("button")) {
        scale.set(1.5)
      } else {
        scale.set(1)
      }
    }

    window.addEventListener("mousemove", updateMousePosition, { passive: true })
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mouseenter", handleMouseEnter)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("mouseover", handleMouseOver, { passive: true })

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseenter", handleMouseEnter)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [mouseX, mouseY, scale, opacity])

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-[100] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          width: "32px",
          height: "32px",
          translateX: "-50%",
          translateY: "-50%",
          scale: scaleSpring,
          opacity: opacitySpring,
        }}
      >
        <motion.div
          className="w-full h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
      <motion.div
        ref={cursorDotRef}
        className="fixed pointer-events-none z-[100] w-2 h-2 rounded-full"
        style={{
          x: cursorDotX,
          y: cursorDotY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: color,
          opacity: opacitySpring,
        }}
      />
    </>
  )
}

