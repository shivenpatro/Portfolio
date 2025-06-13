"use client"

import { useCallback, useEffect, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import type { Container, ISourceOptions } from "@tsparticles/engine"
import { useTheme } from "next-themes"

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false)
  const [init, setInit] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Initialize tsParticles engine
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const particlesLoaded = useCallback(async (container?: Container) => {
    // Particles loaded callback
  }, [])

  const isDark = mounted ? theme === "dark" : true

  if (!init) return null

  const options: ISourceOptions = {
    fullScreen: false,
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: ["grab", "repulse"],
          parallax: {
            enable: true,
            force: 60,
            smooth: 10,
          },
        },
        onClick: {
          enable: true,
          mode: "push",
        },
        resize: {
          enable: true,
        },
      },
      modes: {
        grab: {
          distance: 200,
          links: {
            opacity: 0.8,
            color: isDark ? "#34d399" : "#10b981",
          },
        },
        repulse: {
          distance: 100,
          duration: 0.4,
        },
        push: {
          quantity: 2,
        },
      },
    },
    particles: {
      color: {
        value: isDark ? ["#34d399", "#10b981", "#059669"] : ["#10b981", "#059669", "#047857"],
      },
      links: {
        color: isDark ? "#34d399" : "#10b981",
        distance: 180,
        enable: true,
        opacity: 0.15,
        width: 1,
        triangles: {
          enable: true,
          opacity: 0.05,
        },
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "out",
        },
        random: true,
        speed: 0.8,
        straight: false,
        attract: {
          enable: true,
          rotate: {
            x: 600,
            y: 1200,
          },
        },
      },
      number: {
        density: {
          enable: true,
          width: 1920,
          height: 1080,
        },
        value: 100,
      },
      opacity: {
        value: { min: 0.1, max: 0.5 },
        animation: {
          enable: true,
          speed: 0.5,
          sync: false,
          startValue: "random",
        },
      },
      shape: {
        type: ["circle", "triangle"],
      },
      size: {
        value: { min: 1, max: 4 },
        animation: {
          enable: true,
          speed: 2,
          sync: false,
          startValue: "random",
        },
      },
    },
    detectRetina: true,
    smooth: true,
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      />
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background/60 pointer-events-none" />
      
      {/* Subtle blur effect for depth */}
      <div className="absolute inset-0 backdrop-blur-[1px] pointer-events-none" />
    </div>
  )
}

