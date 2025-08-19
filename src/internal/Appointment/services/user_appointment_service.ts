import { AuthenticationInstance } from "@/configs/AxiosConfigs"
import { Appointment } from "../../Appointment/models/Appointment"


const APPOINTMENT_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/appointments`


type GetAppoinmentsReq = {
    appointments: Appointment[]
}

// Obtener ordenes pendientes
export const GetAppoinments = async (user_id: number) => {
    const response = await AuthenticationInstance.get<GetAppoinmentsReq>(`${APPOINTMENT_URL}/user/${user_id}`)
    return response.data.appointments
}

// Cancelar una orden 
export const DeleteAppointment = async (appt_id: number, recharge: number, expireAt: Date) => {
    const response = await AuthenticationInstance.post(`${APPOINTMENT_URL}/cancel/${appt_id}`, {
        recharge,
        expire_at: expireAt.toISOString()
    });
    return response.data;
}


