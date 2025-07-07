import { AuthenticationInstance } from "@/configs/AxiosConfigs"
import { Slot } from "../model/Slot";




type ListByDateReq = {
    slots: Slot[],
}

const SLOT_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/slots`;

export const GetSlotByDate = async (date: string) => {
    const res = await AuthenticationInstance.get<ListByDateReq>(`${SLOT_BASE_URL}/date/${date}`)
    return res.data
}