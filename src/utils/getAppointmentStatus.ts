import { AppointmentStatus } from "@/types/ApptFilter"

export const getCurrentStatus = (status: string) => {
    if (status === 'active') {
        return {
            label: 'Activo',
            className: 'bg-violet-200 text-violet-900',
        }
    }
    if (status === 'cancelled') {
        return {
            label: 'Cancelado',
            className: 'bg-rose-200 text-rose-800',
        }
    }
    if (status === 'updated') {
        return {
            label: 'Reprogramado',
            className: 'bg-yellow-100 text-yellow-800',
        }
    }
    return {
        label: 'Sin estado',
        className: 'bg-zinc-300 text-zinc-700',
    }
}


export const getPaymentStatus = (payment_percentage: number) => {
    if (payment_percentage === 100) {
        return {
            label: 'Pagado',
            className: 'bg-emerald-100 text-emerald-700',
        }
    }
    if (payment_percentage > 0) {
        return {
            label: 'Pago parcial',
            className: 'bg-yellow-100 text-yellow-800',
        }
    }
    return {
        label: 'No pagado',
        className: 'bg-rose-200 text-rose-800',
    }
}

// Devolver el estado del budget dependiendo el tipo de pago realizado
export const getPaymentStatusByType = (payment_status: "total" | "parcial") => {
    if (payment_status == "total") {
        return {
            label: 'Pago total',
            className: 'bg-emerald-100 text-emerald-700',
        }
    }
    if (payment_status == "parcial") {
        return {
            label: 'Pago parcial',
            className: 'bg-yellow-100 text-yellow-800',
        }
    }
    return {
        label: 'No pagado',
        className: 'bg-rose-200 text-rose-800',
    }
}

// TODO: funcion para obtener el estado de a cita 
export const getBookingStatus = (booking_status: AppointmentStatus) => {

    switch (booking_status) {
        case "completado":
            return {
                label: 'Completado',
            }
        case "confirmado":
            return {
                label: "Confirmado"
            }
        case "pendiente_pago":
            return {
                label: "Pago pendiente"
            }
        case "rechazado": 
            return {
                label: "Rechazado"
            }
        case "reprogramado": 
            return {
                label: "Reprogramado"
            }
        case "cancelado":
            return {
                label: "Cancelado"
            }
        default:
            return {
                label: "Sin estado"
            }
    }
}
