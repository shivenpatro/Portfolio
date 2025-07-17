"use client"

import { useState, useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import LoadingOverlay from "@/components/loading-overlay"

export default function RootProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // This is a fallback in case the loading overlay fails or is disabled.
    const timer = setTimeout(() => {
      if (!isLoaded) setIsLoaded(true);
    }, 5000); // Max wait time of 5 seconds
    return () => clearTimeout(timer);
  }, [isLoaded]);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <LoadingOverlay onFinish={() => setIsLoaded(true)} />
      {isLoaded && children}
    </ThemeProvider>
  )
} 