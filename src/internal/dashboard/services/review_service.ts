
import { AuthenticationInstance } from "@/configs/AxiosConfigs";
import { Appointment } from "../models/Review";

const REVIEW_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/reviews`;

type ReviewRes = {
    message: string
    review: Appointment[]
}


export const GetAppointmentReview = async () => {
    const res = await AuthenticationInstance.get<ReviewRes>(`${REVIEW_URL}/`)
    return res.data
}