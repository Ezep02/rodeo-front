import { LineChart } from '@/components/charts/charts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'
import React from 'react'
import { CurrentYearMonthlyRevenue } from '../../models/analyticsModels'

type RevenueTrendProps = {
    currentYearMonthlyRevenue: CurrentYearMonthlyRevenue[] | []
}

const RevenueTrendSection: React.FC<RevenueTrendProps> = ({ currentYearMonthlyRevenue }) => {
    return (
        < Card className="md:col-span-1 bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors" >
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-rose-500/20 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-rose-500" />
                        </div>
                        <div className="">
                            <CardTitle className="text-xl font-bold text-white">Tendencia de Ingresos</CardTitle>
                            <CardDescription className='text-gray-400 text-sm'>Ingresos mensuales del año en curso</CardDescription>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                <div className="h-[300px] w-full">
                    {
                        currentYearMonthlyRevenue?.length > 0 ? (
                            <LineChart
                                Data={currentYearMonthlyRevenue}
                            />
                        ) : (
                            <div className="flex justify-center items-center h-full">
                                <p className="text-sm font-medium text-slate-500">
                                    Sin datos para mostrar
                                </p>
                            </div>
                        )
                    }
                </div>
            </CardContent>
        </Card >
    )
}

export default RevenueTrendSection
