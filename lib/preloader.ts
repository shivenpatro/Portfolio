import dynamic from "next/dynamic";

/**
 * Preloads the heavy, dynamically imported components used on the main page.
 * This helps prevent a "flash" of missing content after the loading screen.
 */
export const preloadComponents = () => {
  return Promise.all([
    // @ts-ignore
    import("@/components/portfolio-sidekick"),
    // @ts-ignore
    import("@/components/animated-cursor").then(mod => mod.AnimatedCursor),
    // @ts-ignore
    import("@/components/parallax-scroll").then(mod => mod.ParallaxScroll),
    // @ts-ignore
    import("@/components/3d-card").then(mod => mod.ThreeDCard),
    // @ts-ignore
    import("@/components/animated-gradient-border").then(mod => mod.AnimatedGradientBorder),
    // @ts-ignore
    import("@/components/scroll-progress").then(mod => mod.ScrollProgress),
    // @ts-ignore
    import("@/components/scroll-to-top").then(mod => mod.ScrollToTop),
    // @ts-ignore
    import("@/components/animated-background"),
    // @ts-ignore
    import("@/components/projects-carousel").then(mod => mod.default),
    // @ts-ignore
    import("@/components/spline-scene"),
  ]);
}; 