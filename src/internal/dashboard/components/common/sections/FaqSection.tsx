import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import React from 'react'

const FaqSection: React.FC = () => {
    return (
        <section className="py-24 px-6">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-white mb-6">
                        Preguntas <span className="text-rose-500">Frecuentes</span>
                    </h2>
                    <p className="text-xl text-gray-400">Resolvemos las dudas más comunes de nuestros clientes</p>
                </div>

                <Accordion type="single" collapsible className="space-y-4">
                    <AccordionItem value="item-1" className="border border-gray-800 rounded-xl bg-gray-900/30 px-6">
                        <AccordionTrigger className="text-white hover:text-rose-400 text-lg font-medium">
                            ¿Cómo puedo cancelar mi cita?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300 text-base leading-relaxed">
                            Puedes cancelar tu cita hasta 24 horas antes sin cargo. Para cancelar, inicia sesión en tu cuenta o
                            llámanos directamente al número de contacto.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2" className="border border-gray-800 rounded-xl bg-gray-900/30 px-6">
                        <AccordionTrigger className="text-white hover:text-rose-400 text-lg font-medium">
                            ¿Qué métodos de pago aceptan?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300 text-base leading-relaxed">
                            Aceptamos efectivo, tarjetas de crédito/débito (Visa, Mastercard, American Express), y pagos móviles como
                            Mercado Pago.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3" className="border border-gray-800 rounded-xl bg-gray-900/30 px-6">
                        <AccordionTrigger className="text-white hover:text-rose-400 text-lg font-medium">
                            ¿Necesito llevar algo para mi cita?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300 text-base leading-relaxed">
                            No es necesario traer nada especial. Si tienes alguna referencia o imagen del estilo que deseas, puedes
                            mostrarla a tu barbero para obtener mejores resultados.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>
    )
}

export default FaqSection

