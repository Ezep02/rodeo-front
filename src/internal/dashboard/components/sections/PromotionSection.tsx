import { Button } from '@/components/ui/button'
import React, { JSX } from 'react'

const PromotionSection: React.FC = () => {
    // Las promociones pueden venir luego de una API o de props
    const promotions: JSX.Element[] = []

    // Placeholder temporal
    const placeholder = (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center md:col-span-2 col-span-1">
            <div className="text-xl font-semibold mb-2">Próximamente</div>
            <p className="text-sm opacity-90 mb-4">
                Las promociones estarán disponibles muy pronto. ¡Mantente atento!
            </p>
            <Button className="bg-white text-orange-500 hover:bg-gray-100">Ver Servicios</Button>
        </div>
    )

    return (
        <div className="py-16 bg-gradient-to-r from-orange-500 to-red-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-1">Promociones Especiales</h2>
                    <p className="text-xl mb-8 opacity-90">Aprovecha nuestras ofertas limitadas</p>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {promotions.length > 0 ? promotions : placeholder}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PromotionSection
