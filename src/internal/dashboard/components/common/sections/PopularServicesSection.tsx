import { Clock, Scissors, Star, TrendingUp, Users } from 'lucide-react';
import React from 'react'
import { usePopularServices } from '../../../hooks/usePopularServices';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GiBullHorns } from 'react-icons/gi';

const PopularServicesSection: React.FC = () => {
    const {
        popularServices
    } = usePopularServices()

    return (
        <section className="py-24 px-6 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
            <div className="container">
                {/* Header */}
                <div className="mb-16">
                    <div className="inline-flex gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 mb-6">
                        <TrendingUp className="w-4 h-4 text-rose-400" />
                        <span className="text-rose-400 text-sm font-medium">Servicios Destacados</span>
                    </div>
                    <h2 className="text-5xl font-bold text-white mb-6">
                        Los <span className="text-rose-500">Más Populares</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl">
                        Descubre los servicios que más eligen nuestros clientes y que garantizan resultados excepcionales
                    </p>
                </div>

                {
                    Array.isArray(popularServices) && popularServices.length > 0 ? (
                        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl">
                            {popularServices.map((service, index) => (
                                <Card
                                    key={index}
                                    className={`relative overflow-hidden bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-700 hover:border-rose-500/50 transition-all duration-500 group ${index === 1 ? "lg:scale-105 lg:shadow-2xl lg:shadow-rose-500/10" : ""}`}
                                >
                                    {/* Featured Badge for middle card */}
                                    {index === 1 && (
                                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
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
                            ))}

                        </div>
                    ) : (
                        <div className="py-16 flex flex-col items-center justify-center text-center">
                            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                                <Scissors className="h-12 w-12 text-slate-300" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-3 text-slate-700">Aun no hay servicios destacados</h3>
                            <p className="text-slate-500 max-w-md mb-8">
                                Los servicios mas populares apareceran pronto.
                            </p>
                        </div>
                    )}
            </div>
        </section>
    )
}
export default PopularServicesSection
