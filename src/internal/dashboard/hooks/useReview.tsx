import { useEffect, useState } from "react";
import { RatingStats, ReviewDetail } from "../models/Review";
import {
  GetAppointmentReview,
  GetRatingStats,
} from "../services/review_service";

const useReview = () => {
  const [review, setReview] = useState<ReviewDetail[]>([]);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        let res = await GetAppointmentReview();
        if (res) {
          console.info("[REVIEWS]", res);
          setReview(res.review);
        }
      } catch (error) {
        console.warn("Algo no fue bien recuperando las reviews");
      }
    };
    fetchReview();
  }, []);

  // Estadisticas
  const [reviewStats, setReviewStats] = useState<RatingStats>()
  useEffect(() => {
    const fetchReviewStats = async () => {
      try {
        let res = await GetRatingStats();
        if (res) {
          console.info("[REVIEWS]", res);
          setReviewStats(res.stats)
        }
      } catch (error) {
        console.warn("Algo no fue bien recuperando las reviews");
      }
    };
    fetchReviewStats();
  }, []);

  return {
    review,
    reviewStats
  };
};

export default useReview;
