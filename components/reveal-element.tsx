"use client"

import { type ReactNode, useRef } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayout"

gsap.registerPlugin(ScrollTrigger)

interface RevealElementProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  once?: boolean
  threshold?: number
  direction?: "up" | "down" | "left" | "right" | "scale" | "opacity"
  distance?: number
}

export const RevealElement = ({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  once = true,
  threshold = 0.2,
  direction = "up",
  distance = 60,
}: RevealElementProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const dir: Record<string, gsap.TweenVars> = {
      up: { y: distance },
      down: { y: -distance },
      left: { x: distance },
      right: { x: -distance },
      scale: { scale: 0.85 },
      opacity: {},
    }

    const tweenVars: gsap.TweenVars = {
      ...dir[direction],
      opacity: 0,
    }

    const ctx = gsap.context(() => {
      gsap.from(el, {
        ...tweenVars,
        delay,
        duration,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: `top ${Math.floor((1 - threshold) * 100)}%`,
          toggleActions: once ? "play none none none" : "play none none reset",
        },
      })
    }, el)

    return () => ctx.revert()
  }, [delay, duration, once, threshold, direction, distance])

  return <div ref={ref} className={className}>{children}</div>
}
