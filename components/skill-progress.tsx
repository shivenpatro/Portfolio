"use client"

import { useRef } from "react"
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayout"
import gsap from "gsap"

interface SkillProgressProps {
  percentage: number
}

export function SkillProgress({ percentage }: SkillProgressProps) {
  const barRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const bar = barRef.current
    const container = containerRef.current
    if (!bar || !container) return

    const ctx = gsap.context(() => {
      gsap.to(bar, {
        width: `${percentage}%`,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })
    }, container)

    return () => ctx.revert()
  }, [percentage])

  return (
    <div ref={containerRef} className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
      <div
        ref={barRef}
        className="h-2.5 rounded-full bg-emerald-400"
        style={{ width: 0 }}
      />
    </div>
  )
}

