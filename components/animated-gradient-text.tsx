"use client"
import { motion } from "framer-motion"

interface AnimatedGradientTextProps {
  text: string
  className?: string
  gradient?: string
}

export const AnimatedGradientText = ({
  text,
  className = "",
  gradient = "from-indigo-500 via-purple-500 to-pink-500",
}: AnimatedGradientTextProps) => {
  return (
    <motion.h2
      className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}
      initial={{ backgroundPosition: "0% 50%" }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 15,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    >
      {text}
    </motion.h2>
  )
}

