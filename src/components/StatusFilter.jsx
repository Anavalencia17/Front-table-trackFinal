const FILTERS = [
  { label: 'Todas',     value: 'all' },
  { label: 'Confirmada', value: 'Confirmada' },
  { label: 'En Espera', value: 'En Espera' },
  { label: 'Finalizada', value: 'Finalizada' },
]

export default function StatusFilter({ active, onChange, counts }) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map(f => {
        const isActive = active === f.value
        const count = f.value === 'all'
          ? Object.values(counts).reduce((a, b) => a + b, 0)
          : (counts[f.value] || 0)

        return (
          <button
            key={f.value}
            onClick={() => onChange(f.value)}
            className={`font-body text-xs font-medium px-4 py-2 rounded-full transition-all duration-200 flex items-center gap-2
              ${isActive
                ? 'text-white shadow-soft'
                : 'bg-white/60 text-serenity-700 hover:bg-white/90 border border-white/60'
              }`}
            style={isActive ? {
              background: 'linear-gradient(135deg,#d4829f,#5c80c7)',
              boxShadow: '0 4px 14px rgba(212,130,159,.35)'
            } : {}}
          >
            {f.label}
            <span className={`text-xs rounded-full px-1.5 py-0.5 font-semibold
              ${isActive ? 'bg-white/25 text-white' : 'bg-serenity-100 text-serenity-600'}`}>
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
