import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Scissors } from 'lucide-react'
import React from 'react'

const PromotionalBanner: React.FC = () => {
    return (
        <section className="rounded-xl bg-slate-900 text-white p-8 relative overflow-hidden">

            <div className="absolute right-0 top-0 h-full w-1/3 flex items-center justify-center opacity-20">
                <Scissors className="h-48 w-48 text-rose-500" />
            </div>
            
            <div className="max-w-2xl space-y-4">
                <Badge className="bg-rose-500 hover:bg-rose-600">Promoción de Mayo</Badge>
                <h1 className="text-3xl md:text-4xl font-bold">
                    20% de descuento en combo<br/> completo los martes y miércoles
                </h1>
                <p className="text-slate-300">
                    Reserva tu próximo servicio y disfruta de la mejor experiencia de barbería en la ciudad.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                    <Button size="lg" className="bg-rose-500 hover:bg-rose-600">
                        Reservar con Descuento
                    </Button>
                    <Button size="lg" variant="outline" className="text-zinc-900 border-white hover:bg-zinc-300">
                        Ver detalles
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default PromotionalBanner
