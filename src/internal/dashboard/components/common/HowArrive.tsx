import { MapPin } from 'lucide-react'
import React from 'react'

const HowArrive: React.FC = () => {
    return (
        <section className="grid md:grid-cols-2 gap-8 bg-slate-50 p-6 rounded-xl">
            <div className="space-y-4 flex flex-col">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-rose-500" />
                    Cómo llegar?
                </h2>
                <p className="text-slate-600">Av. 29, Calle 48</p>

                <p className="text-slate-600">
                    Estamos ubicados en el centro de la ciudad, a solo 5 minutos de la estación principal.
                </p>

                <div className='py-2'>
                    <a className="px-4 py-3 bg-zinc-900 rounded-md text-white text-sm font-semibold" href="https://maps.app.goo.gl/mpWfZ32yUaZ6Xbbr6" target='_blank'>
                        Ver Ubicacion
                    </a>
                </div>
            </div>
            <div className="bg-slate-200 rounded-lg min-h-[200px] flex items-center justify-center">
                <picture className='rounded-xl shadow-md'>
                    <source srcSet="./location.webp" type="image/webp" />
                    <img src="./location.webp" alt="Mapa de ubicación" />
                </picture>
            </div>
        </section>
    )
}

export default HowArrive
