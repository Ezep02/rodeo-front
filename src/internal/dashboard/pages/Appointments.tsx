import React, { startTransition, useContext, useState } from 'react'
import { useTurns } from '../hooks/useTurns'
import { DashboardContext } from '@/context/DashboardContext'
import { CustomerPendingOrder } from '../models/OrderModels'
import { Calendar, History, Star, User } from 'lucide-react'
import Reschedule from '../components/common/Reschedule'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import useRefound from '../hooks/useRefound'
import { RefundFormatter } from '../helpers/refund_helpers'
import NextAppointmentCard from '../components/common/NextAppointmentCard'
import AllPendingOrders from '../components/common/dialogs/AllPendingOrders'
import AppointmentsHeader from '../components/common/headers/AppointmentsHeader'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import AddReviewDialog from '../components/common/AddReviewDialog'

const Appointments: React.FC = () => {
  const {
    customerPendingOrders,
    customerOrderHistorial
  } = useTurns()

  const {
    isReschedulingOpen,
    handleReschedule,

  } = useContext(DashboardContext)!

  const [selectedAppointment, setSelectedAppointment] = useState<CustomerPendingOrder>()

  const RescheduleOnClickHandler = (appointment: CustomerPendingOrder) => {
    // Add selected pending order and open reschedule component
    setSelectedAppointment(appointment)
    handleReschedule()
  }

  const {
    refundingAction
  } = useRefound()

  const CreateRefound = (appointment: CustomerPendingOrder) => {
    let parsed_refund = RefundFormatter(appointment, 'reembolso')

    startTransition(() => {
      refundingAction(parsed_refund)
    });
  }

  return (
    <div className="pt-24 pb-16 sm:px-6">

      <div className="container mx-auto max-w-4xl">
        <AppointmentsHeader />

        {
          Array.isArray(customerPendingOrders) && customerPendingOrders.length > 0 ? (
            <>
              {/* Abre el historial de proximas citas pendientes, en el caso de que haya */}
              <AllPendingOrders
                customerPendingOrders={customerPendingOrders}
              />

              {/* Pop up de reprogramacion de cita */}
              {
                isReschedulingOpen && selectedAppointment && (
                  <Reschedule
                    appointment={selectedAppointment}
                  />
                )
              }
              {/* Proxima orden a concretarse */}
              <NextAppointmentCard
                Appointment={customerPendingOrders[0]}
                CreateRefound={CreateRefound}
                RescheduleOnClickHandler={RescheduleOnClickHandler}
              />
            </>
          ) : (
            <div className="text-center py-8 text-slate-500">
              {/* Mensaje cuando no hay más citas pendientes */}
              <Calendar className="h-12 w-12 mx-auto mb-3 text-slate-300" />
              <p>No tienes citas pendientes</p>
              <a
                href="/"
                className="mt-2 inline-block text-sm font-semibold text-rose-500 hover:text-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 transition-colors"
              >
                Programar nueva cita
              </a>
            </div>
          )
        }

        {/* Historial de Citas */}
        <Card className="bg-gray-900/50 border-gray-800">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-rose-500/20 rounded-lg flex items-center justify-center">
                <History className="w-5 h-5 text-rose-500" />
              </div>
              <h2 className="text-2xl font-bold text-white">Historial de Citas</h2>
            </div>

            <div className="space-y-4">
              {
                Array.isArray(customerOrderHistorial) && customerOrderHistorial.length > 0 ? (
                  <>
                    {
                      customerOrderHistorial.map((appointment) => (
                        <Card
                          key={appointment.ID}
                          className="bg-gray-800/50 border-gray-700 hover:border-rose-500/30 transition-colors"
                        >
                          <div className="p-6">

                            <div className='flex justify-end'>
                              <Badge variant="outline" className="border-rose-500/30 text-rose-400 mb-2">
                                {appointment.title}
                              </Badge>
                            </div>

                            <div className="flex items-start justify-between">
                              <div className="flex gap-4">
                                <Avatar className="border border-gray-600">
                                  <AvatarFallback className="bg-gray-700 text-gray-300">
                                    <User className="w-4 h-4" />
                                  </AvatarFallback>
                                </Avatar>

                                <div className="flex-1">
                                  <div className="flex items-center flex-col mb-2">
                                    <h3 className="text-white font-semibold">{appointment.payer_name}{" "}{appointment.payer_surname}</h3>
                                    <span className="text-gray-400 text-sm">
                                      {new Date(appointment.schedule_day_date).toLocaleDateString("es-AR", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric"
                                      })}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className='px-6'>
                            <div className="flex items-center gap-1 mb-2">
                              {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < appointment.rating ? "fill-rose-500 text-rose-500" : "text-gray-600"}`}
                                  />
                                ))}
                            </div>

                            <div className='pb-3'>
                              <p className="text-gray-300">{appointment.comment}</p>
                            </div>
                            {
                              !appointment.review_status ? (
                                <AddReviewDialog
                                  previousOrder={appointment}
                                />
                              ) : null
                            }
                          </div>
                        </Card>
                      ))
                    }
                  </>
                ) : (
                  <div className='p-2'>
                    <p className='text-zinc-50'>Al parecer tu historial de ordenes esta vacio</p>
                  </div>
                )
              }
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
export default Appointments
