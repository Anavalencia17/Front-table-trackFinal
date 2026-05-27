/**
 * Formats an ISO date string to a readable Spanish locale format.
 * e.g. "2026-05-27T20:00" → "27 may. 2026, 8:00 p. m."
 */
export function formatDateTime(value) {
  if (!value) return '—'
  try {
    const d = new Date(value)
    return d.toLocaleString('es-CO', {
      day:    '2-digit',
      month:  'short',
      year:   'numeric',
      hour:   '2-digit',
      minute: '2-digit',
    })
  } catch {
    return value
  }
}

export const STATUS_LABELS = {
  Confirmada: 'Confirmada',
  'En Espera': 'En Espera',
  Finalizada: 'Finalizada',
}

export const STATUS_BADGE = {
  Confirmada:  'badge badge-confirmed',
  'En Espera': 'badge badge-waiting',
  Finalizada:  'badge badge-finished',
}

export const STATUS_DOT = {
  Confirmada:  'bg-serenity-500',
  'En Espera': 'bg-quartz-500',
  Finalizada:  'bg-gray-400',
}
