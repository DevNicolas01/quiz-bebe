import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Check,
  Play,
  Shield,
  Star,
  Clock,
  Moon,
  Heart,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/oferta")({
  head: () => ({
    meta: [
      { title: "Método Sono Sereno — Noites tranquilas em 7 dias" },
      {
        name: "description",
        content:
          "Descubra o método passo a passo para o bebê dormir a noite toda, com carinho e sem choro prolongado.",
      },
    ],
  }),
  component: OfertaPage,
});

function OfertaPage() {
  const navigate = useNavigate();
  const goCheckout = () => navigate({ to: "/checkout" });

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <PulseBg />
      <div className="relative z-10 mx-auto max-w-xl px-5 py-8 sm:py-12 space-y-8">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground mb-4">
            <Sparkles className="h-3.5 w-3.5" /> Plano personalizado pronto
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight mb-3">
            Noites tranquilas para você e o bebê em até{" "}
            <span className="text-primary">7 dias</span>
          </h1>
          <p className="text-base text-muted-foreground">
            O método acolhedor que já ajudou mais de 12.000 mães a recuperarem o
            sono — sem choro prolongado e sem culpa.
          </p>
        </motion.section>

        {/* VSL */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-3xl border border-border bg-card p-3 shadow-[0_10px_40px_-20px_rgba(80,60,120,0.25)]"
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-accent to-primary/10 flex items-center justify-center">
            <button
              type="button"
              aria-label="Assistir vídeo"
              className="group flex flex-col items-center gap-3"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-105">
                <Play className="h-7 w-7 ml-1" fill="currentColor" />
              </span>
              <span className="text-sm font-medium text-foreground">
                Assista: como funciona o método
              </span>
            </button>
          </div>
        </motion.section>

        {/* Benefits */}
        <section className="rounded-3xl border border-border bg-card p-6 sm:p-7">
          <h2 className="text-xl sm:text-2xl font-bold text-card-foreground mb-4">
            O que você vai receber
          </h2>
          <ul className="space-y-3">
            {[
              { icon: Moon, text: "Rotina noturna passo a passo por faixa etária" },
              { icon: Heart, text: "Método gentil, sem deixar o bebê chorar sozinho" },
              { icon: Clock, text: "Cronograma de 7 dias com metas realistas" },
              { icon: Sparkles, text: "Guia de sonecas e ambiente ideal do sono" },
              { icon: Shield, text: "Suporte por 30 dias com especialistas" },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <span className="text-sm sm:text-base text-foreground pt-1.5">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Testimonials */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-2">
            Mães que voltaram a dormir
          </h2>
          {[
            {
              name: "Carolina, mãe da Alice (8m)",
              text: "Em 5 dias minha filha passou a dormir a noite toda. Ainda não acredito, foi transformador.",
            },
            {
              name: "Beatriz, mãe do Theo (1a)",
              text: "Tentei de tudo antes. O passo a passo é claro e acolhedor — sem deixar chorar sozinho.",
            },
            {
              name: "Marina, mãe da Laura (5m)",
              text: "Voltei a ter minhas noites. Recomendo pra toda mãe exausta que precisa de esperança.",
            },
          ].map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex gap-0.5 mb-2 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4" fill="currentColor" />
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-2">
                "{t.text}"
              </p>
              <p className="text-xs text-muted-foreground font-medium">{t.name}</p>
            </div>
          ))}
        </section>

        {/* Guarantee */}
        <section className="rounded-3xl border-2 border-primary/30 bg-accent/60 p-6 flex gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Shield className="h-6 w-6" />
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">
              Garantia incondicional de 7 dias
            </h3>
            <p className="text-sm text-muted-foreground">
              Teste o método sem risco. Se não funcionar, devolvemos 100% do seu
              investimento. Simples assim.
            </p>
          </div>
        </section>

        {/* Price + CTA */}
        <section className="rounded-3xl border border-border bg-card p-6 sm:p-7 text-center">
          <UrgencyBar />
          <p className="text-sm text-muted-foreground line-through mt-4">
            De R$ 297,00
          </p>
          <div className="flex items-baseline justify-center gap-1 mt-1">
            <span className="text-sm text-foreground">Por apenas</span>
          </div>
          <div className="flex items-baseline justify-center gap-1 mt-1">
            <span className="text-lg font-semibold text-foreground">R$</span>
            <span className="text-5xl sm:text-6xl font-bold text-primary tabular-nums">
              47
            </span>
            <span className="text-lg text-muted-foreground">,00</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 mb-5">
            ou 5x de R$ 9,90 no cartão
          </p>

          <motion.button
            onClick={goCheckout}
            whileTap={{ scale: 0.98 }}
            animate={{ boxShadow: [
              "0 8px 24px -8px rgba(140,110,200,0.4)",
              "0 8px 32px -4px rgba(140,110,200,0.7)",
              "0 8px 24px -8px rgba(140,110,200,0.4)",
            ] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-full rounded-2xl bg-primary px-5 py-5 text-base sm:text-lg font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Quero dormir melhor agora →
          </motion.button>

          <ul className="mt-5 space-y-2 text-left">
            {[
              "Acesso imediato após pagamento",
              "Compra 100% segura",
              "Garantia de 7 dias",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2 text-xs text-muted-foreground">
                <Check className="h-4 w-4 text-primary" strokeWidth={3} />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>

        <p className="text-center text-xs text-muted-foreground pb-4">
          © Método Sono Sereno · Feito com carinho para mães reais
        </p>
      </div>
    </div>
  );
}

function UrgencyBar() {
  const [seconds, setSeconds] = useState(15 * 60);
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-xs font-semibold text-secondary-foreground">
      <Clock className="h-3.5 w-3.5" />
      Oferta expira em <span className="tabular-nums text-primary">{mm}:{ss}</span>
      <span className="hidden sm:inline">· Vagas limitadas</span>
    </div>
  );
}

function PulseBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl"
        animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute top-1/2 -right-24 h-96 w-96 rounded-full bg-accent blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.45, 0.7, 0.45] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-primary/15 blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2.4 }}
      />
    </div>
  );
}
