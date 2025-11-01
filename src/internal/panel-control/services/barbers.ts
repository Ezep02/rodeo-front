import { AuthenticationInstance } from "@/configs/AxiosConfigs"
import { Barber } from "../models/Barbers"


const BARBER_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/barbers`

export const getBarberList = async () => {
    let res = await AuthenticationInstance.get<Barber[] | []>(`${BARBER_BASE_URL}/all`)
    return res.data
}