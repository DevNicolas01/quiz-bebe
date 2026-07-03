import { useEffect, useState } from "react";
import { useCountdown } from "../hooks/useCountdown";
import FAQ from "./FAQ";

const benefits = [
  { icon: "🌙", text: "Rotina noturna passo a passo por faixa etária" },
  { icon: "💜", text: "Método gentil, sem deixar o bebê chorar sozinho" },
  { icon: "🕐", text: "Cronograma de 7 dias com metas realistas" },
  { icon: "✨", text: "Guia de sonecas e ambiente ideal do sono" },
  { icon: "🛡️", text: "Suporte por 30 dias com especialistas" },
];

const carouselImages = [
  "/img/texto1.png",
  "/img/texto2.png",
  "/img/texto3.png",
  "/img/texto4.png",
  "/img/texto8.png",
  "/img/texto9.png",
  "/img/texto10.png",
];

export default function Offer() {
  const timeLeft = useCountdown(15);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  function handleCheckout() {
    window.location.href = "https://seu-checkout-aqui.com";
  }

  return (
    <div className="pb-28 md:pb-10">
      <div className="max-w-2xl mx-auto px-6 py-14">

        <div className="text-center mb-10 animate-in">
          <span className="inline-flex items-center gap-1.5 bg-lav-50 text-lav-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            ✨ Plano personalizado pronto
          </span>

          <h1 className="font-display text-3xl md:text-4xl font-semibold text-lav-900 leading-tight mb-4">
            Noites tranquilas para você e o bebê em até{" "}
            <span className="text-lav-600">7 dias</span>
          </h1>

          <p className="text-lav-500 text-base leading-relaxed max-w-md mx-auto">
            O método acolhedor que já ajudou milhares de mães a recuperarem o sono — sem choro prolongado e sem culpa.
          </p>
        </div>

        <div className="bg-lav-50 border border-lav-100 rounded-2xl p-4 mb-8 text-sm text-lav-700">
          Com base nas suas respostas, identificamos um padrão de sono com despertares noturnos e dificuldade de autonomia no sono.
        </div>

        <button className="w-full aspect-video bg-gradient-to-br from-lav-100 to-lav-200 rounded-3xl mb-10 flex flex-col items-center justify-center gap-3 group">
          <span className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M8 5v14l11-7L8 5z" fill="#6f57bf" />
            </svg>
          </span>

          <p className="text-center text-lav-500 text-sm">
            Veja como funciona o método em 2 minutos
          </p>
        </button>

        <div className="bg-white rounded-3xl border border-lav-100 p-7 mb-10">
          <h2 className="font-display text-xl font-semibold text-lav-900 mb-5">
            O que você vai receber
          </h2>

          <div className="space-y-4">
            {benefits.map((b) => (
              <div key={b.text} className="flex items-center gap-3">
                <span className="w-9 h-9 bg-lav-50 rounded-full flex items-center justify-center">
                  {b.icon}
                </span>
                <span className="text-lav-700 text-sm">{b.text}</span>
              </div>
            ))}
          </div>
        </div>

        <h2 className="font-display text-xl font-semibold text-lav-900 mb-5 text-center">
          Mães que voltaram a dormir
        </h2>

        <div className="overflow-hidden mb-10">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${index * 100}%)`,
            }}
          >
            {carouselImages.map((img, i) => (
              <div key={i} className="min-w-full px-2">
                <img
                  src={img}
                  alt={`Depoimento ${i + 1}`}
                  className="w-full h-auto object-contain rounded-2xl border border-lav-100"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6 flex justify-center">
          <img
            src="/img/zerorisco.png"
            alt="Risco zero"
            className="w-40 md:w-48"
          />
        </div>

        <h2 className="font-display text-xl font-semibold text-lav-900 mb-5 text-center">
          Perguntas frequentes
        </h2>

        <div className="mb-10">
          <FAQ />
        </div>

<div className="bg-white rounded-3xl border border-lav-100 shadow-xl p-7 text-center">

  <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
    🕐 Oferta por tempo limitado · escolha seu plano
  </div>

  <p className="text-lav-900 font-semibold text-lg mb-6">
    Escolha a melhor opção para você
  </p>

  <div className="border border-lav-100 rounded-2xl p-5 mb-4 text-left">
    <p className="text-lav-900 font-semibold">Plano Essencial</p>
    <p className="text-lav-500 text-xs mb-3">
      Guia completo para melhorar o sono do bebê
    </p>

    <p className="text-3xl font-display font-semibold text-lav-900">
      R$ 9,99
    </p>

    <ul className="text-sm text-lav-600 mt-3 space-y-1">
      <li>✓ Método básico passo a passo</li>
      <li>✓ Rotina de sono por idade</li>
      <li>✓ Acesso imediato</li>
    </ul>

    <button
      onClick={() => window.location.href = "https://seu-checkout-aqui.com/essencial"}
      className="w-full mt-4 bg-lav-100 text-lav-700 font-semibold py-3 rounded-xl"
    >
      Quero essa opção
    </button>
  </div>

  <div className="border-2 border-lav-500 rounded-2xl p-5 text-left relative">

    <div className="absolute -top-3 left-4 bg-lav-500 text-white text-xs px-3 py-1 rounded-full">
      MAIS COMPLETO
    </div>

    <p className="text-lav-900 font-semibold">Plano Completo</p>
    <p className="text-lav-500 text-xs mb-3">
      Método + bônus + suporte estendido
    </p>

    <p className="text-3xl font-display font-semibold text-lav-900">
      R$ 24,99
    </p>

    <ul className="text-sm text-lav-600 mt-3 space-y-1">
      <li>✓ Tudo do plano essencial</li>
      <li>✓ Bônus exclusivos (rotinas avançadas)</li>
      <li>✓ Guia de regressão do sono</li>
      <li>✓ Estratégias para noites difíceis</li>
    </ul>

    <button
      onClick={() => window.location.href = "https://seu-checkout-aqui.com/completo"}
      className="w-full mt-4 bg-gradient-to-r from-lav-500 to-lav-600 text-white font-semibold py-3 rounded-xl"
    >
      Quero o plano completo
    </button>
  </div>

</div>

        <p className="text-center text-lav-300 text-xs mt-8">
          © Método Sono Sereno · Feito com carinho para mães.
        </p>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50">
        <button
          onClick={handleCheckout}
          className="w-full bg-gradient-to-r from-lav-500 to-lav-600 text-white font-semibold py-3.5 rounded-2xl text-sm"
        >
          Quero dormir melhor agora →
        </button>
      </div>
    </div>
  );
}