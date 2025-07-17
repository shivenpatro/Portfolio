"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

interface Props { children: React.ReactNode }

export function SmoothScrollWrapper({ children }: Props) {
  const pathname = usePathname();

  // Reset scroll on route change (optional)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return <>{children}</>;
} 