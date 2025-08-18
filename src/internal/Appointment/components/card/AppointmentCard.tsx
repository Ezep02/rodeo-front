import React from 'react'
import { Appointment } from '../../models/Appointment'
import { Card } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SlOptions } from 'react-icons/sl'
import { MdAccessTime } from 'react-icons/md'
import { IoCheckmarkCircle, IoCloseCircle, IoRefresh, IoTime } from 'react-icons/io5'

import AddReviewDialog from '../dialog/AddReviewDialog'
import RescheduleDialog from '../dialog/RescheduleDialog'
import CancelDialog from '../dialog/CancelDialog'
import { getPaymentStatus } from '@/utils/getAppointmentStatus'
import { formatTime } from '@/internal/analytics/utils/TimeFormater'

type CardProps = {
  appointment: Appointment
}

const getStatusIcon = (
  status: string,
  date: Date,
  time: string
) => {
  const slotDateTime = new Date(date)
  const [hours, minutes] = time.split(':').map(Number)
  slotDateTime.setHours(hours, minutes, 0, 0)

  const now = new Date()

  if (slotDateTime > now && status !== 'cancelled') {
    return {
      icon: <IoTime className="text-yellow-500 w-5 h-5" />,
      label: 'Pendiente'
    }
  }

  switch (status) {
    case 'active':
      return {
        icon: <IoCheckmarkCircle className="text-green-500 w-5 h-5" />,
        label: 'Atendido'
      }
    case 'cancelled':
      return {
        icon: <IoCloseCircle className="text-red-500 w-5 h-5" />,
        label: 'Cancelada'
      }
    case 'updated':
      return {
        icon: <IoRefresh className="text-blue-500 w-5 h-5" />,
        label: 'Reprogramada'
      }
    default:
      return {
        icon: null,
        label: 'Sin estado'
      }
  }
}

const AppointmentCard: React.FC<CardProps> = ({ appointment }) => {
  const totalPrice = appointment.products.reduce((acc, product) => acc + product.price, 0)
  const paidAmount = (appointment.payment_percentage / 100) * totalPrice

  const slotDate = new Date(appointment.slot.date)
  const [hours, minutes] = appointment.slot.time.split(':').map(Number)
  slotDate.setHours(hours, minutes, 0, 0)

  const isInFuture = slotDate > new Date()
  const paymentStatus = getPaymentStatus(appointment.payment_percentage)

  const { icon: statusIcon, label: statusLabel } = getStatusIcon(
    appointment.status,
    slotDate,
    appointment.slot.time
  )

  return (
    <Card className="rounded-2xl border-none shadow-none p-5 bg-white flex flex-col gap-4">

      {/* Estado */}
      <div className="flex items-center gap-2">
        {statusIcon}
        <span className="text-sm text-zinc-600">{statusLabel}</span>
      </div>

      {/* Info + Acciones */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-zinc-800 font-semibold text-base">
            {new Date(appointment.slot.date).toLocaleDateString('es-AR', {
              weekday: 'long',
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </p>

          <div className="flex items-center gap-2 text-sm text-zinc-600">
            <MdAccessTime className="text-lg" />
            <span>{formatTime(appointment.slot.time)}</span>
          </div>

          <p className="text-sm text-neutral-500">
            ${paidAmount.toFixed(0)} / ${totalPrice.toFixed(0)}
          </p>
        </div>

        {isInFuture && appointment.status !== 'cancelled' && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <SlOptions className="text-zinc-500 hover:text-zinc-700" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem onSelect={(e) => e.preventDefault()} >
                <RescheduleDialog appointment={appointment} />
              </DropdownMenuItem>

              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <CancelDialog appointment={appointment} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Estado de pago */}
      <div className="mt-1">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${paymentStatus.className}`}>
          {paymentStatus.label}
        </span>
      </div>

      {/* Review */}
      {new Date() > slotDate && !appointment.review && (
        <section className="bg-zinc-50 p-3 rounded-lg flex flex-col gap-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="text-sm text-zinc-700">¿Qué te pareció el servicio?</p>
            <AddReviewDialog appointment={appointment} />
          </div>
        </section>
      )}

      {/* Ver detalles */}
      <div className="pt-2">
        <button
          className="text-sm text-primary underline underline-offset-4 hover:text-primary/80 transition"
          onClick={() => console.log('Ver más detalles de', appointment.id)}
        >
          Ver detalles
        </button>
      </div>
    </Card>

  )
}

export default AppointmentCard
