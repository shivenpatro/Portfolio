export interface Trivia {
  id: number;
  question: string;
  answer: string;
  hint?: string;
}

export const triviaData: Trivia[] = [
  {
    id: 1,
    question: "What JavaScript library powers the hover scramble effect on this site?",
    answer: "gsap",
    hint: "GreenSock Animation Platform",
  },
  {
    id: 2,
    question: "Which 3-D library do we use for the rotating cube hero?",
    answer: "three.js",
  },
  {
    id: 3,
    question: "Name the CSS framework used for styling across the portfolio.",
    answer: "tailwind",
  },
  {
    id: 4,
    question: "What font is used globally as of the latest redesign?",
    answer: "space grotesk",
    hint: "Starts with 'Space'…",
  },
  {
    id: 5,
    question: "Which university is Shiven currently studying at?",
    answer: "vit-ap",
    hint: "Three letters, a dash, then two letters.",
  },
]; 