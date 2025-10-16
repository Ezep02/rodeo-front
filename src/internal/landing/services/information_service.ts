import { AuthenticationInstance } from "@/configs/AxiosConfigs";
import { Stats } from "../models/Information";



const INFO_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/info`;


type InformationRes = {
    info: Stats
    message: string
}


export const GetInformation = async () => {
    const res = await AuthenticationInstance.get<InformationRes>(`${INFO_URL}`)
    return res.data.info
}