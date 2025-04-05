"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TextCarouselProps {
  phrases: string[]
  className?: string
  interval?: number
}

export const TextCarousel = ({ phrases, className = "", interval = 3000 }: TextCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [key, setKey] = useState(0) // Force re-render with a key change
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Reset to ensure we start fresh
    setCurrentIndex(0)
    setKey((prev) => prev + 1)

    // Set up new interval
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length)
    }, interval)

    // Clean up on unmount or when dependencies change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [phrases.length, interval])

  return (
    <div className="relative h-full">
      <AnimatePresence mode="wait" key={key}>
        <motion.p
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={className}
        >
          {phrases[currentIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

