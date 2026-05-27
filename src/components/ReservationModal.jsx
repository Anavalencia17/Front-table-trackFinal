import { useState, useEffect } from 'react'
import { createReservation, updateReservation } from '../services/api'
import Swal from 'sweetalert2'

const ESTADOS = ['Confirmada', 'En Espera', 'Finalizada']

const EMPTY = {
  nombreCliente: '',
  fechaHora: '',
  cantidadPersonas: '',
  estado: 'En Espera',
}

export default function ReservationModal({ open, onClose, onSaved, editing }) {
  const [form, setForm]   = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (editing) {
      // Convert fechaHora to datetime-local format
      let fh = editing.fechaHora || ''
      if (fh && fh.includes('T')) fh = fh.slice(0, 16)
      setForm({ ...editing, fechaHora: fh })
    } else {
      setForm(EMPTY)
    }
    setErrors({})
  }, [editing, open])

  function validate() {
    const e = {}
    if (!form.nombreCliente.trim()) e.nombreCliente = 'El nombre del cliente es requerido.'
    if (!form.fechaHora)            e.fechaHora     = 'La fecha y hora son requeridas.'
    if (!form.cantidadPersonas || Number(form.cantidadPersonas) < 1)
      e.cantidadPersonas = 'Ingresa un número válido de personas.'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setSaving(true)
    try {
      const payload = {
        ...form,
        cantidadPersonas: Number(form.cantidadPersonas),
      }
      let saved
      if (editing) {
        saved = await updateReservation(editing.id, payload)
      } else {
        saved = await createReservation(payload)
      }
      onSaved(saved, !!editing)
      onClose()
      await Swal.fire({
        title: editing ? '¡Reserva actualizada!' : '¡Reserva creada!',
        text: editing
          ? 'Los cambios fueron guardados correctamente.'
          : `La reserva de ${saved.nombreCliente} fue registrada.`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      })
    } catch {
      Swal.fire('Error', 'No se pudo guardar la reserva. Revisa la conexión con la API.', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (!open) return null

  return (
    /* Backdrop */
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
         style={{ background: 'rgba(38,52,102,0.35)', backdropFilter: 'blur(6px)' }}
         onClick={e => { if (e.target === e.currentTarget) onClose() }}>

      {/* Panel */}
      <div className="glass-card w-full max-w-md p-6 sm:p-8 animate-slide-up">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-xl font-bold text-serenity-800">
              {editing ? 'Editar Reserva' : 'Nueva Reserva'}
            </h2>
            <p className="text-xs text-serenity-400 font-body mt-0.5">
              {editing ? `Modificando reserva #${editing.id}` : 'Completa los datos del cliente'}
            </p>
          </div>
          <button onClick={onClose}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-serenity-400 hover:bg-quartz-100 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

          {/* Nombre cliente */}
          <div>
            <label className="form-label">Nombre del cliente</label>
            <input className="form-input" type="text" placeholder="Ej: María García"
                   value={form.nombreCliente}
                   onChange={e => setForm(p => ({ ...p, nombreCliente: e.target.value }))} />
            {errors.nombreCliente && <p className="text-xs text-quartz-600 mt-1 font-body">{errors.nombreCliente}</p>}
          </div>

          {/* Fecha y hora */}
          <div>
            <label className="form-label">Fecha y hora</label>
            <input className="form-input" type="datetime-local"
                   value={form.fechaHora}
                   onChange={e => setForm(p => ({ ...p, fechaHora: e.target.value }))} />
            {errors.fechaHora && <p className="text-xs text-quartz-600 mt-1 font-body">{errors.fechaHora}</p>}
          </div>

          {/* Cantidad personas */}
          <div>
            <label className="form-label">Cantidad de personas</label>
            <input className="form-input" type="number" min="1" max="50" placeholder="Ej: 4"
                   value={form.cantidadPersonas}
                   onChange={e => setForm(p => ({ ...p, cantidadPersonas: e.target.value }))} />
            {errors.cantidadPersonas && <p className="text-xs text-quartz-600 mt-1 font-body">{errors.cantidadPersonas}</p>}
          </div>

          {/* Estado */}
          <div>
            <label className="form-label">Estado</label>
            <select className="form-input" value={form.estado}
                    onChange={e => setForm(p => ({ ...p, estado: e.target.value }))}>
              {ESTADOS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-2">
            <button type="button" onClick={onClose}
                    className="btn-ghost flex-1">
              Cancelar
            </button>
            <button type="submit" disabled={saving}
                    className="btn-quartz flex-1 flex items-center justify-center gap-2">
              {saving
                ? <>
                    <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none"
                         stroke="white" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                    Guardando…
                  </>
                : editing ? 'Guardar cambios' : 'Crear reserva'
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
