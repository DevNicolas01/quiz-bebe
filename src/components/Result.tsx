import { QuizAnswers } from '../App'
import { idadeLabels, acordarLabels, ondeLabels, desafioLabels } from '../data/quiz'

interface ResultProps {
  answers: QuizAnswers
  onContinue: () => void
}

export default function Result({ answers, onContinue }: ResultProps) {
  const rows = [
    { label: 'Idade', value: idadeLabels[answers.idade ?? ''] },
    { label: 'Acorda por noite', value: acordarLabels[answers.acordar ?? ''] },
    { label: 'Onde dorme', value: ondeLabels[answers['onde-dorme'] ?? ''] },
    { label: 'Maior desafio', value: desafioLabels[answers.desafio ?? ''] },
  ]

  return (
    <div className="max-w-lg mx-auto px-6 py-14 animate-in">
      <div className="bg-white rounded-3xl border border-lav-100 shadow-xl shadow-lav-100/50 p-8">
        <span className="inline-flex items-center gap-1.5 bg-lav-50 text-lav-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
          ✨ Diagnóstico pronto
        </span>

        <h1 className="font-display text-2xl font-semibold text-lav-900 mb-3 leading-snug">
          Identificamos o padrão de sono do bebê
        </h1>
        <p className="text-lav-500 text-sm leading-relaxed mb-6">
          Com base nas suas respostas, montamos um plano personalizado para noites mais tranquilas — em até 7 dias.
        </p>

        <div className="bg-lav-50/60 rounded-2xl p-4 mb-6 space-y-3">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center justify-between text-sm">
              <span className="text-lav-400">{r.label}</span>
              <span className="font-semibold text-lav-900">{r.value}</span>
            </div>
          ))}
        </div>

        <div className="space-y-2.5 mb-7">
          {[
            'Método adequado para a idade do bebê',
            'Rotina noturna personalizada',
            'Passo a passo para reduzir despertares',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2.5 text-sm text-lav-700">
              <span className="w-5 h-5 rounded-full bg-lav-100 text-lav-600 flex items-center justify-center flex-shrink-0 text-xs">✓</span>
              {item}
            </div>
          ))}
        </div>

        <button
          onClick={onContinue}
          className="w-full bg-gradient-to-r from-lav-500 to-lav-600 hover:from-lav-600 hover:to-lav-700 text-white font-semibold py-4 rounded-2xl transition-all shadow-lg shadow-lav-300/40 hover:-translate-y-0.5"
        >
          Ver meu plano personalizado →
        </button>
        <p className="text-center text-lav-300 text-xs mt-3">Leva menos de 1 minuto para ver</p>
      </div>
    </div>
  )
}
