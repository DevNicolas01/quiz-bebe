import { useEffect, useState } from 'react'

const steps = [
  'Analisando as respostas...',
  'Identificando o padrão de sono...',
  'Montando seu plano personalizado...',
]

export default function DiagnosisLoading({ onDone }: { onDone: () => void }) {
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    const isLastStep = stepIndex >= steps.length - 1

    if (isLastStep) {
      const timer = setTimeout(() => {
        onDone()
      }, 900)

      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      setStepIndex((prev) => prev + 1)
    }, 750)

    return () => clearTimeout(timer)
  }, [stepIndex, onDone])

  const currentStep = steps[stepIndex] ?? steps[steps.length - 1]

  const pct = Math.round(((stepIndex + 1) / steps.length) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F2FE] via-[#F8FAFC] to-[#EDE9FE] flex items-center justify-center">
      <div className="max-w-xl mx-auto px-6 text-center animate-in">

        <div className="w-20 h-20 mx-auto mb-8 relative">
          <div className="absolute inset-0 rounded-full border-4 border-sky-100" />
          <div className="absolute inset-0 rounded-full border-4 border-sky-500 border-t-transparent animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center text-2xl">
            🌙
          </div>
        </div>

        <p className="text-slate-900 font-semibold text-lg mb-2 transition-all duration-300">
          {currentStep}
        </p>

        <p className="text-slate-500 text-sm mb-6">
          Isso leva apenas alguns segundos para montar seu resultado personalizado
        </p>

        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-400 to-blue-500 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>

        <p className="text-slate-400 text-xs mt-3 tabular-nums">
          {pct}%
        </p>

      </div>
    </div>
  )
}