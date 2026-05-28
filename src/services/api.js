import axios from 'axios'

// ──────────────────────────────────────────────────────────────────────────────
// Replace BASE_URL with your actual MockAPI endpoint.
// Example: https://67xxxxxxxxxxxxxxxx.mockapi.io/api/v1
// ──────────────────────────────────────────────────────────────────────────────
const BASE_URL = import.meta.env.VITE_API_URL || 'https://6a1769a21878294b597b5c76.mockapi.io/api/v1'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

/* ── Reservations ──────────────────────────────────────────── */

/** Fetch all reservations */
export async function getReservations() {
  const { data } = await api.get('/reservas')
  return data
}

/** Create a new reservation */
export async function createReservation(payload) {
  const { data } = await api.post('/reservas', payload)
  return data
}

/** Update (full) a reservation */
export async function updateReservation(id, payload) {
  const { data } = await api.put(`/reservas/${id}`, payload)
  return data
}

/** Patch only the state of a reservation */
export async function patchReservationStatus(id, estado) {
  const { data } = await api.put(`/reservas/${id}`, { estado })
  return data
}

/** Delete a reservation */
export async function deleteReservation(id) {
  const { data } = await api.delete(`/reservas/${id}`)
  return data
}

export default api
