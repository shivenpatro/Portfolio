"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedBackgroundProps {
  variant?: "particles" | "gradient" | "noise" | "grid"
  color1?: string
  color2?: string
  color3?: string
  intensity?: number
}

export const AnimatedBackground = ({
  variant = "particles",
  color1 = "rgba(99, 102, 241, 0.15)",
  color2 = "rgba(139, 92, 246, 0.15)",
  color3 = "rgba(217, 70, 239, 0.15)",
  intensity = 1,
}: AnimatedBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    if (variant === "particles") {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      let width = (canvas.width = window.innerWidth)
      let height = (canvas.height = window.innerHeight)

      const particles: Particle[] = []
      const particleCount = Math.floor(100 * intensity)
      const maxDistance = 200 * intensity

      class Particle {
        x: number
        y: number
        dirX: number
        dirY: number
        size: number
        color: string

        constructor() {
          this.x = Math.random() * width
          this.y = Math.random() * height
          this.dirX = (Math.random() - 0.5) * 0.5 * intensity
          this.dirY = (Math.random() - 0.5) * 0.5 * intensity
          this.size = Math.random() * 2 + 1

          // Parse the rgba colors to get their components
          const parseRgba = (rgba: string) => {
            try {
              const match = rgba.match(/rgba$$(\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)$$/)
              if (match) {
                return {
                  r: Number.parseInt(match[1]),
                  g: Number.parseInt(match[2]),
                  b: Number.parseInt(match[3]),
                  a: Number.parseFloat(match[4]),
                }
              }
            } catch (e) {
              console.error("Error parsing RGBA color:", e)
            }
            // Return a default color if parsing fails
            return { r: 150, g: 150, b: 255, a: 0.5 }
          }

          const color1Obj = parseRgba(color1)
          const color2Obj = parseRgba(color2)
          const color3Obj = parseRgba(color3)

          // Choose one of the three colors randomly
          const colorChoice = Math.floor(Math.random() * 3)
          const chosenColor = [color1Obj, color2Obj, color3Obj][colorChoice]

          // Add some variation to the color
          const r = Math.min(255, Math.max(0, chosenColor.r + Math.floor(Math.random() * 40 - 20)))
          const g = Math.min(255, Math.max(0, chosenColor.g + Math.floor(Math.random() * 40 - 20)))
          const b = Math.min(255, Math.max(0, chosenColor.b + Math.floor(Math.random() * 40 - 20)))
          const a = chosenColor.a * (0.5 + Math.random() * 0.5)

          this.color = `rgba(${r}, ${g}, ${b}, ${a})`
        }

        update() {
          if (this.x > width || this.x < 0) {
            this.dirX = -this.dirX
          }
          if (this.y > height || this.y < 0) {
            this.dirY = -this.dirY
          }

          this.x += this.dirX
          this.y += this.dirY
        }

        draw() {
          if (!ctx) return
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fillStyle = this.color
          ctx.fill()
        }
      }

      const init = () => {
        particles.length = 0
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle())
        }
      }

      const animate = () => {
        // Use a lower frame rate for particles to improve performance
        const frameId = requestAnimationFrame(animate)

        // Clear only what's needed
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
        ctx.fillRect(0, 0, width, height)

        // Batch processing for better performance
        const visibleParticles = particles.filter((p) => p.x >= 0 && p.x <= width && p.y >= 0 && p.y <= height)

        // Update all particles first
        for (let i = 0; i < particles.length; i++) {
          particles[i].update()
        }

        // Then draw only visible ones
        for (let i = 0; i < visibleParticles.length; i++) {
          visibleParticles[i].draw()
        }

        // Only draw connections for visible particles and limit the number of checks
        const maxConnections = Math.min(visibleParticles.length, 50)
        for (let i = 0; i < maxConnections; i++) {
          for (let j = i + 1; j < maxConnections; j++) {
            const dx = visibleParticles[i].x - visibleParticles[j].x
            const dy = visibleParticles[i].y - visibleParticles[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < maxDistance) {
              // Parse the rgba colors to get their components
              const parseRgba = (rgba: string) => {
                try {
                  const match = rgba.match(/rgba$$(\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)$$/)
                  if (match) {
                    return {
                      r: Number.parseInt(match[1]),
                      g: Number.parseInt(match[2]),
                      b: Number.parseInt(match[3]),
                      a: Number.parseFloat(match[4]),
                    }
                  }
                } catch (e) {
                  console.error("Error parsing RGBA color:", e)
                }
                // Return a default color if parsing fails
                return { r: 150, g: 150, b: 255, a: 0.5 }
              }

              const color1Obj = parseRgba(color1)
              const color2Obj = parseRgba(color2)

              // Interpolate between the two colors based on distance
              const ratio = 1 - distance / maxDistance
              const r = Math.floor(color1Obj.r * (1 - ratio) + color2Obj.r * ratio)
              const g = Math.floor(color1Obj.g * (1 - ratio) + color2Obj.g * ratio)
              const b = Math.floor(color1Obj.b * (1 - ratio) + color2Obj.b * ratio)
              const a = (color1Obj.a * (1 - ratio) + color2Obj.a * ratio) * ratio

              ctx.beginPath()
              ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`
              ctx.lineWidth = 0.5 * ratio * intensity
              ctx.moveTo(visibleParticles[i].x, visibleParticles[i].y)
              ctx.lineTo(visibleParticles[j].x, visibleParticles[j].y)
              ctx.stroke()
            }
          }
        }
      }

      const handleResize = () => {
        width = canvas.width = window.innerWidth
        height = canvas.height = window.innerHeight
      }

      window.addEventListener("resize", handleResize)

      init()
      animate()

      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }

    if (variant === "noise") {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      let width = (canvas.width = window.innerWidth)
      let height = (canvas.height = window.innerHeight)

      const imageData = ctx.createImageData(width, height)
      const data = imageData.data

      const noise = () => {
        for (let i = 0; i < data.length; i += 4) {
          const value = Math.floor(Math.random() * 255 * 0.1 * intensity)
          data[i] = value // red
          data[i + 1] = value // green
          data[i + 2] = value // blue
          data[i + 3] = 10 // alpha
        }
        ctx.putImageData(imageData, 0, 0)
        requestAnimationFrame(noise)
      }

      const handleResize = () => {
        width = canvas.width = window.innerWidth
        height = canvas.height = window.innerHeight
      }

      window.addEventListener("resize", handleResize)
      noise()

      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }

    if (variant === "grid") {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      let width = (canvas.width = window.innerWidth)
      let height = (canvas.height = window.innerHeight)

      const gridSize = 50
      const lineWidth = 0.5 * intensity

      const drawGrid = (time: number) => {
        ctx.clearRect(0, 0, width, height)

        // Parse the rgba colors to get their components
        const parseRgba = (rgba: string) => {
          try {
            const match = rgba.match(/rgba$$(\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)$$/)
            if (match) {
              return {
                r: Number.parseInt(match[1]),
                g: Number.parseInt(match[2]),
                b: Number.parseInt(match[3]),
                a: Number.parseFloat(match[4]),
              }
            }
          } catch (e) {
            console.error("Error parsing RGBA color:", e)
          }
          // Return a default color if parsing fails
          return { r: 150, g: 150, b: 255, a: 0.5 }
        }

        const color1Obj = parseRgba(color1)

        // Draw vertical lines
        for (let x = 0; x < width; x += gridSize) {
          const distFromCenter = Math.abs(x - width / 2) / (width / 2)
          const opacity = 0.1 * (1 - distFromCenter) * intensity

          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, height)
          ctx.strokeStyle = `rgba(${color1Obj.r}, ${color1Obj.g}, ${color1Obj.b}, ${opacity})`
          ctx.lineWidth = lineWidth
          ctx.stroke()
        }

        // Draw horizontal lines
        for (let y = 0; y < height; y += gridSize) {
          const distFromCenter = Math.abs(y - height / 2) / (height / 2)
          const opacity = 0.1 * (1 - distFromCenter) * intensity

          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(width, y)
          ctx.strokeStyle = `rgba(${color1Obj.r}, ${color1Obj.g}, ${color1Obj.b}, ${opacity})`
          ctx.lineWidth = lineWidth
          ctx.stroke()
        }

        // Add some moving dots at intersections
        const dotSize = 2 * intensity
        for (let x = 0; x < width; x += gridSize) {
          for (let y = 0; y < height; y += gridSize) {
            const distFromCenter = Math.sqrt(
              Math.pow((x - width / 2) / (width / 2), 2) + Math.pow((y - height / 2) / (height / 2), 2),
            )

            if (distFromCenter < 0.8) {
              const pulseSize = ((Math.sin(time / 1000 + distFromCenter * 5) + 1) / 2) * dotSize
              const opacity = 0.3 * (1 - distFromCenter) * intensity

              ctx.beginPath()
              ctx.arc(x, y, pulseSize, 0, Math.PI * 2)
              ctx.fillStyle = `rgba(${color1Obj.r}, ${color1Obj.g}, ${color1Obj.b}, ${opacity})`
              ctx.fill()
            }
          }
        }

        requestAnimationFrame(drawGrid)
      }

      const handleResize = () => {
        width = canvas.width = window.innerWidth
        height = canvas.height = window.innerHeight
      }

      window.addEventListener("resize", handleResize)
      requestAnimationFrame(drawGrid)

      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [variant, color1, color2, color3, intensity, dimensions])

  if (variant === "gradient") {
    return (
      <motion.div
        className="absolute inset-0 w-full h-full z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${color1}, ${color2}, ${color3})`,
            opacity: 0.2 * intensity,
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: `linear-gradient(to bottom, transparent, ${color3})`,
            opacity: 0.05 * intensity,
          }}
        />
      </motion.div>
    )
  }

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    />
  )
}

