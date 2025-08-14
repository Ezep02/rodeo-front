import React, { useMemo, useState } from 'react'
import { Appointment } from '../../models/Appointments'
import { useOrder } from '../../hooks/useOrder'

import ApptItemCard from '../cards/OrderItemCard'
import { GoTasklist } from 'react-icons/go'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { useSlots } from '@/hooks/useSlots'
import SlotPanel from '../dialogs/SlotsDialog'

import { BiExpandAlt } from "react-icons/bi";
import AppointmentList from '../dialogs/AppointmentList'

const ScheduleSection: React.FC = () => {
  const {
    MoveAppointmentOffset,
    hashMap
  } = useOrder()

  const {
    AddSlot,
    RemoveSlot,
    UpdateCurrentSlot,
    slotDate,
    filteredSlots,
    setSlotDate,
    SaveSlots,
    slotIsLoading,
    CancelDelete,
    MoveSlotOffset,
    GetSlotQuantByDate,
  } = useSlots()

  // Funciones auxiliares para el rango semanal
  const getStartOfWeek = (date: Date) => {
    const day = date.getDay()
    const diff = date.getDate() - day
    return new Date(date.getFullYear(), date.getMonth(), diff)
  }

  const getWeekRange = (date: Date) => {
    const startOfWeek = getStartOfWeek(date)
    startOfWeek.setHours(0, 0, 0, 0)

    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    endOfWeek.setHours(23, 59, 59, 999)

    return { startOfWeek, endOfWeek }
  }

  const today = useMemo(() => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    return now
  }, [])

  const [currentWeekStartDate, setCurrentWeekStartDate] = useState<Date>(
    getStartOfWeek(today)
  )

  const weekDates = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(currentWeekStartDate)
      d.setDate(d.getDate() + i)
      return d
    })
  }, [currentWeekStartDate])

  const appointmentsByDate = useMemo(() => {
    const grouped: Record<string, Appointment[]> = {}
    hashMap.forEach((appointments, dateKey) => {
      grouped[dateKey] = appointments
    })
    return grouped
  }, [hashMap])

  // Manejador para semana anterior con bloqueo antes de hoy
  const handlePreviousWeek = () => {
    const newWeekStart = new Date(currentWeekStartDate)
    newWeekStart.setDate(newWeekStart.getDate() - 7)

    const { endOfWeek, startOfWeek } = getWeekRange(newWeekStart)

    if (endOfWeek < today) return // Bloqueo para semanas anteriores a hoy

    setCurrentWeekStartDate(newWeekStart)

    // Actualizar offsets con rango correcto
    MoveAppointmentOffset(startOfWeek, endOfWeek)
    MoveSlotOffset(startOfWeek, endOfWeek)
  }

  // Manejador para semana siguiente
  const handleNextWeek = () => {
    const newWeekStart = new Date(currentWeekStartDate)
    newWeekStart.setDate(newWeekStart.getDate() + 7)

    const { startOfWeek, endOfWeek } = getWeekRange(newWeekStart)

    setCurrentWeekStartDate(newWeekStart)

    // Actualizar offsets con rango correcto
    MoveAppointmentOffset(startOfWeek, endOfWeek)
    MoveSlotOffset(startOfWeek, endOfWeek)
  }

  // Estado para panel abierto por día
  const [openSlotPanelDate, setOpenSlotPanelDate] = useState<Date | null>(null)
  const openSlotPanelForDate = (date: Date) => {
    setSlotDate(date)
    setOpenSlotPanelDate(date)
  }

  // 


  return (
    <div className="flex flex-col min-h-[60vh] w-full bg-white border border-slate-200 shadow-md rounded-2xl overflow-hidden flex-grow">
      <div className="p-4 flex flex-col h-full flex-grow">
        {/* Header */}
        <div className="mb-6 flex gap-2 justify-between flex-wrap ">

          <div className='flex items-start gap-2'>
            <div className="p-2 bg-zinc-900 rounded-lg shadow-sm">
              <GoTasklist size={24} className="text-white" />
            </div>
            <div>
              <h5 className="text-sm font-semibold">Calendario Semanal</h5>
              <p className="text-sm">Turnos por día de la semana</p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Button variant="ghost" size="sm" onClick={handlePreviousWeek}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              Semana del {currentWeekStartDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <Button variant="ghost" size="sm" onClick={handleNextWeek}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 flex-grow overflow-y-auto scroll-abrir-editar-tarjeta">
          {weekDates.map(date => {
            const dateKey = date.toISOString().split('T')[0]
            const appts = appointmentsByDate[dateKey] || []
            const isPanelOpen = openSlotPanelDate?.toISOString().split('T')[0] === dateKey

            return (
              <div
                key={dateKey}
                className="border rounded-lg p-5 shadow-sm flex flex-col flex-grow"
              >

                <div className="flex flex-col gap-1 mb-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-zinc-800">
                      {date.toLocaleDateString('es-ES', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                      })}
                    </div>

                    <button
                      onClick={() => openSlotPanelForDate(date)}
                      className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-800 hover:bg-zinc-100 px-3 py-2 rounded-full transition"
                      aria-label="Expandir día"
                    >
                      <BiExpandAlt size={18} />
                      <span className="whitespace-nowrap">
                        {GetSlotQuantByDate(date)} {GetSlotQuantByDate(date) === 1 ? 'turno activo' : 'turnos activos'}
                      </span>
                    </button>
                  </div>
                </div>


                <div className="space-y-2 pt-4">
                  {appts.length > 0 ? (
                    <>
                      {appts.slice(0, 2).map((appt) => (
                        <ApptItemCard key={appt.id} appointment={appt} />
                      ))}

                      {appts.length > 2 && (
                        <AppointmentList
                          appts={appts}
                        />
                      )}
                    </>
                  ) : (
                    <p className="text-gray-400 text-sm italic">
                      Aun no se registraron turnos
                    </p>
                  )}
                </div>


                <SlotPanel
                  AppointmentDate={date}
                  AddSlot={AddSlot}
                  CancelDelete={CancelDelete}
                  RemoveSlot={RemoveSlot}
                  SaveSlots={() => {
                    SaveSlots()
                    setOpenSlotPanelDate(null)
                  }}
                  UpdateCurrentSlot={UpdateCurrentSlot}
                  filteredSlots={filteredSlots}
                  setSlotDate={setSlotDate}
                  slotDate={slotDate}
                  slotIsLoading={slotIsLoading}
                  onClose={() => setOpenSlotPanelDate(null)}
                  isOpen={isPanelOpen}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ScheduleSection