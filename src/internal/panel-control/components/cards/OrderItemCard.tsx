import { Badge } from "@/components/ui/badge"
import { Clock, User } from "lucide-react"
import React from "react"
import { PendingOrder } from "../../models/OrderModel"
import { Card } from "@/components/ui/card"

type OrderItemProps = {
    OrderItem: PendingOrder
}

const OrderItemCard: React.FC<OrderItemProps> = ({ OrderItem }) => {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "approved":
                return <Badge className="bg-amber-500/20 text-amber-400 border border-amber-500/30">Pendiente</Badge>
            case "completada":
                return <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">Completada</Badge>
            case "canceled":
                return <Badge className="bg-red-500/20 text-red-400 border border-red-500/30">Cancelada</Badge>
            default:
                return <Badge className="bg-gray-500/20 text-gray-400 border border-gray-500/30">{status}</Badge>
        }
    }


    function CalculatePaymentPercentaje(percentaje: string, price: number): number {
        const percent = parseFloat(percentaje);
        if (isNaN(percent)) return price;
        return (percent / 100) * price;
    }

    return (
        <Card className="flex flex-col gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700 w-full">
            {/* Header: Fecha y Estado */}
            <div className="flex justify-between items-center text-sm text-gray-400">
                <span>
                    {new Date(OrderItem.schedule_day_date).toLocaleDateString("es-AR", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                    })}
                </span>
                {
                    OrderItem.mp_status === "canceled" ? getStatusBadge(OrderItem.mp_status) : new Date(OrderItem.schedule_day_date) < new Date() ? getStatusBadge("completada") : getStatusBadge("approved")
                }
            </div>

            {/* Contenido principal */}
            <div className="flex flex-col gap-4 w-full">
                {/* Info cliente + horario */}
                <div className="flex gap-3 items-start md:items-center flex-1">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center shrink-0">
                        <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="font-medium text-white text-base">
                            {OrderItem.payer_name}{" "}{OrderItem.payer_surname}
                        </h2>
                        <div className="flex items-center gap-1 text-sm text-zinc-200">
                            <Clock className="w-4 h-4" />
                            <span>{OrderItem.schedule_start_time}</span>
                        </div>
                    </div>
                </div>

                <div className="md:grid-cols-4 grid grid-cols-2">
                    {/* Servicio */}
                    <div className="flex flex-col justify-center text-sm text-gray-200 flex-1">
                        <p className="text-white">
                            Servicio seleccionado
                        </p>
                        <span className="text-amber-300">{OrderItem.title}</span>
                    </div>

                    <div className="flex flex-col justify-center text-sm text-gray-200 flex-1">
                        <p className="text-white">
                            Precio servicio
                        </p>
                        <span className="text-green-500 font-semibold">${OrderItem.total_service_price}</span>
                    </div>

                    <div className="flex flex-col justify-center text-sm text-gray-200 flex-1">
                        <p className="text-white">
                            Pago
                        </p>
                        <span className="text-green-500 font-semibold">${OrderItem.price}</span>
                    </div>

                    <div className="flex flex-col justify-center text-sm text-gray-200 flex-1">
                        <p className="text-white">
                            Debe
                        </p>
                        <span className="text-red-500 font-semibold">${CalculatePaymentPercentaje(String(OrderItem.payment_percentaje), OrderItem.total_service_price)}</span>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default OrderItemCard

