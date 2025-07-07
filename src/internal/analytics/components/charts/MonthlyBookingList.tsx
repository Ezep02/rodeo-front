import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'
import React from 'react'
import { MonthBookingCount } from '../../models/Booking'

{/* Lista de meses */ }
type MonthlyBookingProps = {
    monthlyBookingData: MonthBookingCount[]
}

const MonthlyBookingList: React.FC<MonthlyBookingProps> = ({ monthlyBookingData }) => {

    // Función para formatear el mes
    const formatMonth = (monthStr: string) => {
        const [month, year] = monthStr.split("-")
        const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
        return `${monthNames[Number.parseInt(month) - 1]} ${year}`
    }

    return (
        <Card className="md:col-span-1 bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-colors">

            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-rose-500/20 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-rose-500" />
                    </div>
                    <div>
                        <CardTitle className="text-lg text-white">Citas por Mes</CardTitle>
                        <CardDescription className="text-gray-400">Detalle mensual de citas agendadas</CardDescription>
                    </div>
                </div>
            </CardHeader>


            <CardContent>
                <div className="space-y-3">
                    {monthlyBookingData.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className={`flex items-center justify-between p-4 rounded-lg border bg-gray-900/50 border-gray-800 hover:shadow-md transition-shadow`}
                            >


                                <div className="flex items-center gap-4">

                                    <div className="text-sm">
                                        <div className="font-semibold text-white">{formatMonth(item.month)}</div>
                                        <div className="text-gray-400">
                                            {item.total_appointments} {item.total_appointments === 1 ? "cita" : "citas"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>

    )
}

export default MonthlyBookingList
