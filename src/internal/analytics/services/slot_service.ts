import { AuthenticationInstance } from "@/configs/AxiosConfigs";
import { TimeSlot } from "../models/TimeSlot";


const SLOT_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/analytics`;

type PopularTimeRes = {
    popular_time_slot: TimeSlot[]
}

export const GetPopularTime = async () => {
    const res = await AuthenticationInstance.get<PopularTimeRes>(`${SLOT_URL}/slot-popular-time`)
    return res.data.popular_time_slot
}