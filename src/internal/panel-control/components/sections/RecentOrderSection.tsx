import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar, ShoppingBag } from 'lucide-react'
import React from 'react'

import OrderItemCard from '../cards/OrderItemCard'
import { Appointment } from '../../models/Appointments'

type ComponentProps = {
    NextAppointment: Appointment[]
}

const RecentOrderSection: React.FC<ComponentProps> = ({ NextAppointment }) => {
    return (
        <Card className="bg-gray-900/50 border-gray-800 min-h-[60vh] lg:col-span-2">
            <div className="p-6">
                <div className="flex sm:flex-row sm:justify-between flex-col mb-6 gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-rose-500/20 rounded-lg flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-rose-500" />
                        </div>
                        <div className="">
                            <h2 className="text-sm sm:text-2xl font-bold text-white">Ordenes Recientes</h2>
                            <p className="text-gray-400 text-sm">Historial de citas pendientes y canceladas</p>
                        </div>
                    </div>

                    <Select defaultValue="todas">
                        <SelectTrigger className="w-[130px] bg-gray-800 border-gray-700 text-gray-300">
                            <SelectValue placeholder="Filtrar" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-gray-300">
                            <SelectItem value="todas">Todas</SelectItem>
                            <SelectItem value="pendientes">Pendientes</SelectItem>
                            <SelectItem value="completadas">Completadas</SelectItem>
                            <SelectItem value="canceladas">Canceladas</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {Array.isArray(NextAppointment) && NextAppointment?.length > 0 ? (
                    <div className="space-y-4">
                        {
                            NextAppointment.map((appt, i) => (
                                <OrderItemCard
                                    key={i}
                                    Item={appt}
                                />
                            ))
                        }
                    </div>
                ) : (
                    <div className="text-center py-12 space-y-4">
                        <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto">
                            <ShoppingBag className="w-10 h-10 text-gray-600" />
                        </div>
                        <h3 className="text-xl font-medium text-white">Aún no hay órdenes recientes</h3>
                        <p className="text-gray-400 max-w-md mx-auto">
                            Las órdenes más recientes aparecerán aquí automáticamente a medida que tus clientes reserven.
                        </p>
                    </div>
                )}
            </div>
        </Card>
    )
}

export default RecentOrderSection

