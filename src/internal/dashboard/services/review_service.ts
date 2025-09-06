import { AuthenticationInstance } from "@/configs/AxiosConfigs";
import { ReviewDetail } from "../models/Review";



const REVIEW_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/reviews`;

type ReviewRes = {
  message: string
  review: ReviewDetail[]
}

// Extre todas las reviews 
export const GetReviews = async (review_offset:number) => {
  const res = await AuthenticationInstance.get<ReviewRes>(`${REVIEW_URL}/page/${review_offset}`)
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