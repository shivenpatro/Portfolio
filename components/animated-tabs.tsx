"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface Tab {
  id: string
  label: string
  icon?: React.ReactNode
}

interface AnimatedTabsProps {
  tabs: Tab[]
  defaultTabId?: string
  onChange?: (tabId: string) => void
  variant?: "underline" | "pills" | "boxed" | "gradient"
  className?: string
  tabClassName?: string
  activeTabClassName?: string
  indicatorClassName?: string
}

export const AnimatedTabs = ({
  tabs,
  defaultTabId,
  onChange,
  variant = "underline",
  className = "",
  tabClassName = "",
  activeTabClassName = "",
  indicatorClassName = "",
}: AnimatedTabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTabId || tabs[0]?.id)
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    left: 0,
    top: 0,
    height: 0,
  })
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})
  const containerRef = useRef<HTMLDivElement>(null)

  const updateIndicator = (tabId: string) => {
    const tabElement = tabRefs.current[tabId]
    if (!tabElement || !containerRef.current) return

    const { width, height, left, top } = tabElement.getBoundingClientRect()
    const parentLeft = containerRef.current.getBoundingClientRect().left || 0
    const parentTop = containerRef.current.getBoundingClientRect().top || 0

    setIndicatorStyle({
      width,
      height,
      left: left - parentLeft,
      top: top - parentTop,
    })
  }

  useEffect(() => {
    if (activeTab) {
      updateIndicator(activeTab)
    }

    const handleResize = () => {
      if (activeTab) {
        updateIndicator(activeTab)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [activeTab])

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    onChange?.(tabId)
  }

  const getVariantStyles = () => {
    switch (variant) {
      case "underline":
        return {
          container: "border-b border-border",
          tab: "px-4 py-2 text-muted-foreground hover:text-primary",
          activeTab: "text-primary",
          indicator: "h-0.5 bg-primary bottom-0",
        }
      case "pills":
        return {
          container: "gap-2",
          tab: "px-4 py-2 text-muted-foreground hover:text-primary rounded-full",
          activeTab: "text-primary-foreground",
          indicator: "bg-primary rounded-full -z-10",
        }
      case "boxed":
        return {
          container: "bg-muted p-1 rounded-lg",
          tab: "px-4 py-2 text-muted-foreground hover:text-primary rounded-md",
          activeTab: "text-foreground",
          indicator: "bg-background rounded-md shadow-sm -z-10",
        }
      case "gradient":
        return {
          container: "gap-2",
          tab: "px-4 py-2 text-muted-foreground hover:text-foreground rounded-full",
          activeTab: "text-primary-foreground",
          indicator: "bg-primary rounded-full -z-10",
        }
      default:
        return {
          container: "border-b border-border",
          tab: "px-4 py-2 text-muted-foreground hover:text-primary",
          activeTab: "text-primary",
          indicator: "h-0.5 bg-primary bottom-0",
        }
    }
  }

  const variantStyles = getVariantStyles()

  return (
    <div ref={containerRef} className={`relative flex ${variantStyles.container} ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          ref={(el) => {
            tabRefs.current[tab.id] = el;
          }}
          className={`relative flex items-center transition-colors duration-200 ${variantStyles.tab} ${
            activeTab === tab.id ? variantStyles.activeTab : ""
          } ${tabClassName} ${activeTab === tab.id ? activeTabClassName : ""}`}
          onClick={() => handleTabClick(tab.id)}
        >
          {tab.icon && <span className="mr-2">{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
      <motion.div
        className={`absolute ${variantStyles.indicator} ${indicatorClassName}`}
        initial={false}
        animate={{
          width: indicatorStyle.width,
          height: variant === "underline" ? 2 : indicatorStyle.height,
          left: indicatorStyle.left,
          top: variant === "underline" ? undefined : indicatorStyle.top,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </div>
  )
}
