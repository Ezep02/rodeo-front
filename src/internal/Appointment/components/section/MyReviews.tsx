import React from "react";
import useUserReview from "../../hooks/useUserReview";
import { Button } from "@/components/ui/button";
import { Loader2, Pencil, Star, Trash, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ErrorAlert from "@/components/alerts/ErrorAlert";

const MyReviews: React.FC = () => {
  const { 
    reviews, 
    loaderRef, 
    hasMore, 
    HandleDeleteReview,
    deleteErr,
    setShowErr,
    showErr
  } = useUserReview();

  const handleEdit = (id: number) => {
    console.log(`Editando reseña ${id}`);
  };

  return (
    <div className="space-y-6 pb-8 px-4 pt-3 md:px-6">
      {Array.isArray(reviews) && reviews.length > 0 ? (
        <>

          <ErrorAlert
            message={deleteErr}
            show={showErr}
            onClose={()=> setShowErr(false)}
          />
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
                        
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Eliminar reseña</AlertDialogTitle>
                            <AlertDialogDescription>
                              Estas segudo de querer eliminar tu reseña?. <br />
                              <strong>Esta accion no se puede deshacer.</strong>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                HandleDeleteReview(review.review_id)
                              }
                            >
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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
