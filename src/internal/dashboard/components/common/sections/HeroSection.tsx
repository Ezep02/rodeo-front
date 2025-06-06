import { Button } from '@/components/ui/button'
import React from 'react'
import { GiBullHorns } from 'react-icons/gi'

const HeroSection: React.FC = () => {
    return (
        <section className="pb-6 bg-gray-950">
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
                    {/* Text section */}
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <h1 className="lg:text-7xl text-5xl font-bold text-white leading-tight">
                                <span className="text-rose-500">El Rodeo </span>
                                <br />Tu barberia de confianza
                            </h1>
                            <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
                                En El Rodeo, no importa si venís por primera vez o si ya sos de la casa, siempre te vas a sentir bienvenido. Más que una barbería, es un espacio pensado para que te relajes, te sientas cómodo y te vayas con la mejor versión de vos. Acá el corte es solo una parte, lo que nos define es la atención y la buena onda. Porque cuando el trato es de calidad, el resultado también lo es.
                            </p>
                        </div>

                        <div className="flex items-center gap-4">

                            <Button className='bg-rose-500'>
                                Reservar Cita
                            </Button>
                        </div>
                    </div>

                    {/* Icon section */}
                    <div className="relative">
                        <div className="relative z-10">
                            <div className="w-full max-w-md mx-auto rounded-2xl bg-gray-900/60 backdrop-blur-lg flex items-center justify-center h-[450px] shadow-2xl border border-gray-800">
                                <GiBullHorns size={120} className="text-rose-600" />
                            </div>
                        </div>

                        {/* Floating message cards */}
                        <div className="absolute top-16 -right-8 bg-rose-600/10 backdrop-blur-xl border border-rose-600/30 rounded-2xl p-4 text-white shadow-lg max-w-[220px]">
                            <div className="text-sm text-gray-300">Acá todos son bienvenidos</div>
                            <div className="text-lg font-semibold mt-1 text-white">
                                Seas nuevo o de la casa, este es tu lugar.
                            </div>
                        </div>

                        <div className="absolute bottom-16 -left-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-white shadow-lg max-w-[220px]">
                            <div className="flex items-start gap-3">

                                <div>
                                    <div className="text-base font-semibold">Buen trato, buena vibra</div>
                                    <div className="text-sm text-gray-400">Eso es lo que nos hace distintos</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
