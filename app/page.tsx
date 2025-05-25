"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { debounce } from "lodash"
import dynamic from "next/dynamic"
import {
  Sun,
  Moon,
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Award,
  Code,
  Database,
  Server,
  Cpu,
  Globe,
  Layers,
  Download,
  ArrowRight,
  Phone,
} from "lucide-react"

// Import static components
import { RevealText } from "@/components/reveal-text"
import { RevealElement } from "@/components/reveal-element"
import { AnimatedButton } from "@/components/animated-button"
import { AnimatedTabs } from "@/components/animated-tabs"
import { AnimatedTooltip } from "@/components/animated-tooltip"
import { AnimatedCounter } from "@/components/animated-counter"
import { TextCarousel } from "@/components/text-carousel"
import { ClientOnly } from "@/components/client-only"
import { HydrationBoundary } from "@/components/hydration-boundary"
import { useIsMobile } from "@/hooks/use-mobile"

// Dynamic imports for components that might cause hydration issues
const ResumeModal = dynamic(() => import("@/components/resume-modal").then(mod => mod.ResumeModal), { ssr: false })
const AnimatedBackground = dynamic(() => import("@/components/animated-background").then(mod => mod.AnimatedBackground), { ssr: false })
const AnimatedCursor = dynamic(() => import("@/components/animated-cursor").then(mod => mod.AnimatedCursor), { ssr: false })
const ParallaxScroll = dynamic(() => import("@/components/parallax-scroll").then(mod => mod.ParallaxScroll), { ssr: false })
const ThreeDCard = dynamic(() => import("@/components/3d-card").then(mod => mod.ThreeDCard), { ssr: false })
const AnimatedGradientBorder = dynamic(() => import("@/components/animated-gradient-border").then(mod => mod.AnimatedGradientBorder), { ssr: false })
const ScrollProgress = dynamic(() => import("@/components/scroll-progress").then(mod => mod.ScrollProgress), { ssr: false })
const ScrollToTop = dynamic(() => import("@/components/scroll-to-top").then(mod => mod.ScrollToTop), { ssr: false })
const AnimatedName = dynamic(() => import("@/components/animated-name").then(mod => mod.AnimatedName), { ssr: false })

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0])
  const scrollingRef = useRef(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove("dark")
    }
  }, [])

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0)

    // Preload resume files
    const preloadResumes = async () => {
      // Don't try to preload resumes, just log a message
      console.log("Resume files will be checked when needed")
    }

    preloadResumes()
  }, [])

  const handleScroll = useCallback(
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
      if (currentSection) setActiveSection(currentSection)
    }, 100),
    [],
  )

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const scrollToSection = useCallback((sectionId: string) => {
    // Use native smooth scrolling on mobile for better performance
    if (isMobile) {
      const el = document.getElementById(sectionId)
      if (el) {
        scrollingRef.current = true
        el.scrollIntoView({ behavior: "smooth" })
        setTimeout(() => {
          scrollingRef.current = false
          setActiveSection(sectionId)
        }, 600)
      }
      return
    }

    const element = document.getElementById(sectionId)
    if (element && !scrollingRef.current) {
      // Prevent multiple scroll events
      scrollingRef.current = true

      // Use a more performant scroll method with easing
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const startPosition = window.scrollY;
      const distance = elementPosition - startPosition;
      const duration = 800;
      let start: number | null = null;

      // Easing function for smoother scroll
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      const animateScroll = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);

        window.scrollTo(0, startPosition + distance * eased);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          setIsMenuOpen(false);
          // Allow scrolling again after animation completes
          setTimeout(() => {
            scrollingRef.current = false;
            // Update active section after scroll completes
            setActiveSection(sectionId);
          }, 100);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  }, [isMobile])

  const projects = [
    {
      title: "HashChat",
      description:
        "A secure real-time chat application with end-to-end encryption using the SHA-256 algorithm. Features include user authentication, message persistence, typing indicators, read receipts, and a responsive UI built with React and Firebase.",
      image: "/hashchat-preview.svg",
      url: "https://github.com/shivenpatro/Hash-Chat",
      tags: ["JavaScript", "React", "Firebase", "Encryption", "WebSockets"],
      category: "web-dev",
    },
    {
      title: "Personal Budget Tracker",
      description:
        "A simple and sleek budget tracking application with proper animations and workflow, built using modern web technologies.",
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
      title: "IntelliApply",
      description:
        "AI-powered full-stack platform that parses your resume, scrapes multiple job boards and ranks the most relevant openings in a personalised dashboard.",
      image: "/images/intelliapply.png", // TODO: replace with real screenshot
      url: "https://github.com/shivenpatro/IntelliApply",
      tags: ["React", "FastAPI", "Tailwind", "Supabase", "AI", "Web Scraping"],
      category: "web-dev",
    },
    {
      title: "School Management API",
      description:
        "RESTful Node.js + Express API backed by MySQL that lets you add schools and list them sorted by distance using Haversine formula.",
      image: "/images/school-api.png", // TODO: replace with real screenshot
      url: "https://github.com/shivenpatro/school-management-api",
      tags: ["Node.js", "Express", "MySQL", "REST"],
      category: "software",
    },
    {
      title: "Wine Quality Prediction",
      description:
        "Developed a robust wine quality prediction model using machine learning techniques and data analysis.",
      image: "https://placehold.co/500x300/3730a3/ffffff?text=Wine+Prediction",
      url: "https://github.com/shivenpatro/wine-quality-prediction",
      tags: ["Python", "Machine Learning", "Data Science"],
      category: "data-science",
    },
  ]

  const filteredProjects = activeTab === "all" ? projects : projects.filter((project) => project.category === activeTab)

  return (
    <HydrationBoundary>
      <div
        className={`${isDarkMode ? "dark" : ""} bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen font-sans ${isTouchDevice ? "" : "cursor-none"}`}
      >
      <ClientOnly>
        {!isTouchDevice && <AnimatedCursor />}
      </ClientOnly>
      <ClientOnly>
        <AnimatedBackground variant="particles" intensity={isMobile ? 0.6 : 1.2} />
      </ClientOnly>
      <ClientOnly>
        <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
      </ClientOnly>
      <ClientOnly>
        <ScrollProgress color="#8b5cf6" height={3} />
      </ClientOnly>
      <ClientOnly>
        <ScrollToTop backgroundColor="rgba(139, 92, 246, 0.8)" />
      </ClientOnly>

      <header className="fixed top-0 left-0 right-0 z-50 bg-white/5 dark:bg-gray-900/5 backdrop-blur-md border-b border-white/10">
        <nav className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 flex justify-between items-center">
          <div className="flex items-center">
            <motion.button
              className="sm:hidden mr-4 text-muted-foreground hover:text-indigo-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMenuOpen(false)}
                />
              )}
            </AnimatePresence>
            <motion.ul
              className={`${
                isMenuOpen
                  ? "flex flex-col fixed top-[72px] left-0 right-0 bg-gray-900/95 backdrop-blur-md p-6 shadow-lg border-b border-indigo-500/20 z-50"
                  : "hidden"
              } sm:flex sm:flex-row sm:static sm:shadow-none sm:p-0 sm:bg-transparent sm:space-x-8 sm:border-none sm:z-auto`}
              initial={isMenuOpen ? { height: 0, opacity: 0 } : undefined}
              animate={isMenuOpen ? { height: "auto", opacity: 1 } : undefined}
              exit={isMenuOpen ? { height: 0, opacity: 0 } : undefined}
              transition={{ duration: 0.3 }}
            >
              {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
                <motion.li key={item} className="mb-4 sm:mb-0">
                  <motion.button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`relative text-base sm:text-lg font-medium ${
                      activeSection === item.toLowerCase() ? "text-indigo-400" : "text-muted-foreground hover:text-indigo-400"
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
          <motion.button
            onClick={() => {
              const newDarkMode = !isDarkMode
              setIsDarkMode(newDarkMode)
              if (newDarkMode) {
                document.documentElement.classList.add("dark")
                localStorage.setItem("theme", "dark")
              } else {
                document.documentElement.classList.remove("dark")
                localStorage.setItem("theme", "light")
              }
            }}
            className="p-2 rounded-full bg-gray-800/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-700/50"
            whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)" }}
            whileTap={{ scale: 0.9 }}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun className="w-5 h-5 sm:w-6 sm:h-6" /> : <Moon className="w-5 h-5 sm:w-6 sm:h-6" />}
          </motion.button>
        </nav>
      </header>

      <main className="relative z-10">
        <section id="home" className="h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="w-full max-w-4xl px-4">
              <AnimatedName
                name="Shiven Patro"
                className="mb-8 text-center"
                fontSize="clamp(3rem, 10vw, 6rem)"
              />
            </div>
          </div>

          <div className="relative z-20 text-center w-full max-w-xl mx-auto px-4 mt-32">
            <RevealElement>
              <div className="h-12 overflow-hidden text-center">
                <TextCarousel
                  phrases={["Data Science Engineer", "Web Developer", "AI Enthusiast", "ML Engineer", "Software Developer", "Python Developer"]}
                  className="text-xl sm:text-2xl md:text-3xl font-light text-indigo-300"
                />
              </div>
            </RevealElement>
            <RevealElement delay={0.4} direction="up">
              <div className="mt-12 flex flex-wrap justify-center gap-4">
                <AnimatedButton
                  onClick={() => scrollToSection("projects")}
                  variant="gradient"
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                >
                  Explore My Work
                </AnimatedButton>
                <AnimatedButton
                  onClick={() => setIsResumeModalOpen(true)}
                  variant="outline"
                  icon={<Download className="w-5 h-5" />}
                  iconPosition="right"
                >
                  Download Resume
                </AnimatedButton>
              </div>
            </RevealElement>
          </div>

          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer z-20"
            onClick={() => scrollToSection("about")}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            whileHover={{ scale: 1.1 }}
          >
            <p className="text-foreground text-sm mb-2">Scroll Down</p>
            <ChevronDown className="text-foreground w-6 h-6" />
          </motion.div>
        </section>

        <section id="about" className="py-20 sm:py-32 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/5 to-purple-900/5 pointer-events-none"></div>
          <div className="max-w-5xl mx-auto">
            <RevealText
              text="About Me"
              as="h2"
              className="text-3xl sm:text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"
            />

            <div className="flex flex-col md:flex-row items-center">
              <RevealElement direction="left" className="mb-12 md:mb-0 md:mr-16">
                <ClientOnly>
                  <ThreeDCard className="w-48 h-48 sm:w-64 sm:h-64 overflow-hidden">
                    <img
                      src="./images/profile-photo.jpg"
                      alt="Shiven Patro"
                      className="rounded-full w-full h-full object-cover object-top"
                    />
                  </ThreeDCard>
                </ClientOnly>
              </RevealElement>

              <div>
                <RevealText
                  text="Hello! I'm Shiven Patro, an aspiring Data Science Engineer with a strong academic foundation and experience in Web Development. Currently pursuing BTech CSE at VIT-AP with a CGPA of 8.5/10."
                  className="text-lg sm:text-xl mb-6 text-muted-foreground leading-relaxed"
                  delay={0.2}
                  preserveWhitespace={true}
                />

                <RevealText
                  text="I'm passionately leveraging AI & LLM models to gain expertise in Data Science, Machine Learning, and other software domains, including Cloud Computing and Web Technologies, to build web applications with simple solutions."
                  className="text-lg sm:text-xl text-muted-foreground leading-relaxed"
                  delay={0.4}
                  preserveWhitespace={true}
                />

                <RevealElement delay={0.6} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                  <AnimatedGradientBorder borderRadius="0.75rem" glowAmount={5}>
                    <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 text-center">
                      <div className="flex flex-col items-center">
                        <div className="p-3 bg-indigo-500/20 rounded-full mb-4">
                          <Code className="w-6 h-6 text-indigo-300" />
                        </div>
                        <AnimatedCounter
                          end={10}
                          className="text-3xl sm:text-4xl font-bold text-foreground mb-2"
                          easing={(t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))}
                        />
                        <p className="text-muted-foreground">Projects</p>
                      </div>
                    </div>
                  </AnimatedGradientBorder>

                  <AnimatedGradientBorder borderRadius="0.75rem" glowAmount={5}>
                    <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 text-center">
                      <div className="flex flex-col items-center">
                        <div className="p-3 bg-indigo-500/20 rounded-full mb-4">
                          <Award className="w-6 h-6 text-indigo-300" />
                        </div>
                        <AnimatedCounter
                          end={8.5}
                          decimals={1}
                          className="text-3xl sm:text-4xl font-bold text-foreground mb-2"
                          easing={(t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))}
                        />
                        <p className="text-muted-foreground">CGPA</p>
                      </div>
                    </div>
                  </AnimatedGradientBorder>

                  <AnimatedGradientBorder borderRadius="0.75rem" glowAmount={5}>
                    <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 text-center">
                      <div className="flex flex-col items-center">
                        <div className="p-3 bg-indigo-500/20 rounded-full mb-4">
                          <Cpu className="w-6 h-6 text-indigo-300" />
                        </div>
                        <AnimatedCounter
                          end={5}
                          className="text-3xl sm:text-4xl font-bold text-foreground mb-2"
                          easing={(t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))}
                        />
                        <p className="text-muted-foreground">Technologies</p>
                      </div>
                    </div>
                  </AnimatedGradientBorder>

                  <AnimatedGradientBorder borderRadius="0.75rem" glowAmount={5}>
                    <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 text-center">
                      <div className="flex flex-col items-center">
                        <div className="p-3 bg-indigo-500/20 rounded-full mb-4">
                          <Globe className="w-6 h-6 text-indigo-300" />
                        </div>
                        <AnimatedCounter
                          end={2}
                          className="text-3xl sm:text-4xl font-bold text-foreground mb-2"
                          easing={(t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))}
                        />
                        <p className="text-muted-foreground">Hackathons</p>
                      </div>
                    </div>
                  </AnimatedGradientBorder>
                </RevealElement>

                <RevealElement delay={0.8} className="mt-8 flex flex-wrap gap-4">
                  <AnimatedButton
                    onClick={() => scrollToSection("contact")}
                    variant="primary"
                    icon={<Mail className="w-5 h-5" />}
                    iconPosition="left"
                  >
                    Contact Me
                  </AnimatedButton>
                  <AnimatedButton
                    onClick={() => setIsResumeModalOpen(true)}
                    variant="outline"
                    icon={<Download className="w-5 h-5" />}
                    iconPosition="left"
                  >
                    Download Resume
                  </AnimatedButton>
                </RevealElement>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="py-20 sm:py-32 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 to-indigo-900/5 pointer-events-none"></div>
          <div className="max-w-5xl mx-auto">
            <RevealText
              text="My Skills"
              as="h2"
              className="text-3xl sm:text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"
            />

            <RevealElement className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-6 text-indigo-300">Programming Languages</h3>
                  <div className="space-y-6">
                    {[
                      { skill: "Python", percentage: 90, color: "bg-indigo-500" },
                      { skill: "JavaScript", percentage: 85, color: "bg-purple-500" },
                      { skill: "Java", percentage: 80, color: "bg-pink-500" },
                      { skill: "HTML/CSS", percentage: 95, color: "bg-blue-500" },
                      { skill: "SQL", percentage: 75, color: "bg-green-500" },
                    ].map((item, index) => (
                      <div key={item.skill} className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-base font-medium text-foreground">{item.skill}</span>
                          <span className="text-sm font-medium text-muted-foreground">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
                          <motion.div
                            className={`h-2.5 rounded-full ${item.color}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.percentage}%` }}
                            transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-6 text-indigo-300">Frameworks & Tools</h3>
                  <div className="space-y-6">
                    {[
                      { skill: "React.js", percentage: 85, color: "bg-cyan-500" },
                      { skill: "Node.js", percentage: 75, color: "bg-yellow-500" },
                      { skill: "Tailwind CSS", percentage: 90, color: "bg-teal-500" },
                      { skill: "Git/GitHub", percentage: 85, color: "bg-red-500" },
                      { skill: "NumPy/Pandas", percentage: 80, color: "bg-orange-500" },
                    ].map((item, index) => (
                      <div key={item.skill} className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-base font-medium text-foreground">{item.skill}</span>
                          <span className="text-sm font-medium text-muted-foreground">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
                          <motion.div
                            className={`h-2.5 rounded-full ${item.color}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.percentage}%` }}
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

            <RevealElement>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
                {[
                  { skill: "Python", icon: <Code className="w-6 h-6 text-indigo-300" /> },
                  { skill: "Java", icon: <Cpu className="w-6 h-6 text-indigo-300" /> },
                  { skill: "JavaScript", icon: <Globe className="w-6 h-6 text-indigo-300" /> },
                  { skill: "HTML/CSS", icon: <Layers className="w-6 h-6 text-indigo-300" /> },
                  { skill: "React.js", icon: <Code className="w-6 h-6 text-indigo-300" /> },
                  { skill: "Node.js", icon: <Server className="w-6 h-6 text-indigo-300" /> },
                  { skill: "SQL", icon: <Database className="w-6 h-6 text-indigo-300" /> },
                  { skill: "Git/GitHub", icon: <Github className="w-6 h-6 text-indigo-300" /> },
                ].map((item, index) => (
                  <ClientOnly key={item.skill}>
                    <ParallaxScroll speed={0.2} direction="up">
                      <ThreeDCard className="h-full">
                        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl p-6 text-center h-full">
                          <motion.div
                            className="text-4xl mb-4 mx-auto bg-gradient-to-br from-indigo-400 to-purple-400 p-4 rounded-full w-16 h-16 flex items-center justify-center"
                            whileHover={{ rotateY: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            {item.icon}
                          </motion.div>
                          <motion.div
                            className="font-semibold text-lg text-foreground"
                            whileHover={{ color: "#d8b4fe" }}
                            transition={{ duration: 0.3 }}
                          >
                            {item.skill}
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

        <section id="projects" className="py-20 sm:py-32 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/5 to-purple-900/5 pointer-events-none"></div>
          <div className="max-w-6xl mx-auto">
            <RevealText
              text="My Projects"
              as="h2"
              className="text-3xl sm:text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"
            />

            <RevealElement className="mb-8">
              <AnimatedTabs
                tabs={[
                  { id: "all", label: "All Projects" },
                  { id: "data-science", label: "Data Science" },
                  { id: "web-dev", label: "Web Development" },
                  { id: "software", label: "Software" },
                ]}
                defaultTabId="all"
                onChange={setActiveTab}
                variant="gradient"
                className="mb-8 justify-center"
              />
            </RevealElement>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12">
              <AnimatePresence mode="wait">
                {filteredProjects.map((project, index) => (
                  <RevealElement key={project.title} delay={index * 0.1} direction="up">
                    <ThreeDCard className="h-full">
                      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl h-full flex flex-col">
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
                          <h3 className="absolute bottom-4 left-4 text-xl sm:text-2xl font-bold text-white z-20">
                            {project.title}
                          </h3>
                        </div>
                        <div className="p-6 flex-grow flex flex-col">
                          <p className="text-muted-foreground mb-4">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                            {project.tags.map((tag, i) => (
                              <AnimatedTooltip key={i} content={`Filter by ${tag}`}>
                                <span className="px-2 py-1 bg-indigo-900/30 text-indigo-300 text-xs rounded-full">
                                  {tag}
                                </span>
                              </AnimatedTooltip>
                            ))}
                          </div>
                          <motion.a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-400 hover:text-indigo-300 inline-flex items-center font-semibold mt-auto"
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

        <section id="contact" className="py-20 sm:py-32 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 to-indigo-900/5 pointer-events-none"></div>
          <div className="max-w-5xl mx-auto">
            <RevealText
              text="Get In Touch"
              as="h2"
              className="text-3xl sm:text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"
            />

            <div className="grid md:grid-cols-2 gap-12">
              <RevealElement direction="left">
                <AnimatedGradientBorder borderRadius="0.75rem" glowAmount={10}>
                  <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl p-6 shadow-xl h-full">
                    <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                      Contact Information
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Feel free to reach out to me through any of these channels. I'm always open to discussing new
                      projects, creative ideas, or opportunities to be part of your vision.
                    </p>

                    <div className="space-y-4">
                      <motion.div className="flex items-center group" whileHover={{ x: 5 }}>
                        <div className="p-2 bg-indigo-500/20 rounded-full mr-3">
                          <Mail className="text-indigo-400 w-5 h-5" />
                        </div>
                        <a
                          href="mailto:contact@shivenpatro.com"
                          className="text-muted-foreground group-hover:text-indigo-400 transition-colors"
                        >
                          contact@shivenpatro.com
                        </a>
                      </motion.div>
                      <motion.div className="flex items-center group" whileHover={{ x: 5 }}>
                        <div className="p-2 bg-indigo-500/20 rounded-full mr-3">
                          <Github className="text-indigo-400 w-5 h-5" />
                        </div>
                        <a
                          href="https://github.com/shivenpatro"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground group-hover:text-indigo-400 transition-colors"
                        >
                          github.com/shivenpatro
                        </a>
                      </motion.div>
                      <motion.div className="flex items-center group" whileHover={{ x: 5 }}>
                        <div className="p-2 bg-indigo-500/20 rounded-full mr-3">
                          <Linkedin className="text-indigo-400 w-5 h-5" />
                        </div>
                        <a
                          href="https://www.linkedin.com/in/shiven-patro-960593260/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground group-hover:text-indigo-400 transition-colors"
                        >
                          linkedin.com/in/shiven-patro
                        </a>
                      </motion.div>
                      <motion.div className="flex items-center group" whileHover={{ x: 5 }}>
                        <div className="p-2 bg-indigo-500/20 rounded-full mr-3">
                          <Phone className="text-indigo-400 w-5 h-5" />
                        </div>
                        <a
                          href="tel:+919861564032"
                          className="text-muted-foreground group-hover:text-indigo-400 transition-colors"
                        >
                          +91 9861564032
                        </a>
                      </motion.div>
                    </div>

                    <div className="flex space-x-4 mt-8">
                      <motion.a
                        href="https://github.com/shivenpatro"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center p-3 bg-gray-200/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-full text-muted-foreground hover:text-indigo-400 transition-colors duration-300"
                        whileHover={{ scale: 1.1, rotate: 5, boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)" }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="GitHub"
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                      <motion.a
                        href="https://www.linkedin.com/in/shiven-patro-960593260/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center p-3 bg-gray-200/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-full text-muted-foreground hover:text-indigo-400 transition-colors duration-300"
                        whileHover={{ scale: 1.1, rotate: 5, boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)" }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-5 h-5" />
                      </motion.a>
                      <motion.a
                        href="mailto:contact@shivenpatro.com"
                        className="flex items-center justify-center p-3 bg-gray-200/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-full text-muted-foreground hover:text-indigo-400 transition-colors duration-300"
                        whileHover={{ scale: 1.1, rotate: 5, boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)" }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Email"
                      >
                        <Mail className="w-5 h-5" />
                      </motion.a>
                    </div>

                    <motion.div
                      className="mt-12 p-6 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-lg border border-indigo-500/20"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <h4 className="text-xl font-semibold mb-3 text-indigo-300">Let's Work Together</h4>
                      <p className="text-muted-foreground">
                        Looking for a passionate developer to bring your ideas to life? I'm currently available for
                        freelance work and exciting opportunities.
                      </p>
                    </motion.div>
                  </div>
                </AnimatedGradientBorder>
              </RevealElement>

              <RevealElement direction="right">
                <AnimatedGradientBorder borderRadius="0.75rem" glowAmount={10}>
                  <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl p-6 shadow-xl h-full">
                    <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                      Send Me a Message
                    </h3>
                    <div className="mb-8 relative">
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
                        className="w-full px-4 py-3 bg-gray-200/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-lg focus:outline-none text-foreground border border-gray-300 dark:border-gray-700 focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div className="mb-8 relative">
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
                        className="w-full px-4 py-3 bg-gray-200/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-lg focus:outline-none text-foreground border border-gray-300 dark:border-gray-700 focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div className="mb-8 relative">
                      <label htmlFor="message" className="block mb-2 text-lg text-indigo-300">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={6}
                        className="w-full px-4 py-3 bg-gray-200/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-foreground border border-gray-300 dark:border-gray-700 focus:border-indigo-500 transition-colors"
                      ></textarea>
                    </div>
                    <AnimatedButton
                      onClick={() => {}}
                      variant="gradient"
                      fullWidth
                      size="lg"
                      icon={<Mail className="w-5 h-5" />}
                      iconPosition="left"
                    >
                      Send Message
                    </AnimatedButton>
                  </div>
                </AnimatedGradientBorder>
              </RevealElement>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-8 sm:py-12 text-center relative z-10 border-t border-indigo-500/20">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 animate-gradient">
              Shiven Patro
            </h2>
            <p className="text-muted-foreground">Data Science Engineer & Web Developer</p>
          </motion.div>

          <p className="text-muted-foreground mb-6">&copy; {new Date().getFullYear()} Shiven Patro. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            <motion.a
              href="https://github.com/shivenpatro"
              className="text-muted-foreground hover:text-indigo-400 transition-colors duration-300"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6 sm:h-8 sm:w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/shiven-patro-960593260/"
              className="text-muted-foreground hover:text-indigo-400 transition-colors duration-300"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="sr-only">LinkedIn</span>
              <svg className="h-6 w-6 sm:h-8 sm:w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                />
              </svg>
            </motion.a>
            <motion.a
              href="mailto:contact@shivenpatro.com"
              className="text-muted-foreground hover:text-indigo-400 transition-colors duration-300"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="sr-only">Email</span>
              <svg className="h-6 w-6 sm:h-8 sm:w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                />
                <path
                  fillRule="evenodd"
                  d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                />
              </svg>
            </motion.a>
          </div>
        </div>
      </footer>
    </div>
    </HydrationBoundary>
  )
}
