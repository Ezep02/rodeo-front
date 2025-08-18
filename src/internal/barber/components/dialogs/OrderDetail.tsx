import React, { useState } from 'react'
import { Appointment } from '../../models/Appointments'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { FaArrowLeft } from 'react-icons/fa6'
import { IoTicketOutline } from 'react-icons/io5'
import { formatTime } from '@/internal/analytics/utils/TimeFormater'
import { Package } from 'lucide-react'
import { MdAccessTime } from "react-icons/md";
import { LuCalendarCheck2 } from 'react-icons/lu'
import AppointmentReminder from './AppointmentReminder'
import AppointmentCancelation from './AppointmentCancelation'
import { GoArrowUpRight } from 'react-icons/go'
import { getCurrentStatus } from '../../../../utils/getAppointmentStatus'
import { cn } from '@/lib/utils'
import { ValidateAppointmentTime } from '../../../../utils/appointmentTimeValidation'

interface OrderDetailsModalProps {
    order: Appointment | null
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
    order
}) => {
    if (!order) return null

    const totalPrice = order.products.reduce((sum, item) => sum + item.price, 0)
    const paidAmount = (totalPrice * order.payment_percentage) / 100
    const remainingAmount = totalPrice - paidAmount


    const [isOpen, setIsOpen] = useState<boolean>(false)
    const toggleDialog = () => setIsOpen(prev => !prev)


    const currentStatus = getCurrentStatus(order.status)



    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>

            <DialogTrigger asChild>
                <button
                    className="flex items-center gap-1 text-sm text-violet-200 hover:text-violet-100 transition"
                    onClick={toggleDialog}
                >
                    <GoArrowUpRight size={16} />
                    Ver
                </button>
            </DialogTrigger>

            <DialogContent className="
                w-full h-full max-w-full max-h-full p-6 bg-zinc-50 z-50 flex flex-col
                overflow-y-auto shadow-2xl md:rounded-3xl
                2xl:max-h-[90vh] 2xl:min-h-[80vh] 2xl:max-w-5xl
                xl:max-h-[90vh] xl:min-h-[80vh] xl:max-w-4xl
                lg:max-h-[90vh] lg:min-h-[85vh] lg:max-w-3xl
                md:max-h-[95vh] md:min-h-[80vh] md:max-w-2xl
                scroll-abrir-editar-tarjeta
            ">
                <DialogHeader className="mb-2 pt-1">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <button
                                className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition"
                                onClick={toggleDialog}
                            >
                                <FaArrowLeft size={18} className="text-zinc-700" />
                            </button>
                            <h1 className="text-lg font-semibold text-zinc-700">
                                Detalles de la cita #{order.id}
                            </h1>
                            <span
                                className={cn(
                                    'text-xs px-2 py-0.5 rounded-full font-medium',
                                    currentStatus.className
                                )}
                            >
                                {currentStatus.label}
                            </span>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-zinc-900 rounded-xl text-white">
                                <IoTicketOutline size={24} />
                            </div>
                            <div>
                                <DialogTitle className="text-lg font-semibold text-zinc-700 text-start">
                                    Información de la Cita
                                </DialogTitle>
                                <DialogDescription className="text-start text-zinc-600">
                                    Revisa todos los detalles de esta cita, incluyendo cliente, servicios y pagos.
                                </DialogDescription>
                            </div>
                        </div>
                    </div>
                </DialogHeader>

                <main className="flex flex-col gap-6 flex-grow">
                    <div className="flex flex-col bg-zinc-800 px-4 py-3 rounded-2xl">
                        <label className="text-sm text-zinc-300">Cliente</label>
                        <h3 className='text-zinc-50'>
                            {order.client_name} {order.client_surname}
                        </h3>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex flex-col gap-3 w-full md:w-1/2">
                            <span className="font-medium text-sm text-zinc-600">Datos generales</span>

                            <div className="bg-zinc-800 px-4 py-3 rounded-2xl text-white">
                                <label className="text-sm text-zinc-300">Barbero</label>
                                <p>{order.slot.barber.name}</p>
                            </div>

                            <div className="bg-zinc-800 px-4 py-3 rounded-2xl text-white flex flex-col gap-2">

                                <div>
                                    <label className="text-sm text-zinc-300">Total abonado</label>
                                    <p className="text-sm">${paidAmount.toFixed(2)} / ${totalPrice.toFixed(2)}</p>
                                </div>

                                <div>
                                    <label className="mt-2 text-sm text-zinc-300">Debe</label>
                                    <p
                                        className={`${order.payment_percentage < 100
                                            ? 'text-red-500 font-semibold'
                                            : 'text-green-500 font-semibold'
                                            }
                                        `}
                                    >
                                        ${remainingAmount.toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-zinc-800 px-4 py-3 rounded-2xl text-white">
                                <label className="text-sm text-zinc-300">Fecha de creación</label>
                                <p>
                                    {new Date(order.created_at).toLocaleDateString("es-AR", {
                                        day: "numeric", month: "numeric", year: "numeric"
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 w-full md:w-1/2">
                            <span className="font-medium text-sm text-zinc-600">Fecha y Hora</span>

                            <div className="bg-zinc-800 px-4 py-3 rounded-2xl text-white flex justify-between items-center">
                                <p>
                                    {new Date(order.slot.date).toLocaleDateString("es-AR", {
                                        day: "numeric", month: "numeric", year: "numeric"
                                    })}
                                </p>
                                <LuCalendarCheck2 />
                            </div>

                            <div className="bg-zinc-800 px-4 py-3 rounded-2xl text-white flex justify-between items-center">
                                <p>{formatTime(order.slot.time)}</p>
                                <MdAccessTime />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <span className="font-medium text-sm text-zinc-600">Servicios seleccionados</span>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-56 overflow-auto pr-1">
                            {order.products.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex items-center justify-between bg-gray-100 border border-zinc-200 px-4 py-3 rounded-xl shadow-sm"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 bg-rose-500 rounded-lg flex items-center justify-center">
                                            <Package className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-zinc-800">{product.name}</span>
                                            <span className="text-xs text-zinc-500">#{product.id}</span>
                                        </div>
                                    </div>
                                    <span className="font-medium text-green-600">${product.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>

                <DialogFooter>
                    {
                        (order.status !== "cancelled" && ValidateAppointmentTime(new Date(order.slot.date), order.slot.time)) && (
                            <>
                                <AppointmentCancelation appt={order} />
                                <AppointmentReminder Client={order.client_name} />
                            </>
                        )
                    }
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default OrderDetailsModal
