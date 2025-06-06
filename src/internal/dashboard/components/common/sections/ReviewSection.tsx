import React, { useState } from 'react'

import { motion } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { ChevronDown, Star } from 'lucide-react';
import { CustomerReviews } from '@/internal/dashboard/models/Reviews';

type ReviewSectionProps = {
    reviews: CustomerReviews[] | []
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews }) => {
    const [expandedReview, setExpandedReview] = useState<number | null>(null)

    const toggleExpandReview = (id: number) => {
        setExpandedReview(expandedReview === id ? null : id)
    }

    return (
        <>
            {
                reviews.map((review, indx) => (
                    <motion.div
                        key={indx}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                            "bg-gray-900/30 border-gray-800 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border min-h-[300px] flex flex-col justify-between", // altura y flex
                            expandedReview === review.schedule_id ? "md:col-span-2 lg:col-span-3" : ""
                        )}
                    >
                        <div className="p-8 flex flex-col gap-6 flex-grow">
                            {/* Cabecera de la reseña */}
                            <div className="flex items-center gap-1">
                                {Array(5)
                                    .fill(0)
                                    .map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < review.rating ? "fill-rose-500 text-rose-500" : "text-gray-600"}`}
                                        />
                                    ))}
                            </div>

                            {/* Contenido de la reseña */}
                            <div className="flex-grow">
                                <p
                                    className={cn(
                                        "text-gray-100 text-lg leading-relaxed",
                                        expandedReview === review.schedule_id ? "" : "line-clamp-3"
                                    )}
                                >
                                    {review.comment}
                                </p>

                                {/* Botón para expandir/colapsar */}
                                {review.comment.length > 150 && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="mt-4 text-zinc-50 hover:text-slate-700 p-0 h-auto"
                                        onClick={() => toggleExpandReview(review.schedule_id)}
                                    >
                                        {expandedReview === review.schedule_id ? "Ver menos" : "Ver más"}
                                        <ChevronDown
                                            className={`h-4 w-4 ml-1 transition-transform ${expandedReview === review.schedule_id ? "rotate-180" : ""
                                                }`}
                                        />
                                    </Button>
                                )}
                            </div>

                            {/* Footer con avatar y nombre */}
                            <div className="flex items-center gap-4 pt-4 mt-auto">
                                <Avatar className="w-12 h-12">
                                    <AvatarFallback className="bg-rose-600 text-zinc-50 font-semibold uppercase">
                                        {review?.payer_name[0]}
                                        {review?.payer_surname[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="text-white font-semibold">
                                        {review.payer_name} {review.payer_surname}
                                    </div>
                                    <span className="text-gray-400 text-sm font-medium">Cliente</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                ))
            }
        </>
    )
}

export default ReviewSection



