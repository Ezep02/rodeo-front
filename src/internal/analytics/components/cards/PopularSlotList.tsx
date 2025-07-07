import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, Users } from 'lucide-react'
import React from 'react'
import { TimeSlot } from '../../models/TimeSlot'
import { formatTime } from '../../utils/TimeFormater'
import { Badge } from '@/components/ui/badge'

type PopularSlotListProps = {
    sortedTimeSlots: TimeSlot[]
    maxBookings: number
    totalBookings: number
}

const PopularSlotList: React.FC<PopularSlotListProps> = ({ sortedTimeSlots, maxBookings, totalBookings }) => {

    const getPopularityLevel = (bookings: number, maxBookings: number) => {
        const percentage = (bookings / maxBookings) * 100
        if (percentage >= 80) return { level: "high", label: "Muy Popular", color: "bg-red-100 text-red-800 border-red-200" }
        if (percentage >= 50)
            return { level: "medium", label: "Popular", color: "bg-orange-100 text-orange-800 border-orange-200" }
        return { level: "low", label: "Moderado", color: "bg-green-100 text-green-800 border-green-200" }
    }


    return (
        <Card className='md:col-span-3 col-span-1 max-h-[70vh] overflow-hidden overflow-y-scroll scroll-abrir-tarjeta bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-colors'>

            <CardHeader className="flex items-start gap-4">

                <div className="flex items-center gap-3">

                    <div className="w-10 h-10 bg-rose-500/20 rounded-lg flex items-center justify-center">
                        <Clock className="w-5 h-5 text-rose-500" />
                    </div>
                    <div>
                        <CardTitle className="text-xl text-white">Lista de Horarios Populares</CardTitle>
                        <CardDescription className="text-gray-400 text-sm">Ordenados por número de reservas y hora</CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <div className="space-y-3">
                    {
                        sortedTimeSlots.length > 0 ? (
                            <>
                                {sortedTimeSlots.map((slot, index) => {
                                    const popularity = getPopularityLevel(slot.bookings, maxBookings)

                                    return (
                                        <div
                                            key={`${slot.time}-${index}`}
                                            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border bg-gray-900/50 border-gray-800 hover:shadow-md transition-shadow"
                                        >
                                            <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                                                <div className="flex items-center justify-center w-8 h-8 rounded-full text-zinc-50 font-semibold text-sm">
                                                    {index + 1}
                                                </div>

                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4 text-rose-500" />
                                                        <span className="font-semibold text-lg text-white truncate">
                                                            {formatTime(slot.time)}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-300 truncate">Hora: {slot.time}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start sm:items-center gap-4 mt-3 sm:mt-0 flex-wrap sm:flex-nowrap">
                                                <div className="text-right text-white">
                                                    <div className="flex items-center gap-2 justify-end">
                                                        <Users className="h-4 w-4 text-gray-400" />
                                                        <span className="font-semibold">
                                                            {slot.bookings} {slot.bookings === 1 ? "reserva" : "reservas"}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-300">
                                                        {((slot.bookings / totalBookings) * 100).toFixed(1)}% del total
                                                    </p>
                                                </div>

                                                <Badge variant="outline" className={`${popularity.color} whitespace-nowrap`}>
                                                    {popularity.label}
                                                </Badge>
                                            </div>
                                        </div>
                                    )
                                })}
                            </>
                        ) : (
                            <div className='flex justify-center p-16 items-center'>
                                <p className='text-sm text-gray-300'>
                                    Sin datos para mostrar
                                </p>
                            </div>
                        )
                    }


                </div>
            </CardContent>

        </Card>
    )
}

export default PopularSlotList
