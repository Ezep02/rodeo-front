import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

type Props = {
  total_reviews?: number;
};

const TotalReviewCard: React.FC<Props> = ({ total_reviews }) => {
  return (
    <Card className="bg-zinc-900 rounded-3xl border border-zinc-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-zinc-50">
          Reseñas Totales
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-3xl font-bold text-zinc-50">
            {total_reviews || 0}
          </span>
        </div>
        <p className="text-sm text-zinc-400">
          Total de reseñas registradas este año
        </p>
      </CardContent>
    </Card>
  );
};

export default TotalReviewCard;
