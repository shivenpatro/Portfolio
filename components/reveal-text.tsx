"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface RevealTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  once?: boolean
  threshold?: number
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
  staggerChildren?: number
  direction?: "up" | "down" | "left" | "right"
  preserveWhitespace?: boolean
}

export const RevealText = ({
  text,
  className = "",
  delay = 0,
  duration = 0.5,
  once = true,
  threshold = 0.1,
  as = "p",
  staggerChildren = 0.03,
  direction = "up",
  preserveWhitespace = true,
}: RevealTextProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })

  const getDirectionVariants = () => {
    switch (direction) {
      case "up":
        return {
          hidden: { y: 20, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        }
      case "down":
        return {
          hidden: { y: -20, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        }
      case "left":
        return {
          hidden: { x: 20, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        }
      case "right":
        return {
          hidden: { x: -20, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        }
      default:
        return {
          hidden: { y: 20, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren, delayChildren: delay * i },
    }),
  }

  const childVariants = getDirectionVariants()

  // Ensure proper spacing by explicitly adding spaces between words
  const words = text.split(" ").filter((word) => word.length > 0)

  const Component = motion[as]

  return (
    <Component
      ref={ref}
      className={`${className} ${preserveWhitespace ? "whitespace-pre-wrap" : ""}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <motion.span key={index} className="inline-block" variants={childVariants} transition={{ duration }}>
          {word}
          {index !== words.length - 1 && " "}
        </motion.span>
      ))}
    </Component>
  )
}

