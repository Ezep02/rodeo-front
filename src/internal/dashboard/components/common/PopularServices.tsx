import { Clock, Scissors } from 'lucide-react';
import React from 'react'
import { usePopularServices } from '../../hooks/usePopularServices';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PopularServices: React.FC = () => {
    const {
        popularServices
    } = usePopularServices()

    return (
        <section className="mb-10 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl -z-10"></div>

            <div className=" sm:px-6 py-10 rounded-3xl">
                <div className="flex sm:flex-row sm:justify-between mb-8 gap-1 flex-wrap ">
                    <div>
                        <h2 className="text-3xl font-bold flex items-center gap-3">
                            <Scissors className="sm:h-7 sm:w-7 hidden sm:block text-rose-500 " />
                            Servicios Destacados
                        </h2>
                        <p className='"text-sm text-zinc-500 dark:text-zinc-400"'>
                            Top servicios del mes
                        </p>
                    </div>
                    <div>
                        <Badge className="px-3 py-1 text-sm bg-rose-500 hover:bg-rose-600 text-center hidden sm:inline-flex">Lo más solicitado</Badge>
                    </div>
                </div>


                {/* Conditional rendering based on whether there are popular services */}
                {
                    Array.isArray(popularServices) && popularServices.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {popularServices?.sort((a, b) => b.total_avg - a.total_avg) // ordenar de mayor a menor
                                .map((popular_service, i) => {
                                    const podiumColors = ["bg-gradient-to-r from-cyan-400 to-blue-500", "bg-gradient-to-r from-amber-400 to-orange-500", "bg-gradient-to-r from-emerald-400 to-green-500"];
                                    const badgetColors = ["bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200", "bg-amber-50 text-amber-600 hover:bg-amber-100 border-amber-200", "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-emerald-200"]
                                    const priceColors = ["text-blue-600", "text-amber-600", "text-emerald-600"]
                                    return (
                                        <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
                                            <div className={`h-3 hover:shadow-sm transition-all border-gray-200 ${podiumColors[i]}`}></div>
                                            <CardHeader className="pb-2">
                                                <div className="flex sm:justify-between sm:items-center flex-wrap-reverse gap-2">
                                                    <CardTitle className="text-xl">{popular_service.title}</CardTitle>
                                                    <Badge variant="outline" className={`${badgetColors[i]}`}>
                                                        {popular_service.total_avg}% de clientes
                                                    </Badge>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="space-y-3">
                                                <div className="flex items-center gap-2 text-slate-500">
                                                    <Clock className="h-4 w-4" />
                                                    <span>40 minutos</span>
                                                </div>
                                                <p className="text-slate-600">
                                                    Corte moderno con degradado perfecto que se adapta a todos los tipos de cabello. Incluye lavado y
                                                    styling.
                                                </p>
                                            </CardContent>
                                            <CardFooter className="flex justify-between items-center pt-2 border-t">
                                                <span className={`${priceColors[i]} text-2xl font-bold `} >$4000</span>
                                            </CardFooter>
                                        </Card>
                                    );
                                })}
                        </div>
                    ) : (
                        <div className="py-16 flex flex-col items-center justify-center text-center">
                            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                                <Scissors className="h-12 w-12 text-slate-300" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-3 text-slate-700">Aún no hay servicios destacados</h3>
                            <p className="text-slate-500 max-w-md mb-8">
                                Los servicios más populares aparecerán aquí automáticamente a medida que tus clientes reserven y
                                disfruten de ellos.
                            </p>
                        </div>
                    )}
            </div>
        </section>
    )
}
export default PopularServices

