import React, { useState } from 'react'
import { Appointment } from '../../models/Appointment'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from '@/components/ui/collapsible'
import {
  Calendar,
  ChevronDown,
  ChevronRight,
  StarIcon
} from 'lucide-react'
import AddReviewDialog from '../dialog/AddReviewDialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { SlOptions } from "react-icons/sl";
import RescheduleDialog from '../dialog/RescheduleDialog'
import CancelDialog from '../dialog/CancelDialog'

const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`
const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })

type CardProps = {
  appointment: Appointment
}

const AppointmentCard: React.FC<CardProps> = ({ appointment }) => {
  const [isExpanded, setExpanded] = useState(false)

  const getPaymentStatus = (time: Date) => {
    const now = new Date()
    const date = new Date(time)
    if (now <= date) {
      return {
        label: 'Pendiente',
        color: 'bg-yellow-500/10 text-yellow-400 border'
      }
    }
    return {
      label: 'Completado',
      color: 'bg-lime-600/10 text-lime-500 border'
    }
  }

  const paymentStatus = getPaymentStatus(appointment.slot.date)
  const totalPrice = appointment.products.reduce((acc, product) => acc + product.price, 0)
  const paidAmount = (appointment.payment_percentage / 100) * totalPrice
  const remainingAmount = totalPrice - paidAmount

  const isInFuture = (() => {
    const slotDate = new Date(appointment.slot.date); // base date from ISO
    const [hours, minutes] = appointment.slot.time.split(":").map(Number);

    slotDate.setHours(hours);
    slotDate.setMinutes(minutes);
    slotDate.setSeconds(0);
    slotDate.setMilliseconds(0);

    return slotDate > new Date();
  })();


  return (
    <Card className="hover:bg-gray-50 rounded-lg cursor-pointer p-5 border-none  shadow-none">
      <div className="flex items-center justify-between mb-2">
        <Badge className={`${appointment.status === "cancelled" ? "bg-red-100 text-red-600 border border-red-200" : paymentStatus.color} text-xs`}>
          {appointment.status === "cancelled" ? 'Cancelado' : paymentStatus.label}
        </Badge>

        {isInFuture && appointment.status !== "cancelled" && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <SlOptions className="text-zinc-500 hover:text-zinc-700" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem onSelect={(e) => e.preventDefault()} asChild>
                <div>
                  <RescheduleDialog appointment={appointment} />
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem onSelect={(e) => e.preventDefault()} asChild>
                <div>
                  <CancelDialog appointment={appointment} />
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <Collapsible open={isExpanded}>
        <CollapsibleTrigger asChild>
          <div className="flex flex-col py-2 rounded px-2">
            <div
              className="flex items-center justify-between py-3 rounded px-2 cursor-pointer hover:bg-gray-100"
              onClick={() => setExpanded(prev => !prev)}
            >
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-700" />
                <span className="text-sm text-gray-800">
                  {formatDate(appointment.slot.date)} - {appointment.slot.time}
                </span>
              </div>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              )}
            </div>

            {/* Review Section solo si se completó */}
            {new Date() > new Date(appointment.slot.date) && (
              <div className="mb-4 p-3 rounded-lg bg-gray-50">
                {appointment.review ? (
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-gray-700">
                      {appointment.review.comment}
                    </span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-4 w-4 ${i < appointment.review.rating
                            ? 'text-yellow-300 fill-yellow-400'
                            : 'text-gray-300'
                            }`}
                        />
                      ))}
                    </div>
                  </div>
                ) : appointment.status !== "cancelled" && (
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-700">
                      ¿Qué te pareció el servicio?
                    </p>
                    <AddReviewDialog appointment={appointment} />
                  </div>
                )}
              </div>
            )}
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="pt-4 mx-3">
          <div className="grid grid-cols-2 gap-6 text-sm text-gray-700">
            <div className="flex flex-col border-t border-gray-200 pt-2">
              <span className="text-gray-500">Seleccionaste:</span>
              {appointment.products.map((prod) => (
                <div key={prod.id} className="flex justify-between">
                  <span>{prod.name}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="space-y-1 border-t border-gray-200 pt-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Pagado ({appointment.payment_percentage}%):</span>
                  <Badge className="bg-lime-100 text-lime-600 border border-lime-200">
                    {formatCurrency(paidAmount)}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Pendiente:</span>
                  <Badge className="bg-red-100 text-red-600 border border-red-200">
                    {formatCurrency(remainingAmount)}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-6 pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-500">
              Solicitada: {formatDate(appointment.created_at)}
            </span>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

export default AppointmentCard
