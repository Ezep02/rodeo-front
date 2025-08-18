import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { OcupationRate, WeeklyDayBooking } from '../../models/Booking'
import { TrendingUp } from 'lucide-react';

type WeeklyBookingProps = {
    analyticsData: WeeklyDayBooking[]
    ocupationRate: OcupationRate
}

const WeeklyBooking: React.FC<WeeklyBookingProps> = ({ analyticsData, ocupationRate }) => {
    const maxValue = Math.max(...analyticsData.map((d) => d.appointment_this_week))

    return (
        <Card className="md:col-span-2 bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-colors">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-rose-500/20 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-rose-500" />
                    </div>
                    <div>
                        <CardTitle className="text-xl text-white">Reservas semanales</CardTitle>
                        <CardDescription className="text-gray-400 text-sm">Resumen por semana del mes</CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="border-t border-gray-700 pt-4 mt-2">
                    {ocupationRate ? (
                        <div className="flex items-center justify-between bg-gray-800/60 rounded-lg px-4 py-3">
                            <div className="text-white text-sm">
                                <p className="font-semibold">{ocupationRate.month}</p>
                                <p className="text-gray-400 text-xs">Tasa de ocupación</p>
                            </div>
                            <div className="text-2xl font-bold text-white">
                                {ocupationRate.ocuppancy_percentage}%
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-400 text-sm">Sin datos de ocupación disponibles</p>
                    )}
                </div>

                {analyticsData.map((day, index) => (
                    <div key={index} className="space-y-1 px-2">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-zinc-200 font-medium">{day.week}</span>
                            <span className="text-sm text-gray-400">{day.appointment_this_week} reservas</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                            <div
                                className="bg-rose-500 h-2 rounded-full transition-all duration-300"
                                style={{
                                    width: `${(day.appointment_this_week / maxValue) * 100}%`,
                                }}
                            />
                        </div>
                    </div>
                ))}


            </CardContent>
        </Card>
    )
}

export default WeeklyBooking
