import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'
import React from 'react'

interface Testimonio {
  id: number
  nombre: string
  comentario: string
  calificacion: number
  fecha: string
}

const Reviews: React.FC = () => {

    const testimonios: Testimonio[] = [
        {
            id: 1,
            nombre: "Juan Pérez",
            comentario: "Excelente servicio, el mejor fade que me han hecho.",
            calificacion: 5,
            fecha: "hace 2 días",
        },
        {
            id: 2,
            nombre: "Roberto García",
            comentario: "Muy profesionales y puntuales. Recomendado.",
            calificacion: 4,
            fecha: "hace 1 semana",
        },
        {
            id: 3,
            nombre: "Roberto García",
            comentario: "Muy profesionales y puntuales. Recomendado.",
            calificacion: 3,
            fecha: "hace 3 semana",
        },
        {
            id: 4,
            nombre: "Roberto García",
            comentario: "Muy profesionales y puntuales. Recomendado.",
            calificacion: 4,
            fecha: "hace 5 semana",
        },
        {
            id: 5,
            nombre: "Roberto García",
            comentario: "Muy profesionales y puntuales. Recomendado.",
            calificacion: 5,
            fecha: "hace 1 semana",
        },
        {
            id: 6,
            nombre: "Roberto García",
            comentario: "Muy profesionales y puntuales. Recomendado.",
            calificacion: 2,
            fecha: "hace 1 semana",
        },
    ]
    return (
        <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
                <Star className="h-4 w-4 text-yellow-500" />
                <h3 className="font-medium text-gray-900">Reseñas</h3>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-2 gap-2">
                {testimonios.map((testimonio) => (
                    <Card key={testimonio.id} className="border-gray-200">
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="font-medium">{testimonio.nombre}</div>
                                    <div className="text-sm text-gray-500">{testimonio.fecha}</div>
                                </div>
                                <div className="flex">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < testimonio.calificacion ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-700 text-sm mt-2">{testimonio.comentario}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Reviews
