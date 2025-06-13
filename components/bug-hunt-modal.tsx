"use client";

import { useState } from "react";
import { useBugHuntStore } from "@/hooks/use-bug-hunt-store";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

export default function BugHuntModal() {
  const { modalOpen, closeModal, activeTrivia, submitAnswer, caught } = useBugHuntStore();
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!activeTrivia) return;
    const correct = submitAnswer(input);
    if (correct) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setFeedback("Correct! Enjoy your reward below ⬇️");
    } else {
      setFeedback("Oops, try again!");
    }
    setInput("");
  };

  return (
    <Dialog open={modalOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">🐞 Bug Hunt #{caught}</DialogTitle>
          <DialogDescription>
            {activeTrivia ? activeTrivia.question : "You found all the bugs! 🎉"}
          </DialogDescription>
        </DialogHeader>
        {activeTrivia && (
          <div className="space-y-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-background/50 focus:outline-none"
              placeholder="your answer here"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            {activeTrivia.hint && (
              <p className="text-xs text-muted-foreground">Hint: {activeTrivia.hint}</p>
            )}
            {feedback && <p className="text-sm font-medium text-primary">{feedback}</p>}
          </div>
        )}
        {!activeTrivia && (
          <p className="text-sm">Come back later for more riddles!</p>
        )}
        <DialogFooter>
          {activeTrivia ? (
            <Button onClick={handleSubmit} variant="primary">
              Submit
            </Button>
          ) : (
            <Button onClick={closeModal} variant="outline">
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 