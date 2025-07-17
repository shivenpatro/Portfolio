"use client";

import { useEffect } from "react";
import React from "react";

interface SplineSceneProps {
  scene: string;
  className?: string;
  style?: React.CSSProperties;
}

// declare custom element for TSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export default function SplineScene({ scene, className, style }: SplineSceneProps) {
  useEffect(() => {
    // inject the viewer script only once
    if (!document.querySelector("script[data-spline-viewer]")) {
      const s = document.createElement("script");
      (s as HTMLScriptElement).setAttribute("data-spline-viewer", "true");
      s.type = "module";
      s.src = "https://unpkg.com/@splinetool/viewer@1.10.22/build/spline-viewer.js";
      document.head.appendChild(s);
    }
  }, []);

  // Return the custom element via React.createElement to avoid TSX intrinsic issues
  // @ts-ignore – spline-viewer is a valid custom element defined by the injected script
  return React.createElement('spline-viewer', {
    url: scene,
    class: className,
    style,
  });
} 