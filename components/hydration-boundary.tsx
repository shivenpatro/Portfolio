"use client"

import { useEffect, useState, ReactNode } from "react"

interface HydrationBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

export function HydrationBoundary({ children, fallback = null }: HydrationBoundaryProps) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  if (!isHydrated) {
    return fallback
  }

  return (
    <div suppressHydrationWarning>
      {children}
    </div>
  )
}
