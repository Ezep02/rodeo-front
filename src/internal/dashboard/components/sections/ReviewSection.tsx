import React, { useState } from "react";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useReview from "../../hooks/useReview";
import { ReviewDetail } from "../../models/Review";

const appointmentsReview = [
  {
    id: 1,
    client_name: "Ana",
    client_surname: "Gómez",
    products: [
      { id: 1, name: "Corte de cabello" },
      { id: 2, name: "Coloración" },
    ],
    review: { id: 1, rating: 4, comment: "Muy buen servicio" },
  },
  {
    id: 2,
    client_name: "Luis",
    client_surname: "Martínez",
    products: [{ id: 3, name: "Manicura" }],
    review: { id: 2, rating: 5, comment: "Excelente atención" },
  },
  {
    id: 3,
    client_name: "Carla",
    client_surname: "Fernández",
    products: [
      { id: 4, name: "Masaje relajante" },
      { id: 5, name: "Tratamiento facial" },
    ],
    review: { id: 3, rating: 3, comment: "Bueno, pero puede mejorar" },
  },
  {
    id: 4,
    client_name: "Jorge",
    client_surname: "Ramírez",
    products: [{ id: 6, name: "Depilación" }],
    review: { id: 4, rating: 5, comment: "Muy profesional" },
  },
];

const ReviewSection: React.FC = () => {
  const [open, setOpen] = useState(false);

  const { review } = useReview();

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

const ReviewCard: React.FC<{ review: ReviewDetail }> = ({ review }) => (
  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
    {/* Estrellas */}
    <div className="flex mb-3">
      {Array.from({ length: review.rating }).map((_, i) => (
        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
      ))}
    </div>

    {/* Comentario */}
    <p className="text-gray-700 mb-4">{review.comment}</p>

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
        <span className="text-sm">
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
