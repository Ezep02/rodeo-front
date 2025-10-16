import { MapPin } from 'lucide-react'
import React from 'react'
import { BsInstagram } from 'react-icons/bs'
import { GiBullHorns } from 'react-icons/gi'

const FooterSection: React.FC = () => {
    return (
        <footer className="bg-black border-t border-gray-800 rounded-lg shadow-md">
            <div className="container mx-auto px-6 py-16">
                <div className="grid lg:grid-cols-4 gap-12">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center gap-1">
                            <div className="flex h-full items-center justify-center text-rose-500">
                                <GiBullHorns size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-zinc-50 cursor-pointer">
                                El Rodeo
                            </h3>
                        </div>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                            Tu barbería de confianza desde 2015. Ofrecemos servicios profesionales con la mejor atención y resultados
                            excepcionales.
                        </p>

                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white">Redes</h3>
                        <div className="space-y-3 text-gray-400">
                            <a className='flex gap-2' href='https://www.instagram.com/elrodeobarber/' target='_blank'>
                                <BsInstagram size={24}/> El Rodeo
                            </a>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white">Contacto</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-gray-400">
                                <MapPin className="w-5 h-5 text-rose-500" />
                                <span>Av. 29, Calle 48</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default FooterSection
