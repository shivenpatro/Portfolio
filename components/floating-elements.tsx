"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
}

export const FloatingElements = () => {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    const generateElements = () => {
      const newElements: FloatingElement[] = []
      for (let i = 0; i < 15; i++) {
        newElements.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          duration: Math.random() * 20 + 10,
          delay: Math.random() * 5,
          opacity: Math.random() * 0.3 + 0.1
        })
      }
      setElements(newElements)
    }

    generateElements()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full bg-gradient-to-r from-indigo-400/20 to-purple-400/20 backdrop-blur-sm"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            opacity: element.opacity
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}