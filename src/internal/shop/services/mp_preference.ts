import { AuthenticationInstance } from "@/configs/AxiosConfigs"
import { CreatePreferenceRequest } from "../types/Preference"

const MP_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/mercado_pago`


// Extrer listado de barberos activos

export const createPreference = async (data: CreatePreferenceRequest) => {
    let res = await AuthenticationInstance.post<string>(`${MP_BASE_URL}/`, data)
    return res.data
}