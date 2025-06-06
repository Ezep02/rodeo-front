import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { MapPin, Navigation } from 'lucide-react'
import React from 'react'

const HowArriveSection: React.FC = () => {
    return (
        <section className="py-24 px-6">
            <div className="container mx-auto">
                {/* Header */}
                <div className="mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 mb-6">
                        <MapPin className="w-4 h-4 text-rose-400" />
                        <span className="text-rose-400 text-sm font-medium">Ubicación</span>
                    </div>
                    <h2 className="text-5xl font-bold text-white mb-6">
                        ¿Cómo <span className="text-rose-500">Llegar?</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl">
                        Estamos ubicados en el corazón de la ciudad, con fácil acceso desde cualquier punto
                    </p>
                </div>

                {/* Main Location Card */}
                <div className="grid lg:grid-cols-2 gap-8 mb-16">
                    {/* Map Section */}
                    <Card className="overflow-hidden bg-gray-900/50 border-gray-800">
                        <div className="relative h-96">
                            {/* Overlay with location pin */}
                            <div className="absolute top-4 left-4">
                                <Badge className="bg-rose-500 text-white">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    Estamos aquí
                                </Badge>
                            </div>
                            
                            {/* You can replace the above div with an actual map */}
                            <picture className='rounded-xl shadow-md'>
                                <source srcSet="./location.webp" type="image/webp" />
                                <img src="./location.webp" alt="Mapa de ubicación"  className='object-cover h-full w-full object-center'/>
                            </picture>
                        </div>
                    </Card>

                    {/* Location Info */}
                    <div className="space-y-6">
                        <Card className="bg-gray-900/50 border-gray-800 p-6">
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-rose-500/20 rounded-lg flex items-center justify-center">
                                        <MapPin className="w-6 h-6 text-rose-500" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white mb-2">Dirección</h3>
                                        <p className="text-gray-300 text-lg">Av. 29, Calle 48</p>
                                        <p className="text-gray-400">Mercedes, Buenos Aires</p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <div className="flex gap-3">
                            <a className="flex items-center px-4 py-3 bg-rose-600 hover:bg-rose-600 rounded-md text-white text-sm font-semibold" href="https://maps.app.goo.gl/mpWfZ32yUaZ6Xbbr6" target='_blank'>
                                <Navigation className="w-4 h-4 mr-2" />
                                Cómo Llegar
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HowArriveSection