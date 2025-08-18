import { TrendingUp } from 'lucide-react'
import React from 'react'
import { formatTime } from '../../utils/TimeFormater'
import { TimeSlot } from '../../models/TimeSlot'

type CardProps = {
    sortedTimeSlots: TimeSlot[]
    totalBookings: number
}

const PopularSlotAnalytics: React.FC<CardProps> = ({ sortedTimeSlots, totalBookings }) => {
    return (
        <div className="p-4 rounded-lg  md:col-span-3 bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-colors">
            <h3 className="font-semibold mb-4 text-white flex items-center gap-2 text-base">
                <TrendingUp className="h-4 w-4 text-rose-500" />
                Análisis de horarios
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                <div className="space-y-1">
                    <p>
                        • <strong>Horario más temprano:</strong>{" "}
                        {sortedTimeSlots.length > 0 ? formatTime(sortedTimeSlots.sort((a, b) => a.time.localeCompare(b.time))[0]?.time || "") : "Sin datos"}
                    </p>
                    <p>
                        • <strong>Horario más tardío:</strong>{" "}
                        {sortedTimeSlots.length > 0 ? formatTime(sortedTimeSlots.sort((a, b) => b.time.localeCompare(a.time))[0]?.time || "") : "Sin datos"}
                    </p>
                </div>
                <div className="space-y-1">
                    <p>
                        • <strong>Promedio de reservas:</strong> {
                            sortedTimeSlots.length > 0 ? (

                                <span>
                                    {(totalBookings / sortedTimeSlots.length).toFixed(1)} por horario
                                </span>
                            ) : (
                                <span>
                                    Sin datos
                                </span>
                            )
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PopularSlotAnalytics
