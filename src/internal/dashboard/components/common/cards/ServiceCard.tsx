import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CustomerServices } from '@/internal/dashboard/models/ShopServices'
import { Clock, ShoppingCart, Star } from 'lucide-react'
import React from 'react'
import { GiBullHorns } from 'react-icons/gi'

type ServiceCardProps = {
    service: CustomerServices
    seleccionarServicio: (selected_service: CustomerServices) => void
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, seleccionarServicio }) => {
    return (
        <Card className="bg-gray-900/50 border-gray-800 hover:border-rose-500/50 transition-all duration-300 group overflow-hidden">
            {/* Image Section */}
            <div className="relative overflow-hidden">
                {
                    service.preview_url ? (
                        <img
                            src={service.preview_url}
                            alt={service.preview_url}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                    ) : (
                        <div
                            className="w-full h-48 flex justify-center items-center text-rose-600 group-hover:scale-105 transition-transform duration-300"
                        >
                            <GiBullHorns size={54} />
                        </div>
                    )
                }
            </div>

            {/* Content Section */}
            <div className="p-6 space-y-4">
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-rose-500 transition-colors">{service.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-2">{service.description}</p>
                </div>

                {/* Rating and Duration */}
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{service.service_duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-rose-600 text-rose-600" />
                        <span className="text-white font-medium">{service.rating}</span>
                        <span className="text-gray-400">({service.reviews_count})</span>
                    </div>
                </div>

                {/* Price Section */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-rose-500">${service.price}</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                    <Button
                        className="flex-1 bg-rose-500 hover:bg-rose-600 text-white"
                        onClick={() => seleccionarServicio(service)}
                    >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Reservar
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default ServiceCard
