"use client"

import { useIsMobile } from "./use-mobile"

interface AnimationConfig {
  hover?: any
  mobile?: any
  viewport?: {
    once?: boolean
    amount?: number
  }
  transition?: any
}

export const useMobileAnimations = () => {
  const isMobile = useIsMobile()

  const getAnimationProps = (config: AnimationConfig) => {
    const { hover, mobile, viewport = { once: true, amount: 0.8 }, transition } = config

    return {
      whileHover: hover,
      whileInView: isMobile ? mobile || hover : {},
      viewport: isMobile ? viewport : undefined,
      transition: transition || { duration: 0.3 },
    }
  }

  const getStaggeredAnimationProps = (config: AnimationConfig, delay: number = 0) => {
    const baseProps = getAnimationProps(config)
    return {
      ...baseProps,
      transition: {
        ...baseProps.transition,
        delay: isMobile ? delay : 0,
      },
    }
  }

  return {
    isMobile,
    getAnimationProps,
    getStaggeredAnimationProps,
  }
} 