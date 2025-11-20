import { AuthenticationInstance } from "@/configs/AxiosConfigs"
import { BarberInfo } from "../../../types/BarberInfo"

const BARBERS_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/barbers`


// Extrer listado de barberos activos
export const barberList = async () => {
    let res = await AuthenticationInstance.get<BarberInfo[]>(`${BARBERS_BASE_URL}/all`)
    return res.data
}