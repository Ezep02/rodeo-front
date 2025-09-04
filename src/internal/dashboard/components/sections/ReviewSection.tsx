import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useReview from "../../hooks/useReview";
import ReviewCard from "../card/ReviewCard";
import RatingDistributionCard from "../card/RatingDistributionCard";
import TotalReviewCard from "../card/TotalReviewCard";
import AvgRatingCard from "../card/AvgRatingCard";


// Uso en un componente

const ReviewSection: React.FC = () => {
  const [open, setOpen] = useState(false);

  const { review, reviewStats } = useReview();

  return (
    <section className="py-16 bg-white">
      <div className="flex px-4 sm:px-6 lg:px-8">
        <div>
          {/* Encabezado */}
          <div className="mb-12 ">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
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
          <div className="flex justify-center mt-10">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="px-6 py-2 rounded-full font-medium text-gray-900 border-gray-300 hover:bg-gray-100 transition"
                >
                  Ver todas las reseñas
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">
                    Todas las reseñas
                  </DialogTitle>
                </DialogHeader>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {review.map((review) => (
                    <ReviewCard key={review.review_id} review={review} />
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
