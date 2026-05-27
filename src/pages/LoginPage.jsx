import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveSession, getSession } from '../utils/session'

const TURNOS = ['Mañana', 'Tarde', 'Noche']

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm]     = useState({ nombre: '', turno: 'Mañana' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // Already logged in → redirect
  useEffect(() => {
    if (getSession()) navigate('/panel', { replace: true })
  }, [])

  function validate() {
    const e = {}
    if (!form.nombre.trim())  e.nombre = 'Tu nombre completo es requerido.'
    if (!form.turno)          e.turno  = 'Selecciona un turno.'
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    setTimeout(() => {
      saveSession({ nombre: form.nombre.trim(), turno: form.turno })
      navigate('/panel', { replace: true })
    }, 600)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">

      {/* Decorative blobs */}
      <div className="blob w-96 h-96 -top-24 -left-24" style={{ background: '#d4829f' }} />
      <div className="blob w-80 h-80 -bottom-20 -right-16" style={{ background: '#5c80c7' }} />
      <div className="blob w-60 h-60 top-1/2 left-2/3" style={{ background: '#edc3d4', opacity: '.15' }} />

      {/* Card */}
      <div className="glass-card w-full max-w-sm p-8 relative z-10 animate-slide-up">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 shadow-quartz"
               style={{ background: 'linear-gradient(135deg,#d4829f,#5c80c7)' }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"
                 strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 11l19-9-9 19-2-8-8-2z"/>
            </svg>
          </div>
          <h1 className="font-display text-3xl font-bold text-gradient-quartz">TableTrack</h1>
          <p className="text-xs text-serenity-400 font-body mt-1 tracking-wide">Gestor de Reservas</p>
        </div>

        <div className="divider mb-6" />

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

          <div>
            <label className="form-label">Nombre completo</label>
            <input
              className="form-input"
              type="text"
              placeholder="Ej: Ana Torres"
              value={form.nombre}
              onChange={e => { setForm(p => ({ ...p, nombre: e.target.value })); setErrors(p => ({ ...p, nombre: '' })) }}
              autoFocus
            />
            {errors.nombre && (
              <p className="text-xs text-quartz-600 mt-1.5 font-body flex items-center gap-1">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {errors.nombre}
              </p>
            )}
          </div>

          <div>
            <label className="form-label">Turno</label>
            <div className="flex gap-2">
              {TURNOS.map(t => {
                const active = form.turno === t
                return (
                  <button
                    key={t} type="button"
                    onClick={() => { setForm(p => ({ ...p, turno: t })); setErrors(p => ({ ...p, turno: '' })) }}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 font-body
                      ${active
                        ? 'text-white shadow-quartz'
                        : 'bg-white/60 text-serenity-600 border border-serenity-100 hover:bg-white'}`}
                    style={active ? { background: 'linear-gradient(135deg,#d4829f,#7c9ed6)' } : {}}
                  >
                    {t}
                  </button>
                )
              })}
            </div>
            {errors.turno && <p className="text-xs text-quartz-600 mt-1.5 font-body">{errors.turno}</p>}
          </div>

          <button type="submit" disabled={loading}
                  className="btn-quartz w-full mt-2 justify-center flex items-center gap-2 py-3 text-base">
            {loading
              ? <>
                  <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none"
                       stroke="white" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                  </svg>
                  Ingresando…
                </>
              : <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white"
                       strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                    <polyline points="10 17 15 12 10 7"/>
                    <line x1="15" y1="12" x2="3" y2="12"/>
                  </svg>
                  Comenzar turno
                </>
            }
          </button>
        </form>

        <p className="text-center text-xs text-serenity-300 font-body mt-6">
          © {new Date().getFullYear()} TableTrack · Panel de Anfitriones
        </p>
      </div>
    </div>
  )
}
