"use client";

import { useEffect } from "react";

/**
 * Locks page scroll when `active` is true and restores original overflow when unmounted.
 */
export function useDisableScroll(active: boolean) {
  useEffect(() => {
    if (!active || typeof document === "undefined") return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [active]);
} 