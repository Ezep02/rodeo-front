import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

type Props = {
  rating_count?: Record<string, number>;
};

const RatingDistributionCard: React.FC<Props> = ({ rating_count }) => {
  // Si no hay datos o el objeto está vacío
  const hasData = rating_count && Object.keys(rating_count).length > 0;

  const totalReviews = hasData
    ? Object.values(rating_count!).reduce((a, b) => a + b, 0)
    : 0;

  const getPercentage = (count: number) => {
    if (totalReviews === 0) return "0%";
    return `${((count / totalReviews) * 100).toFixed(0)}%`;
  };

  const getColor = (stars: number) => {
    switch (stars) {
      case 5:
        return "bg-green-400";
      case 4:
        return "bg-blue-400";
      case 3:
        return "bg-purple-400";
      case 2:
        return "bg-blue-300";
      case 1:
        return "bg-gray-500";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <Card className="bg-zinc-900 rounded-3xl border border-zinc-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-zinc-50">
          Distribución de reseñas
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hasData ? (
          <div className="space-y-2 flex flex-col">
            {[5, 4, 3, 2, 1].map((r) => {
              const count = rating_count![r.toString()] ?? 0;
              const percentage = getPercentage(count);
              const color = getColor(r);
              return (
                <div key={r} className="flex items-center gap-3">
                  {/* Número de estrellas */}
                  <span className="text-sm text-zinc-300 w-4">{r}</span>

                  {/* Barra de progreso */}
                  <div className="flex-1 bg-zinc-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${color}`}
                      style={{ width: percentage }}
                    />
                  </div>

                  {/* Número de reseñas */}
                  <span className="text-sm text-zinc-300 w-10 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-zinc-400 text-center">
            No hay datos de reseñas disponibles
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default RatingDistributionCard;
