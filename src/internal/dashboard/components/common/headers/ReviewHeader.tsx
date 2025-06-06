import { CustomerReviews } from '@/internal/dashboard/models/Reviews'
import { MessageSquare, Star } from 'lucide-react'
import React from 'react'

type ReviewHeaderProps = {
    customerReviews: CustomerReviews[] | []
}

const ReviewHeader: React.FC<ReviewHeaderProps> = ({ customerReviews }) => {

    const fiveStarCount = customerReviews.filter((review) => review.rating === 5).length

    const averageRating = (customerReviews.reduce((acc, review) => acc + review.rating, 0) / customerReviews.length).toFixed(1)
    const fiveStarPercentage = Math.round((fiveStarCount / customerReviews.length) * 100)


    return (
        <>
            <div className='col-span-3'>
                {
                    Array.isArray(customerReviews) && customerReviews.length > 0 && (
                        <div className="flex items-center gap-8">
                            <div className="text-center">
                                <div className="flex items-center justify-center">
                                    <span className="text-4xl font-bold text-zinc-50">{averageRating}</span>
                                    <span className="text-xl text-zinc-100 ml-1">/5</span>
                                </div>
                                <div className="flex items-center justify-center mt-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`h-5 w-5 ${star <= Math.round(Number(averageRating)) ? "text-amber-400 fill-amber-400" : "text-slate-200"}`}
                                        />
                                    ))}
                                </div>
                                <p className="text-sm text-zinc-100 mt-1">Calificación promedio</p>
                            </div>

                            <div className="text-center">
                                <div className="text-4xl font-bold text-zinc-50">{fiveStarPercentage}%</div>
                                <div className="flex items-center justify-center mt-1">
                                    <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                                    <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                                    <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                                    <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                                    <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                                </div>
                                <p className="text-sm text-zinc-100 mt-1">5 estrellas</p>
                            </div>

                            <div className="text-center">
                                <div className="text-4xl font-bold text-zinc-50">{customerReviews.length}</div>
                                <div className="flex items-center justify-center mt-1">
                                    <MessageSquare className="h-5 w-5 text-rose-500" />
                                </div>
                                <p className="text-sm text-zinc-100 mt-1">Total reseñas</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default ReviewHeader
