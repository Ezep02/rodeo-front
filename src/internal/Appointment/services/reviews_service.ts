import { AuthenticationInstance } from "../../../configs/AxiosConfigs";
import { Appointment } from "../models/Appointment";
import { ReviewDetail } from "../models/Review";


const REVIEW_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/reviews`;


type Review = {
    appointment_id: number
    comment: string
    rating: number
}


type ReviewResponse = {
    message: string
    review: Review
}


export const CreateReview = async (review: Review) => {
    const response = await AuthenticationInstance.post<ReviewResponse>(`${REVIEW_URL}/`, review)
    return response.data
}

export const GetReviewList = async (offset: number) => {
    const response = await AuthenticationInstance.get<Appointment[]>(`${REVIEW_URL}/all/${offset}`)
    return response.data
}


// # Reviews del usuario
type CustomerReviewsRes = {
    message: string
    reviews: ReviewDetail[]
}

export const GetCustomerReviewList = async (userID: number, page_offset: number) => {
    const response = await AuthenticationInstance.get<CustomerReviewsRes>(`${REVIEW_URL}/user/${userID}/page/${page_offset}`)
    return response.data
}