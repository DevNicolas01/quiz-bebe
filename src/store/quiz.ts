import { create } from "zustand";

export type QuizAnswers = {
  babyAge?: string;
  wakeUps?: string;
  sleepsAt?: string;
  challenge?: string;
};

type QuizState = {
  answers: QuizAnswers;
  setAnswer: (key: keyof QuizAnswers, value: string) => void;
  reset: () => void;
};

export const useQuizStore = create<QuizState>((set) => ({
  answers: {},
  setAnswer: (key, value) =>
    set((s) => ({ answers: { ...s.answers, [key]: value } })),
  reset: () => set({ answers: {} }),
}));
