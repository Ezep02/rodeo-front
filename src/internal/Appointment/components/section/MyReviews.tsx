import React, { useState } from 'react';
import useUserReview from '../../hooks/useUserReview';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Pencil, Star, Trash } from 'lucide-react';

const ITEMS_PER_PAGE = 3;

const MyReviews: React.FC = () => {
    const { reviews, isLoading } = useUserReview();
    const [visibleReviews, setVisibleReviews] = useState(ITEMS_PER_PAGE);

    const handleLoadMore = () => setVisibleReviews(prev => prev + ITEMS_PER_PAGE);

    const handleEdit = (id: number) => {
        console.log(`Editando reseña ${id}`);
    };

    const handleRemove = (id: number) => {
        if (confirm('¿Seguro que querés eliminar esta reseña?')) {
            console.log(`Eliminando reseña ${id}`);
        }
    };

    const hasMoreReviews = reviews && reviews.length > visibleReviews;

    if (isLoading) {
        return <p className="text-gray-500 text-center pt-4">Cargando reseñas...</p>;
    }

    return (
        <div className="space-y-6 pb-8 px-4 pt-3 md:px-6">
            {Array.isArray(reviews) && reviews.length > 0 ? (
                <>
                    {/* Ajuste: Usamos 'gap-6' para separar mejor las tarjetas */}
                    <ul className="grid gap-6">
                        {reviews.slice(0, visibleReviews).map((review) => (
                            <li
                                key={review.review.id}
                                className="bg-white p-6 rounded-xl border-b border-gray-100 hover:shadow-md transition-shadow duration-150"
                            >
                                <div className="flex flex-col gap-4"> {/* Ajuste: Más espacio entre los bloques */}

                                    {/* Bloque principal de la reseña */}
                                    <div className="flex items-start justify-between">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-semibold text-gray-800">Rating:</span>
                                                {Array.from({ length: 5 }, (_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < review.review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-gray-700 text-sm mt-1">
                                                {review.review.comment || 'Sin comentario'}
                                            </p>
                                        </div>
                                        {/* Ajuste: Botones de acción en la parte superior derecha */}
                                        <div className="flex gap-2">
                                            <Button
                                                variant="ghost" // Ajuste: Cambiado a variante "ghost"
                                                size="icon"
                                                onClick={() => handleEdit(review.review.id)}
                                                title="Editar reseña"
                                                className="text-gray-500 hover:bg-gray-100"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost" // Ajuste: Ambos botones son ghost para mantener minimalismo
                                                size="icon"
                                                onClick={() => handleRemove(review.review.id)}
                                                className="text-red-600 hover:bg-red-100"
                                                title="Eliminar reseña"
                                            >
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Sección de detalles y fecha */}
                                    <div className="text-xs text-gray-500 space-y-2 pt-2 border-t border-gray-100">
                                        {review.products?.length > 0 && (
                                            <div className="flex gap-1 flex-col">
                                                <span className="font-medium text-gray-600">Servicios:</span>
                                                <div className='flex gap-1 flex-wrap'>
                                                    {review.products.map(product => (
                                                        <Badge
                                                            key={product.id}
                                                            variant="default" // Ajuste: Usar una variante secundaria para diferenciar
                                                        >
                                                            {product.name}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {review.slot && (
                                            <div className="flex items-center gap-1">
                                                <CalendarDays className="w-4 h-4 text-gray-400" />
                                                <span>
                                                    {new Date(review.slot.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </li>
                        ))}
                    </ul>

                    {hasMoreReviews && (
                        <div className="flex justify-center mt-6">
                            <Button
                                onClick={handleLoadMore}
                                variant="outline"
                                // Ajuste: Estilo más neutro y coherente
                                className="px-8 py-2 rounded-lg border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Ver más
                            </Button>
                        </div>
                    )}
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