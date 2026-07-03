import { useEffect, useState } from "react";
import { QuizQuestion } from "../data/quiz";
import ProgressBar from "./ProgressBar";
import { track } from "../lib/analytics";

interface QuizStepProps {
  question: QuizQuestion;
  stepIndex: number;
  totalSteps: number;
  onSelect: (optionId: string) => void;
  onBack?: () => void;
}

export default function QuizStep({
  question,
  stepIndex,
  totalSteps,
  onSelect,
  onBack,
}: QuizStepProps) {
  const [selected, setSelected] = useState<string | null>(null);

  // VIEW DO STEP (CORRETO)
  useEffect(() => {
    track("quiz_step_view", { step: stepIndex + 1 });
  }, [stepIndex]);

  const handleSelect = (id: string) => {
    setSelected(id);

    // ANSWER TRACKING LIMPO
    track("quiz_answer", {
      step: stepIndex + 1,
      value: id,
    });

    setTimeout(() => {
      onSelect(id);
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F2FE] via-[#F8FAFC] to-[#EDE9FE]">
      <div className="max-w-xl mx-auto px-6 py-10 animate-in">
        <ProgressBar
          current={stepIndex + 1}
          total={totalSteps}
          onBack={onBack}
        />

        <h1 className="font-display text-3xl font-semibold text-slate-900 mb-2">
          {question.question}
        </h1>

        {question.subtext && (
          <p className="text-sm text-slate-500 mb-6">
            {question.subtext}
          </p>
        )}

        <div className="space-y-3">
          {question.options.map((opt) => {
            const isSelected = selected === opt.id;

            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className={`
                  w-full bg-white border rounded-2xl px-5 py-4
                  flex items-center justify-between transition
                  hover:shadow-lg hover:scale-[1.02] active:scale-95
                  ${
                    isSelected
                      ? "border-blue-500 shadow-md shadow-blue-100"
                      : "border-slate-100"
                  }
                `}
              >
                <span className="flex items-center gap-3">
                  {opt.icon && (
                    <span className="w-9 h-9 bg-slate-50 rounded-full flex items-center justify-center">
                      {opt.icon}
                    </span>
                  )}

                  <span className="font-medium text-slate-900 text-[15px]">
                    {opt.label}
                  </span>
                </span>

                <span
                  className={`
                    w-5 h-5 rounded-full border-2
                    ${
                      isSelected
                        ? "bg-blue-500 border-blue-500"
                        : "border-slate-300"
                    }
                  `}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}