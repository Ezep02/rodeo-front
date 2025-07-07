import { Star } from 'lucide-react'
import React from 'react'
import useReview from '../../hooks/useReview'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const ReviewSection: React.FC = () => {

    const {
        review
    } = useReview()

    return (
        <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className=" mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">Reseñas</h2>
                    <p className="text-xl text-gray-600">Testimonios de clientes</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {
                        review.map((review, indx) => (
                            <div className="bg-gray-50 rounded-xl p-6" key={indx}>
                                <div className="flex mb-4">
                                    {
                                        Array.from({ length: review.review.rating }).map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        ))
                                    }
                                </div>

                                <p className="text-gray-700 mb-4">
                                    {review.review.comment}
                                </p>
                                <div className="flex items-center gap-2">
                                    <Avatar className='bg-zinc-900'>
                                        <AvatarFallback className="text-sm font-medium text-zinc-50 bg-transparent uppercase">
                                            {review?.client_name[0]}{review?.client_surname[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-semibold text-gray-900">{review.client_name}{" "}{review.client_surname}</div>
                                        <div className="text-sm text-gray-600">{review.products.length > 0 && review.products[0].name}</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ReviewSection
