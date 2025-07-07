import { Calendar, ChevronDown, ChevronRight, Clock, CreditCard, Package, User } from "lucide-react"
import React, { useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Appointment } from "../../models/Appointments"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"


type OrderItemProps = {
    Item: Appointment
}

const OrderItemCard: React.FC<OrderItemProps> = ({ Item }) => {

    const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set())

    const toggleExpanded = (id: number) => {
        const newExpanded = new Set(expandedItems)
        if (newExpanded.has(id)) {
            newExpanded.delete(id)
        } else {
            newExpanded.add(id)
        }
        setExpandedItems(newExpanded)
    }

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleString("es-ES", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("es-ES", {
            style: "currency",
            currency: "ARS",
        }).format(amount)
    }

    const calculateTotals = (Item: Appointment) => {
        const totalPrice = Item.products.reduce((sum, product) => sum + product.price, 0)
        const paidAmount = (totalPrice * Item.payment_percentage) / 100
        const remainingAmount = totalPrice - paidAmount
        return { totalPrice, paidAmount, remainingAmount }
    }

    const getPaymentStatus = (time: Date) => {
        let now = new Date()

        if (now <= new Date(time))
            return {
                label: "Pendiente",
                variant: "destructive" as const,
                color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
            }
        if (now >= new Date(time))
            return {
                label: "Completado",
                variant: "default" as const,
                color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
            }
        return {
            label: "En Progreso",
            variant: "secondary" as const,
            color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
        }
    }

    const getInitials = (name: string, surname: string) => {
        return `${name.charAt(0)}${surname.charAt(0)}`.toUpperCase()
    }

    const getAvatarColor = (id: number) => {
        const colors = [
            "bg-red-500",
            "bg-blue-500",
            "bg-green-500",
            "bg-amber-500",
            "bg-purple-500",
            "bg-pink-500",
            "bg-indigo-500",
            "bg-orange-500",
        ]
        return colors[id % colors.length]
    }

    const { paidAmount, remainingAmount } = calculateTotals(Item)
    const paymentStatus = getPaymentStatus(Item.slot.date)
    const isExpanded = expandedItems.has(Item.id)
    const mainService = Item.products[0]?.name || "Sin servicios"
    const additionalServices = Item.products.length > 1 ? Item.products.length - 1 : 0

    return (
        <Card
            key={Item.id}
            className="border bg-gray-900/50 border-gray-800 hover:shadow-md transition-shadow"
        >
            <CardContent className="p-0">
                <Collapsible>
                    <CollapsibleTrigger asChild>
                        <div
                            className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 cursor-pointer dark:hover:bg-slate-800/50 transition-colors"
                            onClick={() => toggleExpanded(Item.id)}
                        >
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                                <Avatar className={`h-12 w-12 ${getAvatarColor(Item.id)}`}>
                                    <AvatarFallback className="text-zinc-900 font-medium">
                                        {getInitials(Item.client_name, Item.client_surname)}
                                    </AvatarFallback>
                                </Avatar>
                            </div>

                            {/* Info principal */}
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <h3 className="font-semibold text-zinc-50">
                                        {Item.client_name}{" "}{Item.client_surname}
                                    </h3>
                                    <span className="text-xs text-zinc-400 dark:text-slate-400">#{Item.id}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row flex-wrap gap-1 sm:gap-4 text-sm text-zinc-300">
                                    <span className="flex items-center gap-1">
                                        <Package className="h-3 w-3 text-rose-500" />
                                        {mainService}
                                        {additionalServices > 0 && (
                                            <span className="text-xs">+{additionalServices} más</span>
                                        )}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3 text-rose-500" />
                                        {formatDate(Item.slot.date)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3 text-rose-500" />
                                        {Item.slot.time}
                                    </span>
                                </div>
                            </div>

                            {/* Estado de pago + ícono */}
                            <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 sm:gap-3">
                                <Badge className={paymentStatus.color}>{paymentStatus.label}</Badge>
                                {isExpanded ? (
                                    <ChevronDown className="h-4 w-4 text-slate-400" />
                                ) : (
                                    <ChevronRight className="h-4 w-4 text-slate-400" />
                                )}
                            </div>
                        </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                        <div className="px-6 pb-6 pt-4 bg-gray-900/60 border-t border-gray-800 rounded-b-xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Información del Cliente */}
                                <div className="space-y-4">
                                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <User className="h-4 w-4 text-rose-500" />
                                        Información del Cliente
                                    </h4>
                                    <div className="space-y-2 text-sm text-slate-300">
                                        <div className="flex justify-between border-b border-gray-700 pb-1">
                                            <span className="text-slate-400">Nombre completo:</span>
                                            <span>{Item.client_name} {Item.client_surname}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-gray-700 pb-1">
                                            <span className="text-slate-400">Teléfono:</span>
                                            <span className="text-slate-100">{/* Teléfono aquí */}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Email:</span>
                                            <span className="text-slate-100">{/* Email aquí */}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Información de Pago */}
                                <div className="space-y-4">
                                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <CreditCard className="h-4 w-4 text-rose-500" />
                                        Detalles de Pago
                                    </h4>
                                    <div className="space-y-2 text-sm text-slate-300">
                                        <span className="text-xs uppercase font-semibold tracking-wide text-slate-400">
                                            Servicios
                                        </span>
                                        {Item.products.map((product) => (
                                            <div key={product.id} className="flex justify-between">
                                                <span>{product.name}</span>
                                                <span className="text-green-400 font-medium">
                                                    {formatCurrency(product.price)}
                                                </span>
                                            </div>
                                        ))}
                                        <div className="flex justify-between border-t border-gray-700 pt-3">
                                            <span className="text-slate-400">Pagado ({Item.payment_percentage}%):</span>
                                            <span className="font-semibold text-green-400">
                                                {formatCurrency(paidAmount)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Pendiente:</span>
                                            <span className="font-semibold text-orange-400">
                                                {formatCurrency(remainingAmount)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Acciones */}
                            <div className="flex gap-2 mt-8 pt-4 border-t border-gray-700">
                                <Button size="sm" variant="outline" className="text-zinc-900 border-gray-600">
                                    Editar Cita
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-red-500 border-gray-600 hover:text-red-600"
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </CardContent>
        </Card>
    )
}

export default OrderItemCard

