"use client"
import { motion, useScroll, useSpring } from "framer-motion"

interface ScrollProgressProps {
  color?: string
  height?: number
  position?: "top" | "bottom"
  zIndex?: number
  containerClassName?: string
  barClassName?: string
}

export const ScrollProgress = ({
  color = "#34d399",
  height = 4,
  position = "top",
  zIndex = 50,
  containerClassName = "",
  barClassName = "",
}: ScrollProgressProps) => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      className={`fixed left-0 right-0 ${position === "top" ? "top-0" : "bottom-0"} ${containerClassName}`}
      style={{ height, zIndex }}
    >
      <motion.div className={`h-full origin-left ${barClassName}`} style={{ scaleX, backgroundColor: color }} />
    </motion.div>
  )
}
