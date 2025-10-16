import { AuthenticationInstance } from "@/configs/AxiosConfigs"
import { Barber } from "../types/Barber"


const BARBERS_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/barbers`



export const GetBarberInfo = async (barber_id: number) => {
    let res = await AuthenticationInstance.get<Barber>(`${BARBERS_BASE_URL}/${barber_id}`)
    return res.data
}