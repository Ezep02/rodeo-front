import { AuthenticationInstance } from "@/configs/AxiosConfigs"
import { Booking, BookingWithPayment } from "@/models/Appointment"


const BOOKING_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/appointment`

// Traer el listado de appointments pendientes de aceptacion
export const allPendingPayment = async () => {
    let res = await AuthenticationInstance.get<BookingWithPayment[]>(`${BOOKING_BASE_URL}/all/pending-payment`)
    return res.data
}

// Aceptar cita del cliente
export const markAsAccepted = async (id: number) => {
    let res = await AuthenticationInstance.put(`${BOOKING_BASE_URL}/mark-as-accepted/${id}`)
    return res.data
}

// Rechazar cita del cliente
export const markAsRejected = async (id: number) => {
    let res = await AuthenticationInstance.put(`${BOOKING_BASE_URL}/mark-as-rejected/${id}`)
    return res.data
}
