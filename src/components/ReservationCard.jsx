import { formatDateTime, STATUS_BADGE, STATUS_DOT } from '../utils/formatters'
import Swal from 'sweetalert2'
import { deleteReservation, patchReservationStatus } from '../services/api'

export default function ReservationCard({ reservation, onUpdated, onDeleted, onEdit }) {
  const { id, nombreCliente, fechaHora, cantidadPersonas, estado } = reservation

  async function handleFinalize() {
    if (estado === 'Finalizada') return
    const result = await Swal.fire({
      title: '¿Finalizar reserva?',
      html: `<span style="color:#5c6080">Se marcará la reserva de <strong>${nombreCliente}</strong> como Finalizada.</span>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, finalizar',
      cancelButtonText: 'Cancelar',
    })
    if (!result.isConfirmed) return

    try {
      const updated = await patchReservationStatus(id, 'Finalizada')
      onUpdated(updated)
      await Swal.fire({
        title: '¡Listo!',
        text: 'La reserva fue finalizada.',
        icon: 'success',
        timer: 1800,
        showConfirmButton: false,
      })
    } catch {
      Swal.fire('Error', 'No se pudo actualizar el estado.', 'error')
    }
  }

  async function handleDelete() {
    const result = await Swal.fire({
      title: '¿Cancelar reserva?',
      html: `<span style="color:#5c6080">¿Estás seguro de cancelar la reserva de <strong>${nombreCliente}</strong>? Esta acción no se puede deshacer.</span>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No',
      reverseButtons: true,
    })
    if (!result.isConfirmed) return

    try {
      await deleteReservation(id)
      onDeleted(id)
      await Swal.fire({
        title: 'Reserva cancelada',
        text: 'La reserva fue eliminada del sistema.',
        icon: 'success',
        timer: 1800,
        showConfirmButton: false,
      })
    } catch {
      Swal.fire('Error', 'No se pudo eliminar la reserva.', 'error')
    }
  }

  const isFinalized = estado === 'Finalizada'

  return (
    <div className={`glass-card p-5 flex flex-col gap-3 animate-slide-up transition-all duration-300
      ${isFinalized ? 'opacity-70' : 'hover:shadow-card hover:-translate-y-0.5'}`}>

      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Avatar circle */}
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0"
               style={{ background: 'linear-gradient(135deg,#d4829f,#7c9ed6)' }}>
            {nombreCliente?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-display font-semibold text-serenity-800 text-sm leading-tight">{nombreCliente}</p>
            <p className="text-xs text-serenity-400 font-body">ID #{id}</p>
          </div>
        </div>
        <span className={STATUS_BADGE[estado] || 'badge'}>
          <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[estado] || 'bg-gray-400'}`} />
          {estado}
        </span>
      </div>

      <div className="divider" />

      {/* Details */}
      <div className="grid grid-cols-2 gap-2 text-xs font-body text-serenity-600">
        <div className="flex items-center gap-1.5">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
               strokeLinecap="round" strokeLinejoin="round" className="text-quartz-400">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          {formatDateTime(fechaHora)}
        </div>
        <div className="flex items-center gap-1.5">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
               strokeLinecap="round" strokeLinejoin="round" className="text-serenity-400">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          {cantidadPersonas} {cantidadPersonas === 1 ? 'persona' : 'personas'}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 mt-1">
        {!isFinalized && (
          <button onClick={() => onEdit(reservation)}
                  className="btn-serenity text-xs px-3 py-1.5 flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2"
                 strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Editar
          </button>
        )}
        {!isFinalized && (
          <button onClick={handleFinalize}
                  className="btn-quartz text-xs px-3 py-1.5 flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2"
                 strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Finalizar
          </button>
        )}
        <button onClick={handleDelete}
                className="btn-danger text-xs px-3 py-1.5 flex items-center gap-1.5 ml-auto">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2"
               strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14H6L5 6"/>
            <path d="M10 11v6"/><path d="M14 11v6"/>
            <path d="M9 6V4h6v2"/>
          </svg>
          Eliminar
        </button>
      </div>
    </div>
  )
}
