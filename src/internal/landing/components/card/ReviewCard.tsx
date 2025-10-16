import React, { useState } from "react";
import { ReviewDetail } from "../../models/Review";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

type Props = {
  review: ReviewDetail;
  maxLength?: number; // cantidad de caracteres antes de mostrar "Ver más"
};

const ReviewCard: React.FC<Props> = ({ review, maxLength = 150 }) => {
  const [showFull, setShowFull] = useState(false);
  const isLong = review.comment.length > maxLength;

  const displayedComment = showFull || !isLong
    ? review.comment
    : review.comment.slice(0, maxLength) + "...";

  return (
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
      {/* Estrellas */}
      <div className="flex mb-3">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
        ))}
      </div>

      {/* Comentario */}
      <p className="text-gray-700 mb-2">{displayedComment}</p>

      {isLong && (
        <button
          onClick={() => setShowFull(!showFull)}
          className="text-sm text-blue-600 hover:underline mb-4 self-start"
        >
          {showFull ? "Ver menos" : "Ver más"}
        </button>
      )}

      {/* Cliente */}
      <div className="flex items-center gap-3 mt-auto">
        <Avatar className="border-2 rounded-full overflow-hidden">
          <AvatarImage src={review?.avatar || undefined} alt="Profile avatar" />
          <AvatarFallback className="uppercase bg-zinc-950 text-zinc-50 font-semibold">
            {review?.client_name?.charAt(0)}
            {review?.client_surname?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold text-gray-900">
            {review.client_name} {review.client_surname}
          </div>
          <span className="text-sm text-gray-500">
            {new Date(review?.created_at).toLocaleDateString("es-AR", {
              day: "numeric",
              month: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
