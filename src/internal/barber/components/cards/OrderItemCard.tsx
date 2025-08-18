import React from 'react'
import { Appointment } from '../../models/Appointments'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { formatTime } from '@/internal/analytics/utils/TimeFormater'
import { Clock } from 'lucide-react'
import OrderDetailsModal from '../dialogs/OrderDetail'
import { getCurrentStatus, getPaymentStatus } from '../../../../utils/getAppointmentStatus'

interface AppointmentCardProps {
    appointment: Appointment
}

const ApptItemCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
    const totalPrice = appointment.products.reduce((sum, product) => sum + product.price, 0)

    const paidAmount = (totalPrice * appointment.payment_percentage) / 100
    const paymentStatus = getPaymentStatus(appointment.payment_percentage)
    const currentStatus = getCurrentStatus(appointment.status)

    return (
        <>
            <Card
                className="w-full rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 bg-zinc-900"
            >
                <CardContent className="p-4 space-y-4">
                    {/* Hora y cliente */}
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-zinc-400" />
                            <span className="text-sm text-zinc-200">
                                {formatTime(appointment.slot.time)}
                            </span>
                        </div>

                        <OrderDetailsModal
                            order={appointment}
                        />
                    </div>

                    {/* Cliente y pago */}
                    <div>
                        <h3 className="text-base font-semibold text-zinc-50">
                            {appointment.client_name}{" "}{appointment.client_surname}
                        </h3>
                        <p className="text-sm text-neutral-300">
                            ${paidAmount.toFixed(0)} / ${totalPrice.toFixed(0)}
                        </p>
                    </div>

                    {/* Tags de estado */}
                    <div className="flex gap-2">
                        <span
                            className={cn(
                                'text-xs px-2 py-0.5 rounded-full font-medium',
                                currentStatus.className
                            )}
                        >
                            {currentStatus.label}
                        </span>
                        <span
                            className={cn(
                                'text-xs px-2 py-0.5 rounded-full font-medium',
                                paymentStatus.className
                            )}
                        >
                            {paymentStatus.label}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default ApptItemCard