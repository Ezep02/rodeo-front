import { AuthenticationInstance } from "@/configs/AxiosConfigs"
import { NewClientRate, RevenueRate } from "../models/Rates"


const ANALYTICS_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/analytics`

// Obtener los datos historicos de clientes registrados
export const getClientRate = async () => {
    let res = await AuthenticationInstance.get<NewClientRate>(`${ANALYTICS_BASE_URL}/client-rate`)
    return res.data
}

// Obtener los datos historicos de ingresos percividos
export const getRevenueRate = async () => {
    let res = await AuthenticationInstance.get<RevenueRate>(`${ANALYTICS_BASE_URL}/month-revenue`)
    return res.data
}