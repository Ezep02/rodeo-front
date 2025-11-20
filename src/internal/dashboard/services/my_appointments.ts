import { AuthenticationInstance } from "@/configs/AxiosConfigs"
import { Booking } from "@/models/Appointment"

const APPOINTMENTS_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/appointment`

// Recuperar los appointments del usuario
export const getMyAppointment = async (id: number) => {
    let response = await AuthenticationInstance.get<Booking[] | []>(`${APPOINTMENTS_BASE_URL}/user/${id}`)
    return response.data
}

// Realizar reprogramacion de una cita
type RescheduleResponse = {
    requires_payment: boolean
    amount: number
    percentage: number
    init_point: string
    free: boolean
    reprogrammed: boolean
    message: string
}


export const setReschedule = async (booking_id: number, new_slot_id: number) => {
    if (!booking_id || !new_slot_id){
        return "algo no fue bien recuperando los ids"
    }

    let response = await AuthenticationInstance.post<RescheduleResponse>(`${APPOINTMENTS_BASE_URL}/user/reschedule`, {
        booking_id: booking_id,
        new_slot_id: new_slot_id
    })
    return response.data
}