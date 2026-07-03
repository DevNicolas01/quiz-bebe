import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useQuizStore } from "@/store/quiz";

export const Route = createFileRoute("/resultado")({
  head: () => ({
    meta: [
      { title: "Seu resultado — Quiz do Sono" },
      {
        name: "description",
        content: "Veja o plano personalizado com base nas suas respostas.",
      },
    ],
  }),
  component: ResultadoPage,
});

function ResultadoPage() {
  const navigate = useNavigate();
  const answers = useQuizStore((s) => s.answers);
  const reset = useQuizStore((s) => s.reset);

  const hasAnswers = Object.keys(answers).length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted px-4 py-10">
      <div className="mx-auto max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-lg"
        >
          <div className="text-4xl mb-3">🎉</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-card-foreground mb-2">
            Prontinho! Seu plano está pronto.
          </h1>
          <p className="text-muted-foreground mb-6">
            Com base nas suas respostas, preparamos recomendações personalizadas
            para o sono do seu bebê.
          </p>

          {hasAnswers ? (
            <div className="space-y-3 rounded-xl bg-muted p-4 mb-6">
              <Row label="Idade" value={answers.babyAge} />
              <Row label="Acorda por noite" value={answers.wakeUps} />
              <Row label="Onde dorme" value={answers.sleepsAt} />
              <Row label="Maior desafio" value={answers.challenge} />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground mb-6">
              Nenhuma resposta encontrada. Refaça o quiz.
            </p>
          )}

          <button
            onClick={() => {
              reset();
              navigate({ to: "/quiz" });
            }}
            className="w-full rounded-xl bg-primary px-5 py-4 text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
          >
            Refazer o quiz
          </button>
        </motion.div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold text-foreground capitalize">
        {value ?? "—"}
      </span>
    </div>
  );
}
