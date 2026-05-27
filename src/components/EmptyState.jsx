export default function EmptyState({ filter, onNew }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4 animate-fade-in">
      {/* Illustration */}
      <div className="w-20 h-20 rounded-2xl flex items-center justify-center opacity-60"
           style={{ background: 'linear-gradient(135deg,#faeef2,#e3ebf7)' }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#d4829f" strokeWidth="1.5"
             strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
          <line x1="8" y1="14" x2="8" y2="14"/>
          <line x1="12" y1="14" x2="12" y2="14"/>
          <line x1="16" y1="14" x2="16" y2="14"/>
        </svg>
      </div>
      <div className="text-center">
        <p className="font-display text-lg text-serenity-700 font-semibold">
          {filter === 'all' ? 'Sin reservas aún' : `Sin reservas "${filter}"`}
        </p>
        <p className="text-sm text-serenity-400 font-body mt-1">
          {filter === 'all'
            ? 'Crea la primera reserva del turno.'
            : 'Prueba con otro filtro o crea una nueva reserva.'}
        </p>
      </div>
      {filter === 'all' && (
        <button onClick={onNew} className="btn-quartz mt-2">
          + Nueva reserva
        </button>
      )}
    </div>
  )
}
