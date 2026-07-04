import { useState, useEffect } from "react";
import { quizQuestions } from "./data/quiz";
import QuizStep from "./components/QuizStep";
import DiagnosisLoading from "./components/DiagnosisLoading";
import Result from "./components/Result";
import Offer from "./components/Offer";
import Admin from "./components/admin";

export interface QuizAnswers {
  idade?: string;
  acordar?: string;
  "onde-dorme"?: string;
  desafio?: string;
}

type Stage = "quiz" | "loading" | "result" | "offer";

export default function App() {
  const [stage, setStage] = useState<Stage>("quiz");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});

  const currentQuestion = quizQuestions[stepIndex];

  useEffect(() => {
    if (stage === "offer" && window.fbq) {
      window.fbq("track", "Lead");
    }
  }, [stage]);

  // Rota simples de admin — fica ANTES do return, junto com a lógica do componente
  if (window.location.pathname === "/admin") {
    return <Admin />;
  }

  function handleSelect(optionId: string) {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));

    if (stepIndex < quizQuestions.length - 1) {
      setStepIndex((i) => i + 1);
    } else {
      setStage("loading");
    }
  }

  function handleBack() {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  }

  return (
    <div className="min-h-screen bg-lav-50">
      {stage === "quiz" && (
        <QuizStep
          question={currentQuestion}
          stepIndex={stepIndex}
          totalSteps={quizQuestions.length}
          onSelect={handleSelect}
          onBack={stepIndex > 0 ? handleBack : undefined}
        />
      )}

      {stage === "loading" && (
        <DiagnosisLoading onDone={() => setStage("result")} />
      )}

      {stage === "result" && (
        <Result answers={answers} onContinue={() => setStage("offer")} />
      )}

      {stage === "offer" && <Offer />}
    </div>
  );
}