import { AuthenticationInstance } from "@/configs/AxiosConfigs"
import { Booking } from "@/models/Appointment"


const BOOKING_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/appointment`

// Traer el listado de appointments pendientes de aceptacion
export const allPendingPayment = async () => {
    let res = await AuthenticationInstance.get<Booking[]>(`${BOOKING_BASE_URL}/all/pending-payment`)
    return res.data
}
