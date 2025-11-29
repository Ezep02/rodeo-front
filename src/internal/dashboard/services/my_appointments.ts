import { AuthenticationInstance } from "@/configs/AxiosConfigs"
import { Booking } from "@/models/Appointment"
import { CancelResponse, PaymentInfoResponse } from "../types/Booking"

const APPOINTMENTS_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/appointment`

// Recuperar los appointments del usuario
export const getMyAppointment = async (id: number) => {
    let response = await AuthenticationInstance.get<Booking[] | []>(`${APPOINTMENTS_BASE_URL}/user/${id}`)
    return response.data
}

// Realizar reprogramacion de una cita
export const setReschedule = async (booking_id: number, new_slot_id: number) => {
    if (!booking_id || !new_slot_id){
        return "algo no fue bien recuperando los ids"
    }

    let response = await AuthenticationInstance.post(`${APPOINTMENTS_BASE_URL}/user/reschedule`, {
        booking_id: booking_id,
        new_slot_id: new_slot_id
    })
    return response.data
}

// Obtener la informacion de las consecuencias de cancelar
export const getCancelationPreview = async (booking_id: number) => {
    let response = await AuthenticationInstance.get<CancelResponse>(`${APPOINTMENTS_BASE_URL}/user/cancel/verify/${booking_id}`)
    return response.data
}

// Realizar cancelacion de la cita
export const startCancelation = async (booking_id: number) => {
    let response = await AuthenticationInstance.put<CancelResponse>(`${APPOINTMENTS_BASE_URL}/user/cancel/${booking_id}`)
    return response.data
}

// Recuperar la informacion de pago de la reserva

export const getBookingPaymentInfo = async (booking_id: number) => {
    let response = await AuthenticationInstance.get<PaymentInfoResponse>(`${APPOINTMENTS_BASE_URL}/payment/${booking_id}`)
    return response.data
}