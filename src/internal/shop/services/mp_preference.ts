import { AuthenticationInstance } from "@/configs/AxiosConfigs"
import { PreferenceRequest } from "../types/Preference"
import { Payment } from "../types/Payment"

const MP_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/mercado_pago`
const APPT_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/appointment`

// Extrer listado de barberos activos

export const createPreference = async (data: PreferenceRequest) => {
    let res = await AuthenticationInstance.post<string>(`${MP_BASE_URL}/`, data)
    return res.data
}


export const createPreferenceWithAlias = async (data: PreferenceRequest) => {
    let res = await AuthenticationInstance.post<Payment>(`${APPT_BASE_URL}/`, data)
    return res.data
}