import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuizStore, type QuizAnswers } from "@/store/quiz";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Quiz do Sono do Bebê" },
      {
        name: "description",
        content:
          "Responda 4 perguntas rápidas e descubra um plano personalizado para o sono do seu bebê.",
      },
    ],
  }),
  component: QuizPage,
});

type Option = { label: string; value: string };
type Step = {
  key: keyof QuizAnswers;
  question: string;
  options: Option[];
};

const steps: Step[] = [
  {
    key: "babyAge",
    question: "Qual a idade do seu bebê?",
    options: [
      { label: "0 - 3 meses", value: "0-3m" },
      { label: "4 - 6 meses", value: "4-6m" },
      { label: "7 - 12 meses", value: "7-12m" },
      { label: "1 - 2 anos", value: "1-2a" },
      { label: "2+ anos", value: "2a+" },
    ],
  },
  {
    key: "wakeUps",
    question: "Quantas vezes ele acorda por noite?",
    options: [
      { label: "1 vez", value: "1" },
      { label: "2 vezes", value: "2" },
      { label: "3 vezes", value: "3" },
      { label: "4 ou mais", value: "4+" },
    ],
  },
  {
    key: "sleepsAt",
    question: "Onde ele dorme hoje?",
    options: [
      { label: "No berço", value: "berço" },
      { label: "Na cama (comigo ou sozinho)", value: "cama" },
      { label: "No colo", value: "colo" },
    ],
  },
  {
    key: "challenge",
    question: "Qual seu maior desafio?",
    options: [
      { label: "Fazer o bebê adormecer", value: "adormecer" },
      { label: "Manter o bebê dormindo", value: "manter" },
    ],
  },
];

function QuizPage() {
  const navigate = useNavigate();
  const setAnswer = useQuizStore((s) => s.setAnswer);
  const [current, setCurrent] = useState(0);

  const step = steps[current];
  const progress = ((current + 1) / steps.length) * 100;

  const handleSelect = (value: string) => {
    setAnswer(step.key, value);
    if (current < steps.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      navigate({ to: "/resultado" });
    }
  };

  const handleBack = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex flex-col">
      {/* Progress */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b border-border">
        <div className="mx-auto max-w-xl px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={handleBack}
              disabled={current === 0}
              className="text-sm text-muted-foreground disabled:opacity-30 hover:text-foreground transition-colors"
              aria-label="Voltar"
            >
              ← Voltar
            </button>
            <span className="text-sm font-medium text-muted-foreground">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <main className="flex-1 flex items-start sm:items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.key}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <p className="text-sm font-medium text-primary mb-3">
                Pergunta {current + 1} de {steps.length}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-6 sm:mb-8">
                {step.question}
              </h1>

              <div className="flex flex-col gap-3">
                {step.options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className="w-full text-left rounded-xl border-2 border-border bg-card px-5 py-4 sm:py-5 text-base sm:text-lg font-medium text-card-foreground shadow-sm hover:border-primary hover:bg-accent hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
