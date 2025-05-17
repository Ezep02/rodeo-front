import React, { startTransition, useContext, useState } from 'react'
import { useTurns } from '../hooks/useTurns'
import { DashboardContext } from '@/context/DashboardContext'
import { CustomerPendingOrder } from '../models/OrderModels'
import { Calendar, Check, Clock, Copy, Scissors, Ticket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Reschedule from '../components/common/Reschedule'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import useRefound from '../hooks/useRefound'
import { RefundFormatter } from '../helpers/refund_helpers'
import useCoupons from '@/internal/dashboard/hooks/useCoupons'

const Appointments: React.FC = () => {
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

  const [copied, setCopied] = useState(false)

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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

  const {
    availableCoupons
  } = useCoupons()

  console.log(availableCoupons)
  return (
    <>
      <section className='grid sm:grid-cols-2 gap-3'>
        {
          isReschedulingOpen && selectedAppointment && (
            <Reschedule
              appointment={selectedAppointment}
            />
          )
        }

        {/* PROXIMAS CITAS */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-rose-500" />
                Mis Citas
              </CardTitle>
            </div>
            <CardDescription>Historial y próximas citas en la barbería</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">

              <div>
                <h3 className="text-sm font-medium text-slate-500 mb-3">Proximas Citas</h3>
                <>
                  {
                    customerPendingOrders.map((appointment, i) => (
                      <Card
                        key={i}
                        className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <div className={`h-3 hover:shadow-sm transition-all border-gray-200 bg-gradient-to-r from-emerald-400 to-green-500 `}></div>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-xl">{appointment.title}</CardTitle>
                            <Badge variant="outline" className='bg-gradient-to-r from-emerald-400 to-green-500 text-white' >
                              Confirmada
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center gap-2 text-slate-500">
                            <Clock className="h-4 w-4" />
                            <span>40 minutos</span>
                          </div>

                          <div className="mt-4 flex items-center gap-4">
                            <div className="flex items-center gap-2 text-slate-700">
                              <Calendar className="h-4 w-4 text-rose-500" />

                              <span className="font-medium">{new Date(appointment.schedule_day_date).toLocaleDateString("es-AR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric"
                              })}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-700">
                              <Clock className="h-4 w-4 text-rose-500" />
                              <span className="font-medium">{appointment.schedule_start_time}{" "}AM</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center pt-2 border-t">
                          <div className="flex justify-end gap-2 mt-4">

                            <Button
                              variant="outline" size="sm" className="gap-2"
                              onClick={() => RescheduleOnClickHandler(appointment)}
                            >
                              <Calendar className="h-4 w-4" />
                              Reprogramar
                            </Button>

                            <Button
                              variant="destructive" size="sm"
                              onClick={() => CreateRefound(appointment)}
                            >
                              Cancelar
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>

                    ))
                  }
                </>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-500 mb-3">Historial de Citas</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                              <Scissors className="h-5 w-5 text-slate-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">Corte + arreglo de barba</h4>
                              <p className="text-sm text-slate-500">Con Carlos Rodríguez</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{`${5 - i} de Mayo, 2025`}</p>
                            <p className="text-sm text-slate-500">11:00 AM (60 min)</p>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                          <Button variant="outline" size="sm">
                            Agregar reseña
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="ghost" className="text-rose-500 hover:text-rose-600 hover:bg-rose-50">
              Ver Historial Completo
            </Button>
          </CardFooter>
        </Card >


        {/* Cupones Tab */}
        < Card >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ticket className="h-5 w-5 text-rose-500" />
              Mis Cupones
            </CardTitle>
            <CardDescription>Cupones activos y disponibles para usar en tu próxima cita</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-medium text-slate-500 mb-3">Cupones Activos</h3>
                <div className="space-y-4">

                  {

                    Array.isArray(availableCoupons) && availableCoupons.length > 0 ? (
                      <>
                        {
                          availableCoupons.map((coupon, i) => (
                            <Card 
                              className="overflow-hidden"
                              key={i}
                            >
                              <div className="bg-gradient-to-r from-rose-500 to-rose-600 h-2"></div>
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h4 className="font-medium text-lg">{coupon.discount_percent}% de Descuento</h4>
                                    <p className="text-sm text-slate-500">Válido hasta 30 Abr 2025</p>
                                  </div>

                                  <Button variant="outline" size="sm" className="h-8 gap-1" onClick={() => copyToClipboard("AZ345FG")}>
                                    {copied ? (
                                      <>
                                        <Check className="h-3.5 w-3.5" />
                                        <span>Copiado</span>
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="h-3.5 w-3.5" />
                                        <span>Copiar</span>
                                      </>
                                    )}
                                  </Button>
                                </div>
                              </CardContent>
                              <CardFooter className="flex  items-center pt-2 border-t">
                                <Badge className="bg-zinc-900">#AZ345FG</Badge>
                              </CardFooter>
                            </Card>
                          ))
                        }
                      </>
                    ) : (
                      <p>
                        nada
                      </p>
                    )
                  }
                </div>
              </div>
            </div>
          </CardContent>
        </Card >
      </section >

    </>
  )
}

export default Appointments