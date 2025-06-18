import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { PopularServices } from '@/internal/dashboard/models/DashboardModels'
import { Clock, Star, Users } from 'lucide-react'
import React from 'react'
import { GiBullHorns } from 'react-icons/gi'

type PopularServiceProps = {
    service: PopularServices
    index:number
}

const PopularServiceCard:React.FC<PopularServiceProps> = ({service, index}) => {
    return (
        <Card
           
            className={`relative overflow-hidden bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-700 hover:border-rose-500/50 transition-all duration-500 group ${index === 1 ? "lg:scale-105 lg:shadow-2xl lg:shadow-rose-500/10" : ""}`}
        >
            {/* Featured Badge for middle card */}
            {index === 1 && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 group-hover:translate-y-1/2 -translate-y-12 transition-all duration-500 z-10">
                    <Badge className="bg-rose-500 text-white px-4 py-1 text-sm font-semibold">Más Popular</Badge>
                </div>
            )}

            {/* Image Section */}
            <div className="relative h-48 overflow-hidden">
                {
                    service.preview_url ? (
                        <img
                            src={service.preview_url}
                            alt={service.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                    ) : (
                        <div
                            className="w-full h-full flex justify-center items-center group-hover:scale-110 transition-transform duration-700 text-rose-600"
                        >
                            <GiBullHorns size={54} />
                        </div>
                    )
                }

                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />

            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white group-hover:text-rose-400 transition-colors">
                        {service.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">{service.description}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-700">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                            <Clock className="w-4 h-4 text-rose-400" />
                            <span className="text-white font-semibold">{service.service_duration}</span>
                        </div>
                        <span className="text-gray-400 text-sm">Duración</span>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                            <Star className="w-4 h-4 fill-rose-500 text-rose-500" />
                            <span className="text-white font-semibold">{service.rating}</span>
                        </div>
                        <span className="text-gray-400 text-sm">Rating</span>
                    </div>
                </div>

                {/* Popularity Indicator */}
                <div className="flex items-center gap-2 p-3 bg-rose-500/5 border border-rose-500/20 rounded-lg">
                    <Users className="w-4 h-4 text-rose-400" />
                    <span className="text-rose-400 text-sm font-medium">{service.total_avg}% de clientes</span>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between pt-4">
                    <div className="space-y-1">
                        <span className="text-3xl font-bold text-rose-500">${service.price}</span>
                        <div className="text-gray-400 text-sm">Precio final</div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default PopularServiceCard
