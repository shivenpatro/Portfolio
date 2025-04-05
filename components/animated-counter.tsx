"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "framer-motion"

interface AnimatedCounterProps {
  end: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
  decimals?: number
  easing?: (t: number) => number
}

export const AnimatedCounter = ({
  end,
  duration = 2,
  className = "",
  prefix = "",
  suffix = "",
  decimals = 0,
  easing = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // Default to easeOutExpo
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const multiplier = Math.pow(10, decimals)

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const startAnimation = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const easedProgress = easing(progress)

      setCount(Math.floor(easedProgress * end * multiplier) / multiplier)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(startAnimation)
      }
    }

    animationFrame = requestAnimationFrame(startAnimation)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isInView, multiplier, easing])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  )
}

