import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { Star, StarHalf } from "lucide-react";

type Props = {
  average_rating?: number;
};

const AvgRatingCard: React.FC<Props> = ({ average_rating }) => {
  const hasData = average_rating !== undefined && average_rating !== null;
  const rating = hasData ? average_rating! : 0;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const totalStars = 5;

  return (
    <Card className="bg-zinc-900 rounded-3xl border border-zinc-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-zinc-50">
          Calificación Promedio
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hasData ? (
          <>
            <div className="flex items-center gap-3 mb-2">
              {/* Número de rating */}
              <span className="text-3xl font-bold text-zinc-50">
                {rating.toFixed(1)}
              </span>

              {/* Estrellas visuales */}
              <div className="flex gap-1">
                {/* Estrellas completas */}
                {[...Array(fullStars)].map((_, i) => (
                  <Star
                    key={`full-${i}`}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}

                {/* Media estrella */}
                {hasHalfStar && (
                  <StarHalf className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                )}

                {/* Estrellas vacías */}
                {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map(
                  (_, i) => (
                    <Star
                      key={`empty-${i}`}
                      className="w-5 h-5 text-zinc-600"
                    />
                  )
                )}
              </div>
            </div>
            <p className="text-sm text-zinc-400">
              Calificación promedio del año
            </p>
          </>
        ) : (
          <p className="text-sm text-zinc-400 text-center">
            No hay calificaciones disponibles
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default AvgRatingCard;
