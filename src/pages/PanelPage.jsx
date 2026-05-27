import { useState, useEffect, useMemo } from 'react'
import { getSession } from '../utils/session'
import { getReservations } from '../services/api'
import Navbar from '../components/Navbar.jsx'
import ReservationCard from '../components/ReservationCard.jsx'
import ReservationModal from '../components/ReservationModal.jsx'
import SkeletonCard from '../components/SkeletonCard.jsx'
import StatusFilter from '../components/StatusFilter.jsx'
import EmptyState from '../components/EmptyState.jsx'

export default function PanelPage() {
  const session = getSession()

  const [reservations, setReservations] = useState([])
  const [loading, setLoading]           = useState(true)
  const [error, setError]               = useState(null)
  const [filter, setFilter]             = useState('all')
  const [modalOpen, setModalOpen]       = useState(false)
  const [editing, setEditing]           = useState(null)

  // ── Load reservations ─────────────────────────────────────
  useEffect(() => {
    fetchReservations()
  }, [])

  async function fetchReservations() {
    setLoading(true)
    setError(null)
    try {
      const data = await getReservations()
      setReservations(data)
    } catch (err) {
      setError('No se pudo conectar con la API. Verifica la URL en services/api.js.')
    } finally {
      setLoading(false)
    }
  }

  // ── Derived state ──────────────────────────────────────────
  const counts = useMemo(() => ({
    Confirmada:  reservations.filter(r => r.estado === 'Confirmada').length,
    'En Espera': reservations.filter(r => r.estado === 'En Espera').length,
    Finalizada:  reservations.filter(r => r.estado === 'Finalizada').length,
  }), [reservations])

  const filtered = useMemo(() =>
    filter === 'all'
      ? reservations
      : reservations.filter(r => r.estado === filter),
    [reservations, filter]
  )

  // ── Handlers ───────────────────────────────────────────────
  function handleSaved(savedItem, wasEdit) {
    setReservations(prev =>
      wasEdit
        ? prev.map(r => r.id === savedItem.id ? savedItem : r)
        : [savedItem, ...prev]
    )
  }

  function handleUpdated(updatedItem) {
    setReservations(prev => prev.map(r => r.id === updatedItem.id ? updatedItem : r))
  }

  function handleDeleted(id) {
    setReservations(prev => prev.filter(r => r.id !== id))
  }

  function openNew() {
    setEditing(null)
    setModalOpen(true)
  }

  function openEdit(reservation) {
    setEditing(reservation)
    setModalOpen(true)
  }

  // ── Render ──────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">

      {/* Background blobs */}
      <div className="blob w-96 h-96 -top-32 -right-32 pointer-events-none"
           style={{ background: '#d4829f' }} />
      <div className="blob w-80 h-80 bottom-0 -left-24 pointer-events-none"
           style={{ background: '#5c80c7' }} />

      <Navbar host={session} />

      <main className="flex-1 px-4 sm:px-8 py-8 max-w-7xl mx-auto w-full">

        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 animate-slide-up">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-serenity-800">
              Panel de Reservas
            </h1>
            <p className="text-sm text-serenity-400 font-body mt-1">
              Bienvenido, <span className="font-semibold text-quartz-600">{session?.nombre}</span> ·
              Turno <span className="font-semibold text-serenity-500">{session?.turno}</span>
            </p>
          </div>
          <button onClick={openNew}
                  className="btn-quartz self-start sm:self-auto flex items-center gap-2 px-5 py-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white"
                 strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Nueva reserva
          </button>
        </div>

        {/* Stats strip */}
        {!loading && !error && (
          <div className="grid grid-cols-3 gap-3 mb-6 animate-fade-in">
            {[
              { label: 'Confirmadas', count: counts.Confirmada, color: 'bg-serenity-500', light: 'bg-serenity-50' },
              { label: 'En Espera',   count: counts['En Espera'], color: 'bg-quartz-500', light: 'bg-quartz-50' },
              { label: 'Finalizadas', count: counts.Finalizada, color: 'bg-gray-400', light: 'bg-gray-50' },
            ].map(s => (
              <div key={s.label} className="glass-card p-4 flex items-center gap-3">
                <div className={`w-2 h-10 rounded-full ${s.color}`} />
                <div>
                  <p className="font-display text-2xl font-bold text-serenity-800 leading-none">{s.count}</p>
                  <p className="text-xs text-serenity-400 font-body mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Filters */}
        {!loading && !error && (
          <div className="mb-6 animate-fade-in">
            <StatusFilter active={filter} onChange={setFilter} counts={counts} />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="glass-card p-6 flex items-center gap-4 border border-red-200 mb-6 animate-fade-in">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444"
                   strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-red-700 font-body text-sm">Error de conexión</p>
              <p className="text-xs text-red-500 font-body mt-0.5">{error}</p>
            </div>
            <button onClick={fetchReservations} className="btn-ghost text-xs">Reintentar</button>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : filtered.length === 0
              ? <EmptyState filter={filter} onNew={openNew} />
              : filtered.map(r => (
                  <ReservationCard
                    key={r.id}
                    reservation={r}
                    onUpdated={handleUpdated}
                    onDeleted={handleDeleted}
                    onEdit={openEdit}
                  />
                ))
          }
        </div>
      </main>

      {/* Modal */}
      <ReservationModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null) }}
        onSaved={handleSaved}
        editing={editing}
      />
    </div>
  )
}
