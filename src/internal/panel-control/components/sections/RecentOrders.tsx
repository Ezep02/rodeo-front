
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from 'lucide-react'
import { BsCart3 } from "react-icons/bs";

import React from 'react'
import { PendingOrder } from '../../models/OrderModel'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import OrderCard from '../common/OrderCard';
import { Button } from '@/components/ui/button';


type PendingOrderProps = {
    Data: PendingOrder[]
}

const RecentOrders: React.FC<PendingOrderProps> = ({ Data }) => {

    return (
        <Card className="sm:col-span-4 md:col-span-4 xl:col-span-4 col-span-1">
            <CardHeader className="pb-4">
                <div className="flex gap-2 justify-between sm:flex-row flex-col">
                    <div>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <Calendar className="h-6 w-6 text-rose-500" />
                            Ordenes Recientes
                        </CardTitle>
                        <CardDescription className="mt-1">Historial de citas pendientes y canceladas</CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                        <Select defaultValue="todas">
                            <SelectTrigger className="w-[120px] h-9">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="todas">Todas</SelectItem>
                                <SelectItem value="pendientes">Pendientes</SelectItem>
                                <SelectItem value="canceladas">Canceladas</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="px-0">
                <ul className="space-y-1">
                    {
                        Array.isArray(Data) && Data?.length > 0 ? (
                            <>
                                {
                                    Data.map((order, i) => (
                                        <OrderCard
                                            Order={order}
                                            key={i}
                                        />
                                    ))
                                }
                            </>
                        ) : (
                            <li
                                className='py-16 flex flex-col items-center justify-center text-center'
                            >
                                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                                    <BsCart3 className="h-12 w-12 text-slate-300" />
                                </div>
                                <h3 className="text-2xl font-semibold mb-3 text-slate-700">Aun no hay ordenes recientes</h3>
                                <p className="text-slate-500 max-w-md mb-8">
                                    Las ordenes mas recientes aparecerán aqui automaticamente a medida que tus clientes reserven.
                                </p>
                            </li>
                        )
                    }
                </ul>

                <div className="flex items-center justify-center mt-6 pt-4 border-t mx-6">
                    <Button variant="ghost" className="text-rose-500 hover:text-rose-600 hover:bg-rose-50">
                        Ver todas las ordenes
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default RecentOrders
