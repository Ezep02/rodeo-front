import React from "react";
import useUserReview from "../../hooks/useUserReview";
import { Button } from "@/components/ui/button";
import { Loader2, Pencil, Star, Trash } from "lucide-react";

const MyReviews: React.FC = () => {
  const { reviews, loaderRef, hasMore } = useUserReview();

  const handleEdit = (id: number) => {
    console.log(`Editando reseña ${id}`);
  };

  const handleRemove = (id: number) => {
    if (confirm("¿Seguro que querés eliminar esta reseña?")) {
      console.log(`Eliminando reseña ${id}`);
    }
  };

  return (
    <div className="space-y-6 pb-8 px-4 pt-3 md:px-6">
      {Array.isArray(reviews) && reviews.length > 0 ? (
        <>
          {/* Ajuste: Usamos 'gap-6' para separar mejor las tarjetas */}
          <ul className="grid gap-6">
            {reviews.map((review) => (
              <li
                key={review.review_id}
                className="bg-white p-6 rounded-xl border-b border-gray-100 hover:shadow-md transition-shadow duration-150"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-800">
                          Rating:
                        </span>
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 text-sm mt-1">
                        {review.comment || "Sin comentario"}
                      </p>
                    </div>
                    {/* Ajuste: Botones de acción en la parte superior derecha */}
                    <div className="flex gap-2">
                      <Button
                        variant="ghost" // Ajuste: Cambiado a variante "ghost"
                        size="icon"
                        onClick={() => handleEdit(review.review_id)}
                        title="Editar reseña"
                        className="text-gray-500 hover:bg-gray-100"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost" // Ajuste: Ambos botones son ghost para mantener minimalismo
                        size="icon"
                        onClick={() => handleRemove(review.review_id)}
                        className="text-red-600 hover:bg-red-100"
                        title="Eliminar reseña"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div ref={loaderRef} className="flex justify-center items-center">
            {hasMore ? (
              <Loader2 className="animate-spin" />
            ) : (
              <p>No hay más reseñas</p>
            )}
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500 py-6">
          <p className="text-base">Aún no escribiste ninguna reseña.</p>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
