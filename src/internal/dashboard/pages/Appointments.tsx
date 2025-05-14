import React, { useContext, useState } from 'react'
import { useTurns } from '../hooks/useTurns'
import { DashboardContext } from '@/context/DashboardContext'
import { CustomerPendingOrder } from '../models/OrderModels'
import { Calendar, MapPin, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Reschedule from '../components/common/Reschedule'

const Appointments = () => {
  const {
    customerPendingOrders
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



  return (
    <>
      <section className="space-y-6">
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="px-6 pt-6">
            <h3 className="font-semibold tracking-tight text-lg">Próximas citas</h3>
            <p className="text-sm text-muted-foreground">Tus citas programadas para los próximos días</p>
          </div>

          {/* reprogramar programadas */}
          {
            isReschedulingOpen && selectedAppointment && (
              <Reschedule
                appointment={selectedAppointment}
              />
            )
          }

          {Array.isArray(customerPendingOrders) && customerPendingOrders?.length > 0 ? (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-black"></div>
                  <span className="text-sm font-medium">Citas programadas</span>
                </div>
              </div>

              <div>
                {customerPendingOrders.map((appointment) => (
                  <div key={appointment.ID} className="relative mb-8 last:mb-0">
                    <div className="flex items-start gap-6">
                      <div className="flex flex-1 flex-col space-y-3 rounded-xl border bg-card p-4 shadow-sm">
                        <div className="flex flex-col space-y-1.5">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>El Rodeo</span>
                          </div>

                          <div className="flex justify-between">
                            <div className="flex gap-2 justify-between w-full flex-col sm:flex-row">
                              <span className="font-semibold">{appointment.title}</span>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Abrir menú</span>
                                  </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end" className="w-[160px]">
                                  <DropdownMenuItem onClick={() => RescheduleOnClickHandler(appointment)}>Reprogramar</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">Cancelar cita</DropdownMenuItem>
                                </DropdownMenuContent>

                              </DropdownMenu>

                            </div>

                          </div>

                          <div className="text-sm">
                            <span className="rounded-md bg-rose-500 px-2 py-1 text-xs font-medium text-white">
                              {new Date(appointment.schedule_day_date).toLocaleDateString("es-AR", {
                                weekday: "long",
                                month: "long",
                                day: "2-digit",
                                year: "numeric"
                              })} , {appointment.schedule_start_time}{" "}HS
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">

                            {/* <div className="text-sm font-medium">{appointment.barber.name}</div> */}
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Calendar className="mr-1.5 h-3.5 w-3.5" />
                              Recordatorio
                            </Button>
                            <Button variant="default" size="sm">
                              Ver detalles
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-10 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <Calendar className="h-10 w-10 text-muted-foreground text-rose-500" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">No tienes citas programadas</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-md">
                Actualmente no tienes ninguna cita programada. Puedes reservar un dirigiendote a la pestaña de servicios
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Appointments