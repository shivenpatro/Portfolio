"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import { Sun, Moon } from "lucide-react"
import { FolderOpen, Download, ChevronDown, Mail, Github, Linkedin, ExternalLink } from "lucide-react"
import { Code, Database, Globe, Server, Cpu, GitBranch, FileText, Award } from "lucide-react"
import debounce from "lodash/debounce"

// Dynamically import components for better performance
const ResumeModal = dynamic(() => import("@/components/resume-modal").then(mod => ({ default: mod.ResumeModal })), { ssr: false })
const AnimatedBackground = dynamic(() => import("@/components/animated-background").then(mod => ({ default: mod.AnimatedBackground })), { ssr: false })
const AnimatedCursor = dynamic(() => import("@/components/animated-cursor").then(mod => ({ default: mod.AnimatedCursor })), { ssr: false })
const ParallaxScroll = dynamic(() => import("@/components/parallax-scroll").then(mod => ({ default: mod.ParallaxScroll })), { ssr: false })
const ThreeDCard = dynamic(() => import("@/components/3d-card").then(mod => ({ default: mod.ThreeDCard })), { ssr: false })
const AnimatedGradientBorder = dynamic(() => import("@/components/animated-gradient-border").then(mod => ({ default: mod.AnimatedGradientBorder })), { ssr: false })
const ScrollProgress = dynamic(() => import("@/components/scroll-progress").then(mod => ({ default: mod.ScrollProgress })), { ssr: false })
const ScrollToTop = dynamic(() => import("@/components/scroll-to-top").then(mod => ({ default: mod.ScrollToTop })), { ssr: false })
const AnimatedName = dynamic(() => import("@/components/animated-name").then(mod => ({ default: mod.AnimatedName })), { ssr: false })

// Enhanced UI Components
const RevealText = ({ text, className = "", delay = 0, duration = 0.5, once = true, threshold = 0.1, as = "p", staggerChildren = 0.03, direction = "up", preserveWhitespace = true }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })

  const getDirectionVariants = () => {
    switch (direction) {
      case "up":
      default:
        return {
          hidden: { y: 20, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        }
      case "down":
        return {
          hidden: { y: -20, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        }
      case "left":
        return {
          hidden: { x: 20, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        }
      case "right":
        return {
          hidden: { x: -20, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        }
      default:
        return {
          hidden: { y: 20, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren, delayChildren: delay * i },
    }),
  }

  const childVariants = getDirectionVariants()

  // Ensure proper spacing by explicitly adding spaces between words
  const words = text.split(" ").filter((word) => word.length > 0)

  const Component = motion[as]

  return (
    <Component
      ref={ref}
      className={`${className} ${preserveWhitespace ? "whitespace-pre-wrap" : ""}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <motion.span key={index} className="inline-block" variants={childVariants} transition={{ duration }}>
          {word}
          {index !== words.length - 1 && " "}
        </motion.span>
      ))}
    </Component>
  )
}

const RevealElement = ({ children, className = "", delay = 0, duration = 0.5, once = true, threshold = 0.1, direction = "up", distance = 50 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })

  const getDirectionVariants = () => {
    switch (direction) {
      case "up":
      default:
        return {
          hidden: { y: distance, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        }
      case "down":
        return {
          hidden: { y: -distance, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        }
      case "left":
        return {
          hidden: { x: distance, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        }
      case "right":
        return {
          hidden: { x: -distance, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        }
      case "scale":
        return {
          hidden: { scale: 0.8, opacity: 0 },
          visible: { scale: 1, opacity: 1 },
        }
      case "opacity":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }
      default:
        return {
          hidden: { y: distance, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        }
    }
  }

  const variants = getDirectionVariants()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

const AnimatedButton = ({ children, onClick, className = "", variant = "primary", size = "md", disabled = false, icon, iconPosition = "left", fullWidth = false, gradientColors = ["#6366f1", "#8b5cf6", "#d946ef"], hoverScale = 1.05, pressScale = 0.95, borderRadius = "9999px", glowAmount = 10 }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
      default:
        return "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg hover:shadow-xl"
      case "secondary":
        return "bg-purple-600 hover:bg-purple-500 text-white shadow-lg hover:shadow-xl"
      case "outline":
        return "bg-transparent border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500/10 hover:border-indigo-400"
      case "ghost":
        return "bg-transparent hover:bg-indigo-500/10 text-indigo-500"
      case "gradient":
        return "text-white shadow-lg hover:shadow-xl"
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "py-2 px-4 text-sm"
      case "md":
      default:
        return "py-3 px-6 text-base"
      case "lg":
        return "py-4 px-8 text-lg"
    }
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`relative flex items-center justify-center font-semibold transition-all duration-300 ${getVariantStyles()} ${getSizeStyles()} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      style={{
        borderRadius,
        ...(variant === "gradient"
          ? {
              background: `linear-gradient(90deg, ${gradientColors.join(", ")})`,
              backgroundSize: "200% 100%",
            }
          : {}),
        ...(variant === "gradient"
          ? {
              boxShadow: `0 0 ${glowAmount}px 0 rgba(99, 102, 241, 0.4)`,
            }
          : {}),
      }}
      whileHover={
        !disabled
          ? {
              scale: hoverScale,
              backgroundPosition: ["0% 50%", "100% 50%"],
              transition: {
                backgroundPosition: {
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              },
            }
          : {}
      }
      whileTap={!disabled ? { scale: pressScale } : {}}
      animate={
        variant === "gradient"
          ? {
              backgroundPosition: ["0% 50%", "100% 50%"],
              transition: {
                backgroundPosition: {
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              },
            }
          : {}
      }
    >
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </motion.button>
  )
}

const AnimatedTabs = ({ tabs, defaultTabId, onChange, variant = "underline", className = "", tabClassName = "", activeTabClassName = "", indicatorClassName = "" }) => {
  const [activeTab, setActiveTab] = useState(defaultTabId || tabs[0]?.id)
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    left: 0,
    top: 0,
    height: 0,
  })
  const tabRefs = useRef({})
  const containerRef = useRef(null)

  const updateIndicator = (tabId) => {
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

  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
    onChange?.(tabId)
  }

  const getVariantStyles = () => {
    switch (variant) {
      case "underline":
      default:
        return {
          container: "border-b border-gray-200 dark:border-gray-700",
          tab: "px-6 py-3 text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200",
          activeTab: "text-indigo-600 dark:text-indigo-400",
          indicator: "h-0.5 bg-indigo-600 dark:bg-indigo-400 bottom-0 rounded-full",
        }
      case "pills":
        return {
          container: "gap-2",
          tab: "px-6 py-3 text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 rounded-full transition-colors duration-200",
          activeTab: "text-white",
          indicator: "bg-indigo-600 dark:bg-indigo-500 rounded-full -z-10",
        }
      case "boxed":
        return {
          container: "bg-gray-100 dark:bg-gray-800 p-1 rounded-lg",
          tab: "px-6 py-3 text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 rounded-md transition-colors duration-200",
          activeTab: "text-indigo-600 dark:text-indigo-400",
          indicator: "bg-white dark:bg-gray-700 rounded-md shadow-sm -z-10",
        }
      case "gradient":
        return {
          container: "gap-2",
          tab: "px-6 py-3 text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 rounded-full transition-colors duration-200",
          activeTab: "text-white",
          indicator: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full -z-10",
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
            tabRefs.current[tab.id] = el
          }}
          className={`relative flex items-center font-medium ${variantStyles.tab} ${
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
          x: indicatorStyle.left,
          y: variant === "underline" ? indicatorStyle.height - 2 : indicatorStyle.top,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </div>
  )
}

const AnimatedTooltip = ({ children, content, position = "top", delay = 0.2, offset = 10, className = "", contentClassName = "", arrow = true }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  let timer

  const getPositionStyles = () => {
    switch (position) {
      case "top":
      default:
        return {
          container: "bottom-full left-1/2 transform -translate-x-1/2",
          offset: `${-offset}px`,
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          arrow:
            "top-full left-1/2 transform -translate-x-1/2 border-t-gray-800 border-l-transparent border-r-transparent border-b-transparent",
        }
      case "bottom":
        return {
          container: "top-full left-1/2 transform -translate-x-1/2",
          offset: `${offset}px`,
          initial: { opacity: 0, y: -10 },
          animate: { opacity: 1, y: 0 },
          arrow:
            "bottom-full left-1/2 transform -translate-x-1/2 border-b-gray-800 border-l-transparent border-r-transparent border-t-transparent",
        }
      case "left":
        return {
          container: "right-full top-1/2 transform -translate-y-1/2",
          offset: `${-offset}px`,
          initial: { opacity: 0, x: 10 },
          animate: { opacity: 1, x: 0 },
          arrow:
            "left-full top-1/2 transform -translate-y-1/2 border-l-gray-800 border-t-transparent border-b-transparent border-r-transparent",
        }
      case "right":
        return {
          container: "left-full top-1/2 transform -translate-y-1/2",
          offset: `${offset}px`,
          initial: { opacity: 0, x: -10 },
          animate: { opacity: 1, x: 0 },
          arrow:
            "right-full top-1/2 transform -translate-y-1/2 border-r-gray-800 border-t-transparent border-b-transparent border-l-transparent",
        }
    }
  }

  const positionStyles = getPositionStyles()

  const handleMouseEnter = () => {
    clearTimeout(timer)
    setIsMounted(true)
    timer = setTimeout(() => {
      setIsVisible(true)
    }, delay * 1000)
  }

  const handleMouseLeave = () => {
    clearTimeout(timer)
    setIsVisible(false)
    timer = setTimeout(() => {
      setIsMounted(false)
    }, 200)
  }

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}
      <AnimatePresence>
        {isMounted && (
          <motion.div
            className={`absolute z-50 ${positionStyles.container}`}
            style={{
              [position === "top" || position === "bottom" ? "marginTop" : "marginLeft"]: positionStyles.offset,
            }}
            initial={positionStyles.initial}
            animate={isVisible ? positionStyles.animate : positionStyles.initial}
            exit={positionStyles.initial}
            transition={{ duration: 0.2 }}
          >
            <div
              className={`bg-gray-800 text-white text-sm rounded-md py-2 px-3 whitespace-nowrap shadow-lg ${contentClassName}`}
            >
              {content}
            </div>
            {arrow && <div className={`absolute w-0 h-0 border-4 ${positionStyles.arrow}`} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const AnimatedCounter = ({ end, duration = 2, className = "", prefix = "", suffix = "", decimals = 0, easing = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)) }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const multiplier = Math.pow(10, decimals)

  useEffect(() => {
    if (!isInView) return

    let animationFrame
    let startTime

    const startAnimation = (timestamp) => {
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

const TextCarousel = ({ phrases, className = "", interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [key, setKey] = useState(0) // Force re-render with a key change
  const intervalRef = useRef(null)

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

// Client-only wrapper
function ClientOnly({ children, fallback = null }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient ? children : fallback
}

// Hydration boundary
function HydrationBoundary({ children, fallback = null }) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  if (!isHydrated) {
    return (
      <div suppressHydrationWarning>
        {children}
      </div>
    )
  }

  return fallback
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("home")
  const [isMobile, setIsMobile] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false)
  const [projectFilter, setProjectFilter] = useState("all")

  const { scrollYProgress } = useScroll()
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0])

  const scrollingRef = useRef(false)

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    } else {
      setIsDark(false)
      document.documentElement.classList.remove("dark")
    }
  }, [])

  // Initialize mobile detection and loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0)

    // Check resume files availability
    const checkResumeFiles = async () => {
      console.log("Resume files will be checked when needed")
    }
    checkResumeFiles()

    return () => clearTimeout(timer)
  }, [])

  // Section detection
  const detectActiveSection = useCallback(
    debounce(() => {
      if (scrollingRef.current) return

      const sections = ["home", "about", "skills", "projects", "contact"]
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }, 100),
    []
  )

  useEffect(() => {
    window.addEventListener("scroll", detectActiveSection, { passive: true })
    return () => window.removeEventListener("scroll", detectActiveSection)
  }, [detectActiveSection])

  // Smooth scroll to section
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId)
    if (element && !scrollingRef.current) {
      scrollingRef.current = true
      const targetPosition = element.getBoundingClientRect().top + window.scrollY
      const startPosition = window.scrollY
      const distance = targetPosition - startPosition
      let startTime = null

      const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1)

      const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / 800, 1)
        const ease = easeInOutCubic(progress)

        window.scrollTo(0, startPosition + distance * ease)

        if (progress < 1) {
          requestAnimationFrame(animation)
        } else {
          setIsMobileMenuOpen(false)
          setTimeout(() => {
            scrollingRef.current = false
            setActiveSection(sectionId)
          }, 100)
        }
      }

      requestAnimationFrame(animation)
    }
  }, [])

  // Projects data
  const projects = [
    {
      title: "HashChat",
      description: "A secure real-time chat application with end-to-end encryption using the SHA-256 algorithm. Features include user authentication, message persistence, typing indicators, read receipts, and a responsive UI built with React and Firebase.",
      image: "/hashchat-preview.svg",
      url: "https://github.com/shivenpatro/HashChat",
      tags: ["JavaScript", "React", "Firebase", "Encryption", "WebSockets"],
      category: "web-dev",
    },
    {
      title: "Personal Budget Tracker",
      description: "A simple and sleek budget tracking application with proper animations and workflow, built using modern web technologies.",
      image: "https://placehold.co/500x300/3730a3/ffffff?text=Budget+Tracker",
      url: "https://github.com/shivenpatro/budget-tracker",
      tags: ["JavaScript", "React", "CSS", "Finance"],
      category: "web-dev",
    },
    {
      title: "Skincare Tracker Timer",
      description: "A specialized tracking application for skincare routines with timing functionality.",
      image: "https://placehold.co/500x300/3730a3/ffffff?text=Skincare+Timer",
      url: "https://github.com/shivenpatro/Skincare-Tracker-Timer",
      tags: ["JavaScript", "HTML", "CSS", "Health"],
      category: "web-dev",
    },
    {
      title: "Breakout Game",
      description: "A Python-based breakout game implementation featuring 6 powerups and basic gameplay features using pygame.",
      image: "https://placehold.co/500x300/3730a3/ffffff?text=Breakout+Game",
      url: "https://github.com/shivenpatro/breakout",
      tags: ["Python", "Pygame", "Game Development"],
      category: "software",
    },
    {
      title: "Text to Handwriting",
      description: "Transforms digital text into realistic handwritten documents with custom fonts and natural text variations.",
      image: "https://placehold.co/500x300/3730a3/ffffff?text=Text+to+Handwriting",
      url: "https://github.com/shivenpatro/Text-to-handwritten",
      tags: ["Python", "Image Processing", "Automation"],
      category: "software",
    },
    {
      title: "Wine Quality Prediction",
      description: "Developed a robust wine quality prediction model using machine learning techniques and data analysis.",
      image: "https://placehold.co/500x300/3730a3/ffffff?text=Wine+Prediction",
      url: "https://github.com/shivenpatro/wine-quality-prediction",
      tags: ["Python", "Machine Learning", "Data Science"],
      category: "data-science",
    },
  ]

  const filteredProjects = projectFilter === "all" ? projects : projects.filter((project) => project.category === projectFilter)

  // Loading screen
  if (isLoading) {
    return (
      <ClientOnly>
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900">
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-xl opacity-50"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
            <motion.div
              className="relative z-10 text-4xl sm:text-5xl font-bold"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                background: "linear-gradient(45deg, #6366f1, #8b5cf6, #d946ef)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Loading...
            </motion.div>
          </div>
        </div>
      </ClientOnly>
    )
  }

  return (
    <HydrationBoundary>
      <div className={`${isDark ? "dark" : ""} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen font-sans ${isMobile ? "" : "cursor-none"}`}>
        {/* Animated Cursor */}
        <ClientOnly>{!isMobile && <AnimatedCursor />}</ClientOnly>

        {/* Animated Background */}
        <ClientOnly>
          <AnimatedBackground variant="particles" intensity={1.2} />
        </ClientOnly>

        {/* Resume Modal */}
        <ClientOnly>
          <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
        </ClientOnly>

        {/* Scroll Progress */}
        <ClientOnly>
          <ScrollProgress color="#8b5cf6" height={3} />
        </ClientOnly>

        {/* Scroll to Top */}
        <ClientOnly>
          <ScrollToTop backgroundColor="rgba(139, 92, 246, 0.8)" />
        </ClientOnly>

        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 dark:bg-gray-900/10 backdrop-blur-md border-b border-white/10">
          <nav className="container mx-auto px-6 lg:px-8 py-4 lg:py-6 flex justify-between items-center">
            <div className="flex items-center">
              {/* Mobile Menu Button */}
              <motion.button
                className="sm:hidden mr-4 text-gray-300 hover:text-indigo-400"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </motion.button>

              {/* Mobile Menu Overlay */}
              <AnimatePresence>
                {isMobileMenuOpen && (
                  <motion.div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                )}
              </AnimatePresence>

              {/* Navigation Menu */}
              <motion.ul
                className={`${
                  isMobileMenuOpen
                    ? "flex flex-col fixed top-[72px] left-0 right-0 bg-gray-900/95 backdrop-blur-md p-6 shadow-lg border-b border-indigo-500/20 z-50"
                    : "hidden"
                } sm:flex sm:flex-row sm:static sm:shadow-none sm:p-0 sm:bg-transparent sm:space-x-8 sm:border-none sm:z-auto`}
                initial={isMobileMenuOpen ? { height: 0, opacity: 0 } : false}
                animate={isMobileMenuOpen ? { height: "auto", opacity: 1 } : false}
                exit={isMobileMenuOpen ? { height: 0, opacity: 0 } : false}
                transition={{ duration: 0.3 }}
              >
                {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
                  <motion.li key={item} className="mb-4 sm:mb-0">
                    <motion.button
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className={`relative text-base lg:text-lg font-medium transition-colors duration-200 ${
                        activeSection === item.toLowerCase() ? "text-indigo-400" : "text-gray-300 hover:text-indigo-400"
                      }`}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item}
                      {activeSection === item.toLowerCase() && (
                        <motion.span
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-400"
                          layoutId="activeSection"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* Theme Toggle */}
            <motion.button
              onClick={() => {
                const newTheme = !isDark
                setIsDark(newTheme)
                if (newTheme) {
                  document.documentElement.classList.add("dark")
                  localStorage.setItem("theme", "dark")
                } else {
                  document.documentElement.classList.remove("dark")
                  localStorage.setItem("theme", "light")
                }
              }}
              className="p-3 rounded-full bg-gray-800/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-200"
              whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)" }}
              whileTap={{ scale: 0.9 }}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun className="w-5 h-5 lg:w-6 lg:h-6" /> : <Moon className="w-5 h-5 lg:w-6 lg:h-6" />}
            </motion.button>
          </nav>
        </header>

        {/* Main Content */}
        <main className="relative z-10">
          {/* Hero Section */}
          <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Enhanced Hero Background */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent" />
            </div>

            {/* Animated Name */}
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="w-full max-w-6xl px-6">
                <AnimatedName
                  name="Shiven Patro"
                  className="mb-8 text-center"
                  fontSize="clamp(3rem, 10vw, 6rem)"
                />
              </div>
            </div>

            {/* Hero Content */}
            <div className="relative z-20 text-center w-full max-w-4xl mx-auto px-6 mt-32">
              <RevealElement>
                <div className="h-16 overflow-hidden text-center mb-8">
                  <TextCarousel
                    phrases={[
                      "Data Science Engineer",
                      "Web Developer", 
                      "AI Enthusiast",
                      "ML Engineer",
                      "Software Developer",
                      "Python Developer"
                    ]}
                    className="text-xl sm:text-2xl lg:text-3xl font-light text-indigo-300"
                  />
                </div>
              </RevealElement>

              <RevealElement delay={0.4} direction="up">
                <div className="mt-12 flex flex-wrap justify-center gap-6">
                  <AnimatedButton
                    onClick={() => scrollToSection("projects")}
                    variant="gradient"
                    icon={<FolderOpen className="w-5 h-5" />}
                    iconPosition="right"
                    size="lg"
                  >
                    Explore My Work
                  </AnimatedButton>
                  <AnimatedButton
                    onClick={() => setIsResumeModalOpen(true)}
                    variant="outline"
                    icon={<Download className="w-5 h-5" />}
                    iconPosition="right"
                    size="lg"
                  >
                    Download Resume
                  </AnimatedButton>
                </div>
              </RevealElement>

              {/* Scroll Indicator */}
              <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer z-20"
                onClick={() => scrollToSection("about")}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.1 }}
              >
                <p className="text-white text-sm mb-2 font-medium">Scroll Down</p>
                <ChevronDown className="text-white w-6 h-6" />
              </motion.div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-24 lg:py-32 px-6 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/5 to-purple-900/5 pointer-events-none" />
            <div className="max-w-7xl mx-auto">
              <RevealText
                text="About Me"
                as="h2"
                className="text-4xl lg:text-5xl font-bold mb-20 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"
              />

              <div className="flex flex-col lg:flex-row items-center gap-16">
                {/* Profile Image */}
                <RevealElement direction="left" className="mb-12 lg:mb-0">
                  <ClientOnly>
                    <ThreeDCard className="w-64 h-64 lg:w-80 lg:h-80 overflow-hidden">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-10-06%20174845-niZuwek8A8ugtOlijz5XV7LeVs6C4t.png"
                        alt="Shiven Patro"
                        className="rounded-full w-full h-full object-cover object-center"
                      />
                    </ThreeDCard>
                  </ClientOnly>
                </RevealElement>

                {/* About Content */}
                <div className="flex-1">
                  <div className="text-lg lg:text-xl mb-8 text-gray-300 leading-relaxed space-y-6">
                    <p>
                      Hello! I'm Shiven Patro, an aspiring Data Science Engineer with a strong academic foundation and experience in Web Development. Currently pursuing BTech CSE at VIT-AP with a CGPA of 8.5/10.
                    </p>
                    <p>
                      I'm passionately leveraging AI & LLM models to gain expertise in Data Science, Machine Learning, and other software domains, including Cloud Computing and Web Technologies, to build web applications with simple solutions.
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <RevealElement delay={0.6} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                    {[
                      { icon: <Code className="w-6 h-6 text-indigo-300" />, value: 10, label: "Projects" },
                      { icon: <Award className="w-6 h-6 text-indigo-300" />, value: 8.5, decimals: 1, label: "CGPA" },
                      { icon: <Server className="w-6 h-6 text-indigo-300" />, value: 5, label: "Technologies" },
                      { icon: <GitBranch className="w-6 h-6 text-indigo-300" />, value: 2, label: "Hackathons" },
                    ].map((stat, index) => (
                      <AnimatedGradientBorder key={index} borderRadius="0.75rem" glowAmount={5}>
                        <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 text-center">
                          <div className="flex flex-col items-center">
                            <div className="p-3 bg-indigo-500/20 rounded-full mb-4">{stat.icon}</div>
                            <AnimatedCounter
                              end={stat.value}
                              className="text-3xl lg:text-4xl font-bold text-white mb-2"
                              decimals={stat.decimals || 0}
                              easing={(t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))}
                            />
                            <p className="text-gray-400 font-medium">{stat.label}</p>
                          </div>
                        </div>
                      </AnimatedGradientBorder>
                    ))}
                  </RevealElement>

                  {/* Action Buttons */}
                  <RevealElement delay={0.8} className="mt-12 flex flex-wrap gap-6">
                    <AnimatedButton
                      onClick={() => scrollToSection("contact")}
                      variant="primary"
                      icon={<Mail className="w-5 h-5" />}
                      iconPosition="left"
                      size="lg"
                    >
                      Contact Me
                    </AnimatedButton>
                    <AnimatedButton
                      onClick={() => setIsResumeModalOpen(true)}
                      variant="outline"
                      icon={<Download className="w-5 h-5" />}
                      iconPosition="left"
                      size="lg"
                    >
                      Download Resume
                    </AnimatedButton>
                  </RevealElement>
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="py-24 lg:py-32 px-6 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 to-indigo-900/5 pointer-events-none" />
            <div className="max-w-7xl mx-auto">
              <RevealText
                text="My Skills"
                as="h2"
                className="text-4xl lg:text-5xl font-bold mb-20 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"
              />

              {/* Skills Progress Bars */}
              <RevealElement className="mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-semibold mb-8 text-indigo-300">Programming Languages</h3>
                    <div className="space-y-8">
                      {[
                        { skill: "Python", percentage: 90, color: "bg-indigo-500" },
                        { skill: "JavaScript", percentage: 85, color: "bg-purple-500" },
                        { skill: "Java", percentage: 80, color: "bg-pink-500" },
                        { skill: "HTML/CSS", percentage: 95, color: "bg-blue-500" },
                        { skill: "SQL", percentage: 75, color: "bg-green-500" },
                      ].map((skill, index) => (
                        <div key={skill.skill} className="mb-6">
                          <div className="flex justify-between mb-3">
                            <span className="text-base font-medium text-gray-300">{skill.skill}</span>
                            <span className="text-sm font-medium text-gray-400">{skill.percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                            <motion.div
                              className={`h-3 rounded-full ${skill.color}`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.percentage}%` }}
                              transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                              viewport={{ once: true }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold mb-8 text-indigo-300">Frameworks & Tools</h3>
                    <div className="space-y-8">
                      {[
                        { skill: "React.js", percentage: 85, color: "bg-cyan-500" },
                        { skill: "Node.js", percentage: 75, color: "bg-yellow-500" },
                        { skill: "Tailwind CSS", percentage: 90, color: "bg-teal-500" },
                        { skill: "Git/GitHub", percentage: 85, color: "bg-red-500" },
                        { skill: "NumPy/Pandas", percentage: 80, color: "bg-orange-500" },
                      ].map((skill, index) => (
                        <div key={skill.skill} className="mb-6">
                          <div className="flex justify-between mb-3">
                            <span className="text-base font-medium text-gray-300">{skill.skill}</span>
                            <span className="text-sm font-medium text-gray-400">{skill.percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                            <motion.div
                              className={`h-3 rounded-full ${skill.color}`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.percentage}%` }}
                              transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                              viewport={{ once: true }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </RevealElement>

              {/* Technology Icons Grid */}
              <RevealElement>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {[
                    { skill: "Python", icon: <Code className="w-6 h-6 text-indigo-300" /> },
                    { skill: "Java", icon: <Server className="w-6 h-6 text-indigo-300" /> },
                    { skill: "JavaScript", icon: <Globe className="w-6 h-6 text-indigo-300" /> },
                    { skill: "HTML/CSS", icon: <Globe className="w-6 h-6 text-indigo-300" /> },
                    { skill: "React.js", icon: <Code className="w-6 h-6 text-indigo-300" /> },
                    { skill: "Node.js", icon: <Server className="w-6 h-6 text-indigo-300" /> },
                    { skill: "SQL", icon: <Database className="w-6 h-6 text-indigo-300" /> },
                    { skill: "Git/GitHub", icon: <GitBranch className="w-6 h-6 text-indigo-300" /> },
                  ].map((tech, index) => (
                    <ClientOnly key={tech.skill}>
                      <ParallaxScroll speed={0.2} direction="up">
                        <ThreeDCard className="h-full">
                          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl p-8 text-center h-full hover:from-gray-700/80 hover:to-gray-800/80 transition-all duration-300">
                            <motion.div
                              className="text-4xl mb-6 mx-auto bg-gradient-to-br from-indigo-400 to-purple-400 p-4 rounded-full w-16 h-16 flex items-center justify-center"
                              whileHover={{ rotateY: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              {tech.icon}
                            </motion.div>
                            <motion.div
                              className="font-semibold text-lg text-white"
                              whileHover={{ color: "#d8b4fe" }}
                              transition={{ duration: 0.3 }}
                            >
                              {tech.skill}
                            </motion.div>
                          </div>
                        </ThreeDCard>
                      </ParallaxScroll>
                    </ClientOnly>
                  ))}
                </div>
              </RevealElement>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-24 lg:py-32 px-6 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/5 to-purple-900/5 pointer-events-none" />
            <div className="max-w-7xl mx-auto">
              <RevealText
                text="My Projects"
                as="h2"
                className="text-4xl lg:text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"
              />

              {/* Project Filter Tabs */}
              <RevealElement className="mb-16">
                <AnimatedTabs
                  tabs={[
                    { id: "all", label: "All Projects" },
                    { id: "data-science", label: "Data Science" },
                    { id: "web-dev", label: "Web Development" },
                    { id: "software", label: "Software" },
                  ]}
                  defaultTabId="all"
                  onChange={setProjectFilter}
                  variant="gradient"
                  className="mb-8 justify-center"
                />
              </RevealElement>

              {/* Projects Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                <AnimatePresence mode="wait">
                  {filteredProjects.map((project, index) => (
                    <RevealElement key={project.title} delay={index * 0.1} direction="up">
                      <ThreeDCard className="h-full">
                        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl h-full flex flex-col hover:from-gray-700/80 hover:to-gray-800/80 transition-all duration-300">
                          {/* Project Image */}
                          <div className="relative h-56 overflow-hidden group">
                            <motion.div
                              className="absolute inset-0 bg-indigo-600 mix-blend-color opacity-0 z-10"
                              whileHover={{ opacity: 0.3 }}
                              transition={{ duration: 0.3 }}
                            />
                            <motion.img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover"
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.5 }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70" />
                            <h3 className="absolute bottom-4 left-4 text-xl lg:text-2xl font-bold text-white z-20">
                              {project.title}
                            </h3>
                          </div>

                          {/* Project Content */}
                          <div className="p-6 flex-grow flex flex-col">
                            <p className="text-gray-300 dark:text-gray-400 mb-6 leading-relaxed">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                              {project.tags.map((tag, i) => (
                                <AnimatedTooltip key={i} content={`Filter by ${tag}`}>
                                  <span className="px-3 py-1 bg-indigo-900/30 text-indigo-300 text-xs rounded-full font-medium">
                                    {tag}
                                  </span>
                                </AnimatedTooltip>
                              ))}
                            </div>
                            <motion.a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-400 hover:text-indigo-300 inline-flex items-center font-semibold mt-auto transition-colors duration-200"
                              whileHover={{ x: 5 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              View Project <ExternalLink className="ml-1 w-4 h-4" />
                            </motion.a>
                          </div>
                        </div>
                      </ThreeDCard>
                    </RevealElement>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-24 lg:py-32 px-6 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 to-indigo-900/5 pointer-events-none" />
            <div className="max-w-7xl mx-auto">
              <RevealText
                text="Get In Touch"
                as="h2"
                className="text-4xl lg:text-5xl font-bold mb-20 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"
              />

              <div className="grid lg:grid-cols-2 gap-16">
                {/* Contact Information */}
                <RevealElement direction="left">
                  <AnimatedGradientBorder borderRadius="0.75rem" glowAmount={10}>
                    <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl p-8 shadow-xl h-full">
                      <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                        Contact Information
                      </h3>
                      <p className="text-gray-300 mb-8 leading-relaxed">
                        Feel free to reach out to me through any of these channels. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                      </p>

                      {/* Contact Links */}
                      <div className="space-y-6">
                        {[
                          { icon: <Mail className="text-indigo-400 w-5 h-5" />, href: "mailto:contact@shivenpatro.com", text: "contact@shivenpatro.com" },
                          { icon: <Github className="text-indigo-400 w-5 h-5" />, href: "https://github.com/shivenpatro", text: "github.com/shivenpatro" },
                          { icon: <Linkedin className="text-indigo-400 w-5 h-5" />, href: "https://www.linkedin.com/in/shiven-patro-960593260/", text: "linkedin.com/in/shiven-patro" },
                        ].map((contact, index) => (
                          <motion.div key={index} className="flex items-center group" whileHover={{ x: 5 }}>
                            <div className="p-3 bg-indigo-500/20 rounded-full mr-4">{contact.icon}</div>
                            <a
                              href={contact.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-300 group-hover:text-indigo-400 transition-colors duration-200"
                            >
                              {contact.text}
                            </a>
                          </motion.div>
                        ))}
                      </div>

                      {/* Social Links */}
                      <div className="flex space-x-6 mt-12">
                        {[
                          { href: "https://github.com/shivenpatro", icon: <Github className="w-5 h-5" />, label: "GitHub" },
                          { href: "https://www.linkedin.com/in/shiven-patro-960593260/", icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn" },
                          { href: "mailto:contact@shivenpatro.com", icon: <Mail className="w-5 h-5" />, label: "Email" },
                        ].map((social, index) => (
                          <motion.a
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center p-4 bg-gray-800/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-indigo-400 transition-colors duration-300"
                            whileHover={{ scale: 1.1, rotate: 5, boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)" }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={social.label}
                          >
                            {social.icon}
                          </motion.a>
                        ))}
                      </div>

                      {/* Call to Action */}
                      <motion.div
                        className="mt-16 p-8 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-lg border border-indigo-500/20"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <h4 className="text-xl font-semibold mb-4 text-indigo-300">Let's Work Together</h4>
                        <p className="text-gray-400 leading-relaxed">
                          Looking for a passionate developer to bring your ideas to life? I'm currently available for freelance work and exciting opportunities.
                        </p>
                      </motion.div>
                    </div>
                  </AnimatedGradientBorder>
                </RevealElement>

                {/* Contact Form */}
                <RevealElement direction="right">
                  <AnimatedGradientBorder borderRadius="0.75rem" glowAmount={10}>
                    <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl p-8 shadow-xl h-full">
                      <h3 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                        Send Me a Message
                      </h3>

                      {/* Form Fields */}
                      <div className="space-y-8">
                        <div className="relative">
                          <motion.label
                            htmlFor="name"
                            className="absolute left-4 text-lg text-indigo-300 transition-all duration-300 pointer-events-none"
                            initial={{ y: 0 }}
                            animate={{ y: -25, scale: 0.8 }}
                          >
                            Name
                          </motion.label>
                          <motion.div
                            className="w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 absolute bottom-0 left-0 rounded-full"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          />
                          <input
                            type="text"
                            id="name"
                            className="w-full px-4 py-4 bg-gray-800/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-lg focus:outline-none text-white border border-gray-700 focus:border-indigo-500 transition-colors duration-200"
                          />
                        </div>

                        <div className="relative">
                          <motion.label
                            htmlFor="email"
                            className="absolute left-4 text-lg text-indigo-300 transition-all duration-300 pointer-events-none"
                            initial={{ y: 0 }}
                            animate={{ y: -25, scale: 0.8 }}
                          >
                            Email
                          </motion.label>
                          <motion.div
                            className="w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 absolute bottom-0 left-0 rounded-full"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                          />
                          <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-4 bg-gray-800/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-lg focus:outline-none text-white border border-gray-700 focus:border-indigo-500 transition-colors duration-200"
                          />
                        </div>

                        <div className="relative">
                          <label htmlFor="message" className="block mb-3 text-lg text-indigo-300 font-medium">
                            Message
                          </label>
                          <textarea
                            id="message"
                            rows={6}
                            className="w-full px-4 py-4 bg-gray-800/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white border border-gray-700 focus:border-indigo-500 transition-colors duration-200 resize-none"
                          />
                        </div>

                        <AnimatedButton
                          onClick={() => {}}
                          variant="gradient"
                          fullWidth={true}
                          size="lg"
                          icon={<Mail className="w-5 h-5" />}
                          iconPosition="left"
                        >
                          Send Message
                        </AnimatedButton>
                      </div>
                    </div>
                  </AnimatedGradientBorder>
                </RevealElement>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 py-12 lg:py-16 text-center relative z-10 border-t border-indigo-500/20">
          <div className="container mx-auto px-6">
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 animate-gradient">
                Shiven Patro
              </h2>
              <p className="text-gray-400 text-lg">Data Science Engineer & Web Developer</p>
            </motion.div>

            <p className="text-gray-400 mb-8 text-lg">© {new Date().getFullYear()} Shiven Patro. All rights reserved.</p>

            <div className="flex justify-center space-x-8">
              {[
                { href: "https://github.com/shivenpatro", icon: "GitHub", path: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" },
                { href: "https://www.linkedin.com/in/shiven-patro-960593260/", icon: "LinkedIn", path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" },
                { href: "mailto:contact@shivenpatro.com", icon: "Email", path: "M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="sr-only">{social.icon}</span>
                  <svg className="h-8 w-8 lg:h-10 lg:w-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d={social.path} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </HydrationBoundary>
  )
}