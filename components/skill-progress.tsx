"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface SkillProgressProps {
  skill: string
  percentage: number
  color?: string
}

export const SkillProgress = ({ skill, percentage, color = "bg-indigo-500" }: SkillProgressProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-gray-300">{skill}</span>
        <span className="text-sm font-medium text-gray-400">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <motion.div
          className={`h-2.5 rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${percentage}%` : 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

