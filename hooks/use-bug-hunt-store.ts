"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { triviaData, Trivia } from "@/lib/trivia";

interface BugHuntState {
  caught: number;
  answeredIds: number[];
  activeTrivia: Trivia | null;
  modalOpen: boolean;
  catchBug: () => void;
  closeModal: () => void;
  submitAnswer: (answer: string) => boolean; // returns whether correct
}

export const useBugHuntStore = create<BugHuntState>()(
  persist(
    (set, get) => ({
      caught: 0,
      answeredIds: [],
      activeTrivia: null,
      modalOpen: false,
      catchBug: () => {
        // pick a trivia not yet answered
        const { answeredIds } = get();
        const remaining = triviaData.filter((t) => !answeredIds.includes(t.id));
        const trivia = remaining.length
          ? remaining[Math.floor(Math.random() * remaining.length)]
          : null;
        set({ activeTrivia: trivia, modalOpen: true, caught: get().caught + 1 });
      },
      closeModal: () => set({ modalOpen: false }),
      submitAnswer: (answer: string) => {
        const { activeTrivia, answeredIds } = get();
        if (!activeTrivia) return false;
        const correct = activeTrivia.answer.toLowerCase().trim() === answer.toLowerCase().trim();
        if (correct) {
          set({ answeredIds: [...answeredIds, activeTrivia.id], modalOpen: false, activeTrivia: null });
        }
        return correct;
      },
    }),
    {
      name: "bug-hunt-store",
      partialize: (state) => ({ caught: state.caught, answeredIds: state.answeredIds }),
    }
  )
); 