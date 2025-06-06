import React from 'react'
import { CustomerPendingOrder } from '../../models/OrderModels'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, CheckCircle, Clock, MapPin, RotateCcw, Scissors, X } from 'lucide-react'

type NextAppointmentCardProps = {
    Appointment: CustomerPendingOrder
    RescheduleOnClickHandler: (appointment: CustomerPendingOrder) => void
    CreateRefound: (appointment: CustomerPendingOrder) => void
}

const NextAppointmentCard: React.FC<NextAppointmentCardProps> = ({ Appointment, RescheduleOnClickHandler, CreateRefound }) => {
    return (
        < Card className="mb-12 overflow-hidden bg-gradient-to-r from-rose-500 to-rose-600 border-none" >
            <div className="p-8 ">
                <Badge className="bg-white/20 text-white border-white/30">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Confirmada
                </Badge>
                <div className="flex  gap-3 mb-6 mt-2">

                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                            <Scissors className="w-6 h-6 text-white" />
                        </div>
                    </div>

                    <div>
                        <h2 className="sm:text-2xl  font-bold text-white">Próxima cita</h2>
                        <p className="text-rose-100 text-sm">Información de tu próxima visita</p>
                    </div>

                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div>
                            <p className="text-rose-100 text-sm mb-1">Servicio</p>
                            <p className="text-2xl font-bold text-white">{Appointment.title}</p>
                        </div>

                        <div className="flex items-center gap-6">
                            <div>
                                <p className="text-rose-100 text-sm mb-1">Fecha</p>
                                <div className="flex items-center gap-2 text-white">
                                    <Calendar className="w-4 h-4" />
                                    <span className="font-semibold">{new Date(Appointment.schedule_day_date).toLocaleDateString("es-AR", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric"
                                    })}</span>
                                </div>
                            </div>

                            <div>
                                <p className="text-rose-100 text-sm mb-1">Hora</p>
                                <div className="flex items-center gap-2 text-white">
                                    <Clock className="w-4 h-4" />
                                    <span className="font-semibold">{Appointment.schedule_start_time}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className="text-rose-100 text-sm mb-1">Ubicación</p>
                            <div className="flex items-center gap-2 text-white">
                                <MapPin className="w-4 h-4" />
                                <span>Av. 29, Calle 48</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <p className="text-rose-100 text-sm mb-1">Precio</p>
                            <p className="text-2xl font-bold text-white">{Appointment.price}</p>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button className=""
                                onClick={() => RescheduleOnClickHandler(Appointment)}
                            >
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Reprogramar
                            </Button>
                            <Button
                                onClick={() => CreateRefound(Appointment)}
                            >
                                <X className="w-4 h-4 mr-2" />
                                Cancelar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Card >
    )
}

export default NextAppointmentCard
