import { useContext, useEffect, useRef, useState } from "react";
import { DeleteReview, GetCustomerReviewList } from "../services/reviews_service";
import { AuthContext } from "@/context/AuthContext";
import { ReviewDetail } from "../models/Review";

const useUserReview = () => {
  const { user } = useContext(AuthContext)!;

  const [reviews, setReviews] = useState<ReviewDetail[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [deleteErr, setDeleteErr] = useState<string>("")
  const [showErr, setShowErr] = useState<boolean>(false)
  /**
   * 🔹 1. Obtener reseñas de una página específica
   */
  useEffect(() => {
    const fetchReviews = async () => {
      if (!user?.id || isLoading || !hasMore) return;

      try {
        setIsLoading(true);
        const response = await GetCustomerReviewList(user.id, 0);

        if (response?.reviews?.length > 0) {
          setReviews(response.reviews);
        }
      } catch (error) {
        console.warn("Error cargando reseñas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  /**
   * 🔹 4. Intersection Observer → aumenta el `page` cuando llegamos al final
   */

  const SearchMoreReviews = async () => {
    if (!user?.id || isLoading || !hasMore) return;

    try {
      setIsLoading(true);
      const nextPage = page + 10;
      const response = await GetCustomerReviewList(user.id, nextPage);

      if (response?.reviews?.length > 0) {
        setReviews((prev) => [...prev, ...response.reviews]);
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

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !isLoading) {
          SearchMoreReviews(); // Esto imprimirá "hay" en la consola
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.1 }
    );

    observer.observe(loader);

    return () => {
      if (loader) observer.unobserve(loader);
    };
  }, [loaderRef.current, hasMore, isLoading]);


  const HandleDeleteReview = async (id:number) => {
    if(!id) return
    
    try {
      let res = await DeleteReview(id)  
      if (res){
        setReviews((prev) => prev.filter((curr) => curr.review_id !== id))
      }
    } catch (error:any) {
      setShowErr(true)
      setDeleteErr("algo no fue bien eliminando la reseña") 
    }
  }

  return {
    reviews,
    isLoading,
    hasMore,
    loaderRef,
    HandleDeleteReview,
    deleteErr,
    showErr,
    setShowErr
  };
};

export default useUserReview;
