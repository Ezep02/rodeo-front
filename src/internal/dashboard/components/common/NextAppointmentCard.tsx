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
        < Card className="mb-12 overflow-hidden bg-gray-900/50 border-gray-800 relative" >
            {/* Subtle accent border */}
            < div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-purple-500" />

            <div className="p-8">
                <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-rose-500/20 rounded-2xl flex items-center justify-center">
                            <Scissors className="w-8 h-8 text-rose-500" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-2xl font-bold text-white">Próxima Cita</h2>
                                <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Confirmada
                                </Badge>
                            </div>
                            <p className="text-gray-400">Información de tu próxima visita</p>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                    {/* Service Details */}
                    <div className="space-y-6">
                        <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                            <h3 className="text-lg font-semibold text-white mb-4">Detalles del Servicio</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-gray-400 text-sm mb-1">Servicio</p>
                                    <p className="text-2xl font-bold text-rose-500">{Appointment.title}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-gray-400 text-sm mb-1">Fecha</p>
                                        <div className="flex items-center gap-2 text-white">
                                            <Calendar className="w-4 h-4 text-rose-500" />
                                            <span className="font-semibold">{new Date(Appointment.schedule_day_date).toLocaleDateString("es-AR", {
                                                day: "numeric", month: "narrow", year: "numeric"
                                            })}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-gray-400 text-sm mb-1">Hora</p>
                                        <div className="flex items-center gap-2 text-white">
                                            <Clock className="w-4 h-4 text-rose-500" />
                                            <span className="font-semibold">{Appointment.schedule_start_time}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Barbero and Price */}
                    <div className="space-y-6">
                        <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                            <h3 className="text-lg font-semibold text-white mb-4">Información Adicional</h3>
                            <div className="space-y-3">

                                <div>
                                    <p className="text-gray-400 text-sm mb-1">Precio Total</p>
                                    <p className="text-3xl font-bold text-green-500">${6000}</p>
                                </div>

                                <div>
                                    <p className="text-gray-400 text-sm mb-1">Ubicación</p>
                                    <div className="flex items-center gap-2 text-white">
                                        <MapPin className="w-4 h-4 text-rose-500" />
                                        <span>Av. 29, Calle 48</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8 pt-6 border-t border-gray-800">
                    
                    <Button className=""
                        onClick={() => RescheduleOnClickHandler(Appointment)}
                    >
                        <RotateCcw className="w-4 h-4" />
                        Reprogramar
                    </Button>
                    <Button
                        onClick={() => CreateRefound(Appointment)}
                    >
                        <X className="w-4 h-4" />
                        Cancelar
                    </Button>
                </div>
            </div>
        </Card >
    )
}

export default NextAppointmentCard
