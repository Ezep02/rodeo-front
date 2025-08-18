import { AuthenticationInstance } from "@/configs/AxiosConfigs";
import { OcupationRate, Stats, ClientRate } from "../models/Metric";


const INFO_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}`;



// Extraer tasa de ocupacion del mes
type BookingOcupationRateRes = {
    message: string
    ocupation_rate: OcupationRate
}

export const GetBookingOcupationRate = async () => {
    const res = await AuthenticationInstance.get<BookingOcupationRateRes>(`${INFO_BASE_URL}/analytics/booking-rate`)
   
    return res.data
}

// Extraer el total de clientes registrados
type InformationRes = {
    info: Stats
    message: string
}

export const GetBarberInformation = async () => {
    const res = await AuthenticationInstance.get<InformationRes>(`${INFO_BASE_URL}/info/`)
    return res.data
}

// Extraer la cantidad de posts generados 
type TotalPostRes = {
    total_post: number
}

export const GetTotalPost = async () => {
    const res = await AuthenticationInstance.get<TotalPostRes>(`${INFO_BASE_URL}/posts/count`)
    return res.data
}

// Extraer el numero de clientes registrados por mes
type ClientRateRes = {
    message:string
    month_client_rate: ClientRate[]
}

export const GetClientRate = async () => {
    const res = await AuthenticationInstance.get<ClientRateRes>(`${INFO_BASE_URL}/analytics/client-rate`)
    return res.data
}