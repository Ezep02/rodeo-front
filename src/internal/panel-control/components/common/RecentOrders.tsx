import Avatar from '@/components/common/Avatar'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from 'lucide-react'
import React from 'react'
import { PendingOrder } from '../../models/OrderModel'

type PendingOrderProps = {
    Data: PendingOrder[]
}

const RecentOrders: React.FC<PendingOrderProps> = ({ Data }) => {

    return (
        <Card className="md:col-span-1">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-rose-500" />
                    Ordenes Recientes
                </CardTitle>
                <CardDescription>Historial de citas pendientes</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
                <ul className='space-y-0 overflow-y-scroll overflow-hidden'>
                    {
                        Data.map((order) => (
                            <li
                                key={order.ID}
                                className='flex items-center justify-between px-6 py-3 hover:bg-slate-50 transition-colors'
                            >
                                <div className="flex items-center gap-3">
                                    <Avatar name={order.payer_name} bg='bg-zinc-900' />
                                    <div>
                                        <p className="text-sm font-medium">{order.payer_name}{" "}{order.payer_surname}</p>
                                        <p className="text-xs text-slate-500">{order.title}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm">
                                        {
                                            new Date(order.schedule_day_date).toLocaleDateString("es-AR", {
                                                day: "numeric",
                                                month: "short",
                                                year: "2-digit"
                                            })
                                        }
                                    </p>
                                    <p className="text-xs text-slate-500">{order.schedule_start_time} PM</p>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </CardContent>
        </Card>
    )
}

export default RecentOrders
