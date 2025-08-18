import { AuthenticationInstance } from "@/configs/AxiosConfigs";
import { ClientRate } from "../models/Customer";

const CUSTOMER_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/analytics`;


type ClientRateRes = {
    message:string
    month_client_rate: ClientRate[]
}


export const GetClientRate = async () => {
    const res = await AuthenticationInstance.get<ClientRateRes>(`${CUSTOMER_URL}/client-rate`)
    return res.data.month_client_rate
}