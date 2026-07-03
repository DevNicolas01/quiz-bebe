import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";
import { useQuizStore } from "@/store/quiz";

export const Route = createFileRoute("/resultado")({
  head: () => ({
    meta: [
      { title: "Seu resultado — Quiz do Sono" },
      {
        name: "description",
        content: "Veja o diagnóstico personalizado com base nas suas respostas.",
      },
    ],
  }),
  component: ResultadoPage,
});

function ResultadoPage() {
  const navigate = useNavigate();
  const answers = useQuizStore((s) => s.answers);
  const hasAnswers = Object.keys(answers).length > 0;

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <PulseBg />
      <div className="relative z-10 mx-auto max-w-xl px-5 py-10 sm:py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-[0_10px_40px_-20px_rgba(80,60,120,0.25)]"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground mb-4">
            <Sparkles className="h-3.5 w-3.5" /> Diagnóstico pronto
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-card-foreground mb-3 leading-tight">
            Identificamos o padrão de sono do bebê
          </h1>
          <p className="text-muted-foreground mb-6">
            Com base nas suas respostas, montamos um plano personalizado para
            noites mais tranquilas — em até 7 dias.
          </p>

          {hasAnswers && (
            <div className="space-y-3 rounded-2xl bg-secondary/60 p-4 mb-6">
              <Row label="Idade" value={answers.babyAge} />
              <Row label="Acorda por noite" value={answers.wakeUps} />
              <Row label="Onde dorme" value={answers.sleepsAt} />
              <Row label="Maior desafio" value={answers.challenge} />
            </div>
          )}

          <ul className="space-y-2.5 mb-7">
            {[
              "Método adequado para a idade do bebê",
              "Rotina noturna personalizada",
              "Passo a passo para reduzir despertares",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-sm text-foreground">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" strokeWidth={2.2} />
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={() => navigate({ to: "/oferta" })}
            className="w-full rounded-2xl bg-primary px-5 py-4 text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 active:scale-[0.99] transition-all"
          >
            Ver meu plano personalizado →
          </button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Leva menos de 1 minuto para ver
          </p>
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

function PulseBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-primary/25 blur-3xl"
        animate={{ scale: [1, 1.25, 1], opacity: [0.45, 0.7, 0.45] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-accent blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-primary/20 blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2.4 }}
      />
    </div>
  );
}
