import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import ReviewCard from "../card/ReviewCard";
import { FaArrowLeft } from "react-icons/fa6";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

import AvgRatingCard from "../card/AvgRatingCard";
import RatingDistributionCard from "../card/RatingDistributionCard";
import useReview from "../../hooks/useReview";

const Reviews = () => {
  const { review, reviewStats, hasMore, SearchMoreReviews } = useReview();

  return (
    <Dialog>
      <DialogTrigger asChild className="">
          <Button variant="ghost" className="rounded-full">
            Todas las reseñas
          </Button>
      </DialogTrigger>

      <DialogContent
        className="2xl:max-h-[90vh] 2xl:min-h-[80vh] 2xl:max-w-5xl
            xl:max-h-[90vh] xl:min-h-[80vh] xl:max-w-4xl 
            lg:max-h-[90vh] lg:min-h-[85vh] lg:max-w-3xl
            md:max-h-[95vh] md:min-h-[80vh] md:max-w-2xl  
            max-w-full max-h-full
            w-full h-full 
            p-6 flex flex-col bg-zinc-50 z-50 md:rounded-3xl
            shadow-2xl overflow-hidden overflow-y-scroll"
      >
        <DialogHeader>
          <div className="flex items-start flex-col gap-3">
            <div className="flex items-center gap-4 mb-6">
              <DialogTrigger asChild>
                <button className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition">
                  <FaArrowLeft size={18} className="text-zinc-700" />
                </button>
              </DialogTrigger>

              <div>
                <DialogTitle className="text-lg text-start font-semibold text-zinc-700">
                  Reseñas
                </DialogTitle>
                <DialogDescription className="text-start">
                  Lee las reseñas y conoce la experiencia de otros usuarios.
                </DialogDescription>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div>
          <div className="grid md:grid-cols-3 col-span-1 gap-2">
            <AvgRatingCard average_rating={reviewStats?.average_rating} />
            <div className="md:col-span-2">
              <RatingDistributionCard
                rating_count={reviewStats?.rating_count}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {review.map((review) => (
              <ReviewCard key={review.review_id} review={review} />
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center">
          {hasMore ? (
            <div className="flex justify-center items-center py-4">
              <Button
                onClick={SearchMoreReviews}
                size={"sm"}
                className="rounded-full"
                variant={"ghost"}
              >
                Ver mas
              </Button>
            </div>
          ) : (
            <p>No hay más reseñas</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Reviews;
