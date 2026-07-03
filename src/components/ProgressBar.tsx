interface ProgressBarProps {
  current: number
  total: number
  onBack?: () => void
}

export default function ProgressBar({
  current,
  total,
  onBack,
}: ProgressBarProps) {
  const pct = (current / total) * 100

  const getMessage = () => {
    if (pct < 40) return "Vamos entender o sono do seu bebê…"
    if (pct < 80) return "Quase pronto, estamos montando seu diagnóstico…"
    return "Último passo para seu resultado personalizado 💙"
  }

  return (
    <div className="mb-8">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-2">
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            <span>←</span>
            <span>Voltar</span>
          </button>
        ) : (
          <div />
        )}

        <span className="text-sm text-slate-500 font-medium">
          {current} de {total}
        </span>
      </div>

      {/* BAR */}
      <div className="relative w-full h-3 bg-slate-200 rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 transition-all duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* PERCENT */}
      <div className="mt-2 text-center">
        <span className="text-xs font-semibold text-slate-600">
          {Math.round(pct)}% concluído
        </span>
      </div>

      {/* EMOTIONAL MESSAGE */}
      <p className="mt-2 text-center text-sm text-slate-600 leading-relaxed">
        {getMessage()}
      </p>
    </div>
  )
}