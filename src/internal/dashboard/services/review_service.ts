import { AuthenticationInstance } from "@/configs/AxiosConfigs";
import { ReviewDetail } from "../models/Review";



const REVIEW_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/reviews`;

type ReviewRes = {
    message: string
    review: ReviewDetail[]
}


export const GetAppointmentReview = async () => {
    const res = await AuthenticationInstance.get<ReviewRes>(`${REVIEW_URL}/`)
    return res.data
}

// Extraer estadisticas de las reviews

type RatingStatsRes = {
  message: string;
  stats: {
    total_reviews: number;
    average_rating: number;
    rating_count: Record<string, number>;
  };
}

export const GetRatingStats = async () => {
    let res = await AuthenticationInstance.get<RatingStatsRes>(`${REVIEW_URL}/rating-stats`)
    console.info("[ESTADISTICAS REVIEWS]", res.data)
    return res.data
}