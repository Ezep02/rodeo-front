import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { Star } from "lucide-react";

type Props = {
  average_rating?: number;
};

const AvgRatingCard: React.FC<Props> = ({ average_rating }) => {
  const hasData = average_rating !== undefined && average_rating !== null;
  const roundedRating = hasData ? Math.round(average_rating) : 0;

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
                {average_rating!.toFixed(1)}
              </span>

              {/* Estrellas visuales */}
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= roundedRating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-zinc-600"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-zinc-400">Calificación promedio del año</p>
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
