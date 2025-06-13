"use client";

import React, { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Bug from "@/components/bug";
import { useBugHuntStore } from "@/hooks/use-bug-hunt-store";

const BugHuntModal = dynamic(() => import("@/components/bug-hunt-modal"), { ssr: false });

interface BugEntry {
  id: number;
}

let bugIdCounter = 0;

export default function BugSpawner() {
  const [bugs, setBugs] = useState<BugEntry[]>([]);
  const modalOpen = useBugHuntStore((s) => s.modalOpen);

  const removeBug = useCallback((id: number) => {
    setBugs((prev) => prev.filter((b) => b.id !== id));
  }, []);

  useEffect(() => {
    const spawnBug = () => {
      // don't spawn if modal is open to avoid distraction
      if (!modalOpen) {
        setBugs((prev) => [...prev, { id: bugIdCounter++ }]);
      }
      const next = 10000 + Math.random() * 15000; // 10‒25s
      timeoutRef = window.setTimeout(spawnBug, next);
    };

    let timeoutRef = window.setTimeout(spawnBug, 8000); // initial spawn after 8s

    return () => window.clearTimeout(timeoutRef);
  }, [modalOpen]);

  return (
    <>
      {bugs.map((b) => (
        <Bug key={b.id} id={b.id} onComplete={() => removeBug(b.id)} />
      ))}
      <BugHuntModal />
    </>
  );
} 