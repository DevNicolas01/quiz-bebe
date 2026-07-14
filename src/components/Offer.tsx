import { useEffect, useRef, useState } from "react";
import { useCountdown } from "../hooks/useCountdown";

const CHECKOUT_24 = "https://lastlink.com/p/C7C834B7E/checkout-payment/";
const CHECKOUT_9 = "https://lastlink.com/p/C0869187A/checkout-payment/";

const benefits = [
  { icon: "🌙", text: "Noites mais tranquilas para você e seu bebê" },
  { icon: "💜", text: "Método gentil (sem deixar o bebê chorando sozinho)" },
  { icon: "🕐", text: "Rotina simples adaptada à idade do bebê" },
  { icon: "✨", text: "Passo a passo prático até o sono estabilizar" },
];

const carouselImages = [
  "/img/texto1.png",
  "/img/texto2.png",
  "/img/texto3.png",
  "/img/texto4.png",
  "/img/texto8.png",
];

const essencialItems = [
  { included: true, text: "Ritual do Ninho — guia completo em PDF" },
  { included: true, text: "Cronograma de 1 m" },
  { included: false, text: "Adaptação por faixa etária" },
  { included: false, text: "Suporte por WhatsApp" },
  { included: false, text: "Checklist para imprimir" },
];

const completoItems = [
  { included: true, text: "Ritual do Ninho — guia completo em PDF" },
  { included: true, text: "Cronograma de 1 mês" },
  { included: true, text: "Adaptação por faixa etária (0 a 2 anos)" },
  { included: true, text: "Suporte por WhatsApp por 7 dias" },
  { included: true, text: "Checklist para imprimir e colar na parede" },
];

export default function Offer() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"completo" | "essencial">("completo");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const timeLeft = useCountdown(15);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

function handleCheckout(plan: "completo" | "essencial") {
  if (plan === "completo") {
    window.location.href = CHECKOUT_24;
  } else {
    window.location.href = CHECKOUT_9;
  }
}
  function scrollToPlans() {
    const el = document.getElementById("plans");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  function toggleSound() {
    if (videoRef.current) {
      videoRef.current.muted = soundOn;
      setSoundOn(!soundOn);
    }
  }

  return (
    <div className="pb-32 md:pb-10">
      <div className="max-w-2xl mx-auto px-6 py-14">

        {/* HEADER */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 bg-lav-50 text-lav-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            ✨ Diagnóstico personalizado pronto
          </span>

          <h1 className="font-display text-3xl md:text-4xl font-semibold text-lav-900 leading-tight mb-4">
            Você não está fazendo nada errado — você só não tem um método claro ainda
          </h1>

          <p className="text-lav-500 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Se o seu bebê acorda várias vezes à noite, só dorme no colo ou te deixa exausta… isso não é culpa sua.
          </p>
        </div>

        {/* 🎥 VSL */}
        <div className="mb-3">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-lav-600 text-xs font-bold uppercase tracking-widest">
              Assista antes de continuar
            </span>
          </div>
        </div>

        <div className="mb-3 relative rounded-3xl overflow-hidden shadow-xl shadow-lav-200/40 border border-lav-100">
          <video
            ref={videoRef}
            src="/VideoBebe.mp4"
            className="w-full block bg-lav-900"
            controls
            autoPlay
            muted
            playsInline
            onPause={() => setIsPaused(true)}
            onPlay={() => setIsPaused(false)}
          />

          {!soundOn && !isPaused && (
            <button
              onClick={toggleSound}
              className="absolute top-3 right-3 bg-black/70 hover:bg-black/85 text-white text-xs font-medium px-3 py-2 rounded-full flex items-center gap-1.5 transition-colors backdrop-blur-sm"
            >
              🔇 Ativar som
            </button>
          )}

          {isPaused && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
              <div className="bg-white p-6 rounded-2xl text-center max-w-xs shadow-2xl mx-4">
                <p className="font-display font-semibold text-lav-900 text-lg mb-2">
                  Não perca essa oportunidade
                </p>
                <p className="text-sm text-lav-500 mb-4">
                  Esse pode ser o passo que muda as noites do seu bebê hoje.
                </p>
                <button
                  onClick={() => {
                    videoRef.current?.play();
                    setIsPaused(false);
                  }}
                  className="bg-gradient-to-r from-lav-500 to-lav-600 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-lg"
                >
                  ▶ Continuar assistindo
                </button>
              </div>
            </div>
          )}
        </div>
        <p className="text-center text-lav-300 text-xs mb-10">
          🔒 Vídeo exclusivo para quem completou o diagnóstico
        </p>

        {/* DOR */}
        <div className="bg-lav-50 border border-lav-100 rounded-2xl p-5 mb-8">
          <p className="text-sm text-lav-700 font-medium mb-3">Se hoje você está passando por isso:</p>
          <div className="space-y-2">
            {[
              'Noites interrompidas várias vezes',
              'Bebê que só dorme no colo ou no peito',
              'Exaustão acumulada todos os dias',
            ].map((t) => (
              <div key={t} className="flex items-center gap-2 text-sm text-lav-600">
                <span className="text-lav-400">•</span> {t}
              </div>
            ))}
          </div>
          <p className="text-sm text-lav-600 mt-3 pt-3 border-t border-lav-200/60">
            Você não está sozinha — isso é mais comum do que parece.
          </p>
        </div>

        {/* CARROSSEL */}
        <div className="bg-white border border-lav-100 rounded-3xl p-5 mb-10 shadow-sm">
          <h2 className="text-center font-semibold text-lav-900 mb-1">
            Mães que estavam exatamente assim
          </h2>
          <p className="text-center text-xs text-lav-400 mb-4">
            resultados após ajustar a rotina de sono
          </p>

          <div className="relative overflow-hidden rounded-2xl border border-lav-100 bg-slate-50">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {carouselImages.map((img, i) => (
                <div key={i} className="min-w-full flex items-center justify-center p-3">
                  <img src={img} className="max-h-[320px] object-contain rounded-xl shadow-sm" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-1.5 mt-4">
            {carouselImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-6 bg-lav-500' : 'w-1.5 bg-lav-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* BENEFÍCIOS */}
        <div className="bg-white rounded-3xl border border-lav-100 p-7 mb-10">
          <h2 className="font-display text-xl font-semibold text-lav-900 mb-5">
            O que você vai conquistar
          </h2>
          <div className="space-y-4">
            {benefits.map((b) => (
              <div key={b.text} className="flex items-center gap-3">
                <span className="w-9 h-9 bg-lav-50 rounded-full flex items-center justify-center flex-shrink-0">
                  {b.icon}
                </span>
                <span className="text-lav-700 text-sm">{b.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* URGÊNCIA */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3.5 mb-6 flex items-center justify-center gap-2 text-amber-800 text-sm font-semibold">
          🕐 Esta oferta expira em <span className="tabular-nums">{timeLeft}</span>
        </div>

        {/* PLANOS */}
        <div id="plans" className="scroll-mt-6">
          <p className="text-center text-lav-900 font-display font-semibold text-xl mb-1">
            Escolha seu plano
          </p>
          <p className="text-center text-lav-400 text-sm mb-6">
            Pagamento único • acesso imediato após a confirmação
          </p>

          <div className="space-y-4 mb-6">
            {/* PLANO COMPLETO */}
            <button
              onClick={() => setSelectedPlan("completo")}
              className={`w-full text-left rounded-3xl p-6 relative transition-all ${
                selectedPlan === "completo"
                  ? "border-2 border-lav-500 bg-white shadow-xl shadow-lav-200/50"
                  : "border border-lav-100 bg-white/60"
              }`}
            >
              <div className="absolute -top-3 left-5 bg-gradient-to-r from-lav-500 to-lav-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">
                MAIS ESCOLHIDO · MELHOR CUSTO-BENEFÍCIO
              </div>

              <div className="flex items-start justify-between mt-2 mb-4">
                <div>
                  <p className="font-display font-semibold text-lav-900 text-lg">Plano Completo</p>
                  <p className="text-lav-400 text-xs">Tudo que você precisa, sem faltar nada</p>
                </div>
                <span className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                  selectedPlan === "completo" ? "border-lav-500 bg-lav-500" : "border-lav-200"
                }`}>
                  {selectedPlan === "completo" && <span className="w-2 h-2 bg-white rounded-full" />}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {completoItems.map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-sm">
                    <span className="text-emerald-500">✓</span>
                    <span className="text-lav-700">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-end gap-2 mb-4">
                <span className="text-lav-300 line-through text-sm">R$ 50,00</span>
                <span className="text-3xl font-display font-bold text-lav-900">R$ 24,99</span>
                <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded-full mb-1">
                  50% OFF
                </span>
              </div>

              <div
  onClick={(e) => {
    e.stopPropagation();
    handleCheckout("completo");
  }}
                className="w-full text-center bg-gradient-to-r from-lav-500 to-lav-600 hover:from-lav-600 hover:to-lav-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-lav-300/40"
              >
                Quero o Plano Completo →
              </div>
            </button>

            {}
            <button
              onClick={() => setSelectedPlan("essencial")}
              className={`w-full text-left rounded-3xl p-6 transition-all ${
                selectedPlan === "essencial"
                  ? "border-2 border-lav-300 bg-white shadow-md"
                  : "border border-lav-100 bg-white/60"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-display font-semibold text-lav-900 text-lg">Plano Essencial</p>
                  <p className="text-lav-400 text-xs">O básico para começar</p>
                </div>
                <span className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                  selectedPlan === "essencial" ? "border-lav-500 bg-lav-500" : "border-lav-200"
                }`}>
                  {selectedPlan === "essencial" && <span className="w-2 h-2 bg-white rounded-full" />}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {essencialItems.map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-sm">
                    <span className={item.included ? "text-emerald-500" : "text-lav-200"}>
                      {item.included ? "✓" : "✕"}
                    </span>
                    <span className={item.included ? "text-lav-700" : "text-lav-300 line-through"}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-3xl font-display font-bold text-lav-900 mb-4">R$ 9,99</p>

              <div
  onClick={(e) => {
    e.stopPropagation();
    handleCheckout("essencial");
  }}
                className="w-full text-center bg-lav-50 hover:bg-lav-100 text-lav-700 font-semibold py-3.5 rounded-xl transition-colors"
              >
                Começar com o essencial
              </div>
            </button>
          </div>

          {/* GARANTIA */}
          <div className="bg-white border border-lav-100 rounded-2xl p-5 flex items-start gap-3 mb-8">
            <span className="text-2xl flex-shrink-0">🛡️</span>
            <div>
              <p className="font-semibold text-lav-900 text-sm mb-1">Garantia incondicional de 7 dias</p>
              <p className="text-lav-500 text-xs leading-relaxed">
                Aplique o método. Se não perceber nenhuma melhora, devolvemos 100% do valor — sem
                perguntas, sem burocracia.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 text-lav-400 text-xs">
            <span>🔒 Pagamento seguro</span>
            <span>⚡ Acesso imediato</span>
            <span>↩️ 7 dias de garantia</span>
          </div>
        </div>

        <p className="text-center text-lav-300 text-xs mt-10">
          © Método Sono Sereno · feito para mães reais
        </p>
      </div>

      {/* CTA MOBILE */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-lav-100 p-4 z-50 flex items-center gap-3">
        <div className="flex-shrink-0">
          <p className="text-lav-300 line-through text-[10px] leading-none">R$ 50,00</p>
          <p className="text-lav-900 font-display font-bold text-base leading-tight">R$ 24,99</p>
        </div>
        <button
          onClick={scrollToPlans}
          className="flex-1 bg-gradient-to-r from-lav-500 to-lav-600 text-white font-semibold py-3 rounded-2xl text-sm"
        >
          Quero resolver o sono hoje
        </button>
      </div>
    </div>
  );
}