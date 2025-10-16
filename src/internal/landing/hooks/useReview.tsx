import { useEffect, useRef, useState } from "react";
import { RatingStats, ReviewDetail } from "../models/Review";
import { GetReviews, GetRatingStats } from "../services/review_service";

const useReview = () => {
  const [review, setReview] = useState<ReviewDetail[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchReviews = async () => {
      if (isLoading || !hasMore) return;

      try {
        setIsLoading(true);
        const response = await GetReviews(0);

        if (response?.review.length > 0) {
          setReview(response.review);
        }
      } catch (error) {
        console.warn("Error cargando reseñas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Estadisticas
  const [reviewStats, setReviewStats] = useState<RatingStats>();
  useEffect(() => {
    const fetchReviewStats = async () => {
      try {
        let res = await GetRatingStats();
        if (res) {
          setReviewStats(res.stats);
        }
      } catch (error) {
        console.warn("Algo no fue bien recuperando las reviews");
      }
    };
    fetchReviewStats();
  }, []);

  /**
   * 🔹 4. Intersection Observer → aumenta el `page` cuando llegamos al final
  */

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const SearchMoreReviews = async () => {
    if (isLoading || !hasMore) return;

    try {
      setIsLoading(true);
      const nextPage = page + 10;
      const response = await GetReviews(nextPage);
      if (response?.review?.length > 0) {
        setReview((prev) => [...prev, ...response.review]);
        setPage(nextPage);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.warn("Error cargando más reseñas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    review,
    reviewStats,
    hasMore,
    loaderRef,
    SearchMoreReviews
  };
};

export default useReview;
