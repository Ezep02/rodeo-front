import { PieChart } from '@/components/charts/charts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import PopularServiceCard from '../common/PopularServiceCard'
import { MonthlyPopularServices } from '../../models/analyticsModels'
import { FaRegStar } from 'react-icons/fa6'

{/* Popular Services */ }
type PopularServices = {
    monthlyPopularServices: MonthlyPopularServices[] | []
}

const PopularServicesSection: React.FC<PopularServices> = ({ monthlyPopularServices }) => {
    return (
        <Card className='bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors'>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-rose-500/20 rounded-lg flex items-center justify-center">
                          
                            <FaRegStar className="w-5 h-5 text-rose-500" />
                        </div>
                        <div className="">
                            <CardTitle className="text-xl font-bold text-white">Servicios Populares</CardTitle>
                            <CardDescription className="text-gray-400 text-sm">Top servicios del mes</CardDescription>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="grid md:grid-cols-2 grid-cols-1 gap-6">
                <div className="space-y-4">
                    {
                        Array.isArray(monthlyPopularServices) && monthlyPopularServices.length > 0 ? (
                            <>
                                {
                                    monthlyPopularServices.map((srv, indx) => {
                                        const progressBarColors = ["bg-blue-500", "bg-rose-500", "bg-amber-500"]
                                        return (
                                            <PopularServiceCard
                                                key={indx}
                                                service_count={srv.Service_count}
                                                service_name={srv.Service_name}
                                                progress_bar={<div className={`h-full rounded-full  ${progressBarColors[indx]}`} style={{ width: 50 - indx }}></div>}
                                            />
                                        )
                                    })
                                }
                            </>
                        ) : (
                            <div className="flex justify-center items-center h-full">
                                <p className="text-sm font-medium text-slate-500">
                                    Sin datos para mostrar
                                </p>
                            </div>
                        )
                    }
                </div>

                <div>
                    <div className="h-[150px] w-full">
                        {

                            Array.isArray(monthlyPopularServices) && monthlyPopularServices.length > 0 ? (
                                <>
                                    <PieChart
                                        Data={monthlyPopularServices}
                                    />
                                </>
                            ) : (
                                <div className="flex justify-center items-center h-full">
                                    <p className="text-sm font-medium text-slate-500">
                                        Sin datos para mostrar
                                    </p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </CardContent>
        </Card >
    )
}

export default PopularServicesSection
