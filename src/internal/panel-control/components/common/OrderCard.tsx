

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import React from 'react'
import { PendingOrder } from '../../models/OrderModel'


type OrderCardProps = {
    Order: PendingOrder
}


const OrderCard: React.FC<OrderCardProps> = ({ Order }) => {

    // BORDER PENDIENTE: border-l-4 border-l-amber-400
    // BORDER CANCELADO: border-l-4 border-l-rose-400
    // BORDER COMPLETADO: border-l-slate-300

    const cardStatus: Array<string> = [
        "px-4 py-3 hover:bg-slate-50 border-l-4 border-l-4 border-l-amber-400",
        "px-4 py-3 hover:bg-slate-50 border-l-4 border-l-4 border-l-rose-400",
        "px-4 py-3 hover:bg-slate-50 border-l-4 border-l-slate-300"
    ]

    // BADGE PENDIENTE: bg-amber-50 text-amber-700 border-amber-200
    // BADGE CANCELADO: bg-rose-50 text-rose-700 border-rose-200
    // BADGE COMPLEADO: bg-slate-50 text-slate-700 border-slate-200
    const badgeStatus: Array<string> = [
        "bg-amber-50 text-amber-700 border-amber-200",
        "bg-rose-50 text-rose-700 border-rose-200",
        "bg-slate-50 text-slate-700 border-slate-200"
    ]

    const textStatus: Array<string> = [
        "Pendiente",
        "Cancelada",
        "Completada"
    ]

    const avatarStatus: Array<string> = [
        "bg-amber-200 text-amber-700 uppercase font-semibold",
        "bg-rose-100 text-rose-700 uppercase font-semibold",
        "bg-slate-100 text-slate-700 uppercase font-semibold"
    ]

    return (
        <div
            className={`${Order.mp_status.toUpperCase() === "CANCELED" ?
                cardStatus[1] : new Date(Order.schedule_day_date) < new Date() ?
                    cardStatus[0] : cardStatus[2]
                }`
            }>

            <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12 mt-1 ">
                    <AvatarFallback className={
                        `${Order.mp_status.toUpperCase() === "CANCELED" ?
                            avatarStatus[1] : new Date(Order.schedule_day_date) < new Date() ?
                                avatarStatus[0] : avatarStatus[2]}`
                    }>
                        {Order?.payer_name[0]}{Order?.payer_surname[0]}
                    </AvatarFallback>
                </Avatar>
                <div className="flex justify-between w-full flex-wrap">
                    
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-slate-900">María González</h4>
                            <Badge
                                variant="outline"
                                className={
                                    `${Order.mp_status.toUpperCase() === "CANCELED" ?
                                        badgeStatus[1] : new Date(Order.schedule_day_date) < new Date() ?
                                            badgeStatus[0] : badgeStatus[2]}`
                                }>
                                {
                                    Order.mp_status.toUpperCase() === "CANCELED" ?
                                        textStatus[1] : new Date(Order.schedule_day_date) < new Date() ?
                                            textStatus[0] : textStatus[2]
                                }
                            </Badge>
                        </div>
                        <p className="text-blue-600 font-medium text-sm mb-2">{Order.title}</p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-slate-900 font-medium text-sm">
                            {
                                new Date(Order.schedule_day_date).toLocaleDateString("es-AR", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric"
                                })
                            }
                        </p>
                        <p className="text-slate-500 text-xs">
                            {Order.schedule_start_time}{" "}AM
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default OrderCard
