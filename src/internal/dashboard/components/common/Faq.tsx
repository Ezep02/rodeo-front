import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import React from 'react'

const Faq: React.FC = () => {
    return (
        <section>
            <div className="flex items-center gap-2 mb-6">
                <h2 className="text-2xl font-bold">Preguntas frecuentes</h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>¿Cómo puedo cancelar mi cita?</AccordionTrigger>
                    <AccordionContent>
                        Puedes cancelar tu cita hasta 2 horas antes sin costo alguno. Para hacerlo, ingresa a tu perfil y
                        selecciona la opción "Cancelar cita" o contáctanos directamente por teléfono.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                    <AccordionTrigger>¿Qué métodos de pago aceptan?</AccordionTrigger>
                    <AccordionContent>
                        Aceptamos efectivo, tarjetas de crédito/débito, transferencias bancarias y pagos móviles como Apple Pay
                        y Google Pay.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                    <AccordionTrigger>¿Necesito llevar algo para mi cita?</AccordionTrigger>
                    <AccordionContent>
                        No es necesario que traigas nada especial. Sin embargo, si tienes alguna referencia o imagen del estilo
                        que deseas, puedes mostrarla a nuestros barberos para obtener mejores resultados.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    )
}

export default Faq
