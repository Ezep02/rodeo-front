import { AuthenticationInstance } from "../../../configs/AxiosConfigs";


const REVIEW_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/reviews`;


type Review = {
    appointment_id: number
    comment: string
    rating: number
}

type CustomerReviews = {
    schedule_id: number
    order_id: number
    comment: string
    rating: number
    user_id: number
    title: string
    schedule_day_date: Date
    schedule_start_time: string
    payer_name: string
    payer_surname: string
    CreatedAt: Date
}

type ReviewResponse = {
    message: string
    review: Review
}


export const CreateReview = async (review: Review) => {
    const response = await AuthenticationInstance.post<ReviewResponse>(`${REVIEW_URL}/`, review)
    return response.data
}

export const GetCustomerReviews = async (offset: number) => {
    const response = await AuthenticationInstance.get<CustomerReviews[]>(`${REVIEW_URL}/all/${offset}`)
    return response.data
}