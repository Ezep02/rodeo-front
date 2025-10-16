import React from "react";
import useReview from "../../hooks/useReview";
import ReviewCard from "../card/ReviewCard";
import RatingDistributionCard from "../card/RatingDistributionCard";
import TotalReviewCard from "../card/TotalReviewCard";
import AvgRatingCard from "../card/AvgRatingCard";
import Reviews from "../dialog/Reviews";


// Uso en un componente

const ReviewSection: React.FC = () => {

  const { review, reviewStats } = useReview();

  return (
    <section className="py-16 bg-white">
      <div className="flex px-4 sm:px-6 lg:px-8">
        <div>
          {/* Encabezado */}
          <div className="mb-12 ">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1">
              Reseñas
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Lo que dicen nuestros clientes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

            <TotalReviewCard total_reviews={reviewStats?.total_reviews} />
            
            <AvgRatingCard average_rating={reviewStats?.average_rating} />

            <RatingDistributionCard rating_count={reviewStats?.rating_count} />
          </div>
          

          {/* Grid de reseñas (solo 3) */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {review.map((review) => (
              <ReviewCard key={review.review_id} review={review} />
            ))}
          </div>

          {/* Botón Ver más */}
          <div className="justify-center flex pt-4">
            <Reviews/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
