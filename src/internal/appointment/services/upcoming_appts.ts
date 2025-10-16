import { AuthenticationInstance } from "@/configs/AxiosConfigs"
import { UpcomingApptStats } from "../types/Appointment"
import { Booking } from "../models/Appointment"


const APPOINTMENT_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/appointment`

// Obtener las estadisticas del barbero
export const statsByBarberID = async (barber_id: number) => {
    let res = await AuthenticationInstance.get<UpcomingApptStats>(`${APPOINTMENT_BASE_URL}/stats/${barber_id}`)
    return res.data
}

// Obtener los proximos appointments 
export async function getUpcomingBookings(
    barberId: number,
    date: string,
    status?: string,
) {

    const params = new URLSearchParams();
    if (status) params.append("status", status);

    const url = `${APPOINTMENT_BASE_URL}/upcoming/${date}/${barberId}?${params.toString()}`;

    const response = await AuthenticationInstance.get<Booking[]>(url);

    return response.data;
}