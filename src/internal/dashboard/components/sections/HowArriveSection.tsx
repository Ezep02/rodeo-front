import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { MapPin, Navigation } from 'lucide-react'
import React from 'react'

const HowArriveSection: React.FC = () => {
    return (
        <section className="bg-gray-50 py-24 px-6 border-b">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 mb-4">
                        <MapPin className="w-4 h-4 text-rose-500" />
                        <span className="text-rose-500 text-sm font-medium">Ubicación</span>
                    </div>
                    <h2 className="text-4xl font-bold text-zinc-900 mb-4">
                        ¿Cómo <span className="text-rose-500">llegar?</span>
                    </h2>
                    <p className="text-base text-gray-600 max-w-2xl">
                        Nos encontramos en una zona céntrica, de fácil acceso para que puedas llegar sin complicaciones.
                    </p>
                </div>

                {/* Mapa + Info en un solo Card */}
                <div className="w-full">
                    <Card className="overflow-hidden rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col md:flex-row gap-8">
                        {/* Info */}
                        <div className="w-full md:w-1/2 space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-rose-500/20 rounded-lg flex items-center justify-center">
                                    <MapPin className="w-6 h-6 text-rose-500" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-zinc-900 mb-1">Dirección</h3>
                                    <p className="text-gray-800 text-base">Av. 29, Calle 48</p>
                                    <p className="text-gray-500 text-sm">Mercedes, Buenos Aires</p>
                                </div>
                            </div>

                            <div>
                                <a
                                    className="inline-flex items-center px-5 py-3 bg-rose-600 hover:bg-rose-700 transition text-white text-sm font-semibold rounded-lg shadow"
                                    href="https://maps.app.goo.gl/mpWfZ32yUaZ6Xbbr6"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Navigation className="w-4 h-4 mr-2" />
                                    Cómo llegar
                                </a>
                            </div>
                        </div>

                        {/* Mapa */}
                        <div className="w-full relative h-[300px] rounded-xl overflow-hidden">
                            <div className="absolute top-4 left-4 z-10">
                                <Badge className="px-2 py-1 bg-rose-600 text-white shadow">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    Estamos aquí
                                </Badge>
                            </div>

                            <picture className="block h-full w-full">
                                <source srcSet="/location.webp" type="image/webp" />
                                <img
                                    src="/location.webp"
                                    alt="Mapa de ubicación"
                                    className="object-cover h-full w-full"
                                />
                            </picture>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default HowArriveSection
