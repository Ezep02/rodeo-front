import React from "react";
import { Star } from "lucide-react";

const mockReviews = [
  {
    id: 1,
    name: "Customer Name",
    date: "19 Jul, 2025",
    rating: 5,
    title: "Lorem ipsum dolor sit amet consectetur",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  },
  {
    id: 2,
    name: "Customer Name",
    date: "16 Jul, 2025",
    rating: 4,
    title: "Lorem ipsum dolor sit amet consectetur",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  },
  {
    id: 3,
    name: "Customer Name",
    date: "10 Jul, 2025",
    rating: 5,
    title: "Lorem ipsum dolor sit amet consectetur",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  },
];

const ServiceReviews: React.FC = () => {
  const averageRating = 4.9;
  const totalReviews = 130;

  return (
    <div className="pt-5 px-3">
        
      {/* Header */}
      <div className="flex flex-col gap-1 mb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-zinc-900">
            Reviews ({totalReviews})
          </h3>

          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < Math.round(averageRating) ? "black" : "none"}
                stroke="black"
              />
            ))}
          </div>
        </div>

        <div className="">
          <p className="text-sm text-zinc-600">{averageRating} estrellas</p>
          <button className="text-sm font-medium text-zinc-800 underline hover:text-zinc-950 transition">
            Escribir reseña
          </button>
        </div>
      </div>

      {/* Reviews list */}
      <div className="flex flex-col gap-6 mt-5">
        {mockReviews.map((review) => (
          <div key={review.id} className="border-b border-zinc-200 pb-4">
            {/* Rating */}
            <div className="flex items-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < review.rating ? "black" : "none"}
                  stroke="black"
                />
              ))}
            </div>

            {/* Reviewer info */}
            <p className="text-xs text-zinc-500 mb-1">
              {review.name} • {review.date}
            </p>

            {/* Review title */}
            <h4 className="text-sm font-semibold text-zinc-900 mb-1">
              {review.title}
            </h4>

            {/* Review comment */}
            <p className="text-sm text-zinc-600 leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceReviews;
