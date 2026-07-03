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

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            <span>←</span>
            <span>Voltar</span>
          </button>
        ) : (
          <div />
        )}

        <span className="text-sm text-slate-500 font-medium">
          Pergunta {current} de {total}
        </span>
      </div>

      <div className="relative w-full h-3 bg-slate-200 rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 transition-all duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />

        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-slate-700">
          {Math.round(pct)}%
        </span>
      </div>
    </div>
  )
}