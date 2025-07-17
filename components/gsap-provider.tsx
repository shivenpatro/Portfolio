"use client";

import { ReactNode, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
// lenis has no types yet
// @ts-ignore
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: ReactNode;
}

export default function GsapProvider({ children }: Props) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
    } as any);

    const raf = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      // @ts-ignore
      lenis.destroy && lenis.destroy();
    };
  }, []);

  return <>{children}</>;
} 