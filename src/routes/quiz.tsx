import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Baby, Bed, Heart, Moon, Sun, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useQuizStore, type QuizAnswers } from "@/store/quiz";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Quiz do Sono do Bebê" },
      {
        name: "description",
        content:
          "Responda 4 perguntas rápidas e descubra um plano personalizado para o sono do bebê.",
      },
    ],
  }),
  component: QuizPage,
});

type Option = { label: string; value: string; icon?: LucideIcon };
type Step = {
  key: keyof QuizAnswers;
  question: string;
  options: Option[];
};

const steps: Step[] = [
  {
    key: "babyAge",
    question: "Qual a idade do bebê?",
    options: [
      { label: "0 - 3 meses", value: "0-3m", icon: Baby },
      { label: "4 - 6 meses", value: "4-6m", icon: Baby },
      { label: "7 - 12 meses", value: "7-12m", icon: Baby },
      { label: "1 - 2 anos", value: "1-2a", icon: Baby },
      { label: "2+ anos", value: "2a+", icon: Baby },
    ],
  },
  {
    key: "wakeUps",
    question: "Quantas vezes o bebê acorda por noite?",
    options: [
      { label: "1 vez", value: "1" },
      { label: "2 vezes", value: "2" },
      { label: "3 vezes", value: "3" },
      { label: "4 ou mais", value: "4+" },
    ],
  },
  {
    key: "sleepsAt",
    question: "Onde o bebê dorme hoje?",
    options: [
      { label: "No berço", value: "berço", icon: Bed },
      { label: "Na cama", value: "cama", icon: Moon },
      { label: "No colo", value: "colo", icon: Heart },
    ],
  },
  {
    key: "challenge",
    question: "Qual o maior desafio hoje?",
    options: [
      { label: "Fazer o bebê adormecer", value: "adormecer", icon: Moon },
      { label: "Manter o bebê dormindo", value: "manter", icon: Sun },
    ],
  },
];

function QuizPage() {
  const navigate = useNavigate();
  const setAnswer = useQuizStore((s) => s.setAnswer);
  const answers = useQuizStore((s) => s.answers);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  const step = steps[current];
  const progress = ((current + 1) / steps.length) * 100;

  const handleSelect = (value: string) => {
    if (selected) return;
    setSelected(value);
    setAnswer(step.key, value);
    setTimeout(() => {
      if (current < steps.length - 1) {
        setCurrent((c) => c + 1);
        setSelected(null);
      } else {
        navigate({ to: "/resultado" });
      }
    }, 380);
  };

  const handleBack = () => {
    if (current > 0) {
      setCurrent((c) => c - 1);
      setSelected(null);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress */}
      <div className="sticky top-0 z-10 bg-background/85 backdrop-blur-md">
        <div className="mx-auto max-w-xl px-5 pt-6 pb-4">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={handleBack}
              disabled={current === 0}
              className="text-sm text-muted-foreground disabled:opacity-0 hover:text-foreground transition-colors"
              aria-label="Voltar"
            >
              ← Voltar
            </button>
            <span className="text-xs font-medium text-muted-foreground tabular-nums">
              {current + 1} / {steps.length}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <main className="flex-1 flex items-start sm:items-center justify-center px-5 py-6 sm:py-10">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-8 sm:mb-10 leading-tight">
                {step.question}
              </h1>

              <div className="flex flex-col gap-3">
                {step.options.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = selected === opt.value;
                  const wasPrevious = !selected && answers[step.key] === opt.value;
                  const active = isSelected || wasPrevious;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect(opt.value)}
                      disabled={!!selected}
                      className={[
                        "group w-full flex items-center gap-4 rounded-2xl border-2 px-5 py-4 sm:py-5 text-left transition-all duration-200",
                        "shadow-[0_2px_8px_-4px_rgba(80,60,120,0.08)]",
                        active
                          ? "border-primary bg-accent scale-[1.01]"
                          : "border-border bg-card hover:border-primary/50 hover:bg-accent/40 hover:-translate-y-0.5 active:translate-y-0",
                      ].join(" ")}
                    >
                      {Icon && (
                        <span
                          className={[
                            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors",
                            active
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-primary group-hover:bg-primary/10",
                          ].join(" ")}
                        >
                          <Icon className="h-5 w-5" strokeWidth={2} />
                        </span>
                      )}
                      <span className="flex-1 min-w-0 text-base sm:text-lg font-medium text-card-foreground">
                        {opt.label}
                      </span>
                      <span
                        className={[
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                          active
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border",
                        ].join(" ")}
                      >
                        {active && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
