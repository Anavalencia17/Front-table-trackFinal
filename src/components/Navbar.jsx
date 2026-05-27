import { useNavigate } from 'react-router-dom'
import { clearSession } from '../utils/session'

export default function Navbar({ host }) {
  const navigate = useNavigate()

  function handleLogout() {
    clearSession()
    navigate('/login')
  }

  const shiftColors = {
    Mañana: 'bg-amber-100 text-amber-700',
    Tarde:  'bg-quartz-100 text-quartz-700',
    Noche:  'bg-serenity-100 text-serenity-700',
  }
  const shiftClass = shiftColors[host?.turno] || 'bg-gray-100 text-gray-600'

  return (
    <header className="sticky top-0 z-40 glass-card rounded-none border-x-0 border-t-0 px-4 sm:px-8 py-3 flex items-center justify-between gap-4"
            style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>

      {/* Logo */}
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-quartz"
             style={{ background: 'linear-gradient(135deg,#d4829f,#5c80c7)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2"
               strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 11l19-9-9 19-2-8-8-2z"/>
          </svg>
        </div>
        <span className="font-display font-semibold text-xl text-gradient-quartz hidden sm:block">
          TableTrack
        </span>
      </div>

      {/* Host info */}
      <div className="flex items-center gap-3 flex-1 justify-center sm:justify-end">
        <div className="text-right hidden sm:block">
          <p className="text-xs text-serenity-400 font-body">Anfitrión activo</p>
          <p className="text-sm font-semibold text-serenity-800 font-body leading-none">{host?.nombre}</p>
        </div>
        <span className={`${shiftClass} text-xs font-medium px-2.5 py-1 rounded-full font-body`}>
          {host?.turno}
        </span>
        <button onClick={handleLogout}
                className="btn-ghost text-xs px-3 py-2 flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          <span className="hidden sm:inline">Cerrar sesión</span>
        </button>
      </div>
    </header>
  )
}
