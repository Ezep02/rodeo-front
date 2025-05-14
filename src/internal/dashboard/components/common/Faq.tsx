import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Info } from 'lucide-react'
import React from 'react'

const Faq:React.FC = () => {
    return (
        <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
                <Info className="h-4 w-4 text-red-500" />
                <h3 className="font-medium text-gray-900">Preguntas frecuentes</h3>
            </div>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-sm font-medium">
                        ¿Cómo puedo cancelar mi cita?
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-600">
                        Puedes cancelar tu cita hasta 2 horas antes sin costo. Para cancelar, ve a la sección de
                        "Citas" y selecciona la opción de cancelar.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-sm font-medium">
                        ¿Qué métodos de pago aceptan?
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-600">
                        Aceptamos efectivo, tarjetas de crédito/débito y pagos móviles como Apple Pay y Google Pay.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="text-sm font-medium">
                        ¿Necesito llevar algo para mi cita?
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-600">
                        Solo necesitas llegar a tiempo. Si tienes alguna referencia o imagen del estilo que deseas,
                        puedes mostrarla a tu barbero.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>

    )
}

export default Faq
