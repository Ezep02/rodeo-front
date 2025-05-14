import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
        < section >
            <div className="flex items-center gap-2 mb-6">
                <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                <h2 className="text-2xl font-bold">Reseñas</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {
                    Array.isArray(testimonios) && testimonios.length > 0 ? (
                        <>
                            {
                                testimonios.map((t) => (
                                    <Card
                                        key={t.id}
                                    >
                                        <CardHeader>
                                            <div className="flex justify-between">
                                                <CardTitle>{t.nombre}</CardTitle>
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
                                                    ))}
                                                </div>
                                            </div>
                                            <CardDescription>{t.fecha}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p>{t.comentario}</p>
                                        </CardContent>
                                    </Card>
                                ))
                            }

                        </>
                    ) : (
                        <p>Sin testimonios</p>
                    )
                }
            </div>

            <div className="flex justify-center mt-6">
                <Button variant="outline">Ver todas las reseñas</Button>
            </div>
        </section >
    )
}

export default Reviews
