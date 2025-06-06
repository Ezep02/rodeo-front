import { AuthenticationInstance } from "../../../configs/AxiosConfigs";
import { CustomerReviews, ReviewRequest } from "../models/Reviews";


const REVIEW_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/review`;


export const CreateReview = async (review: ReviewRequest) => {
    const response = await AuthenticationInstance.post(`${REVIEW_URL}/new`, review)
    return response.data
}

export const GetCustomerReviews = async (offset:number) => {
    const response = await AuthenticationInstance.get<CustomerReviews[]>(`${REVIEW_URL}/all/${offset}`)
    return response.data
}