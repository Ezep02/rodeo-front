import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Star, Send } from 'lucide-react'
import React, { startTransition, useActionState, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { Appointment } from '../../models/Appointment'
import { Review } from '../../models/Review'
import { CreateReview } from '../../services/reviews_service'
import { DashboardContext } from '@/context/DashboardContext'


type FormValues = {
    comment: string
    rating: number
}
type AddReviewDialogProps = {
    appointment: Appointment
}

const AddReviewDialog: React.FC<AddReviewDialogProps> = ({ appointment }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    const HandleIsOpen = () => {
        setIsOpen((prev) => !prev)
    }


    const {
        register,
        handleSubmit,
        watch,
        setValue,
    } = useForm<FormValues>({
        defaultValues: {
            comment: '',
            rating: 0,
        },
    })

    const comment = watch('comment')
    const rating = watch('rating')

    const handleTagClick = (tag: string) => {
        const isTagSelected = selectedTags.includes(tag)
        const updatedTags = isTagSelected
            ? selectedTags.filter((t) => t !== tag)
            : [...selectedTags, tag]

        setSelectedTags(updatedTags)

        if (!isTagSelected) {
            // Agregar al comment
            const needsSpace = comment && !comment.trim().endsWith('.') && !comment.endsWith(' ') ? ' ' : ''
            setValue('comment', `${comment}${needsSpace}${tag}`)
        } else {
            // Eliminar del comment
            const regex = new RegExp(`\\s*${tag}`, 'g')
            const cleaned = comment.replace(regex, '').trim()
            setValue('comment', cleaned)
        }
    }

    const {
        setCustomerAppointment
    } = useContext(DashboardContext)!

    const [_, reviewingAction, isreviewingPending] = useActionState(
        async (_: void | null, data: FormValues) => {
            // Aquí iría tu lógica para enviar
            const { comment, rating } = data

            try {

                const reviewReq: Review = {
                    appointment_id: appointment.id,
                    comment: comment,
                    rating: rating,
                }

                // TODO: SI todo bien, asignarle los datos a la review
                const res = await CreateReview(reviewReq)

                // Aquí podrías actualizar el estado o mostrar un mensaje de éxito si es necesario
                if (res) {
                   
                    setCustomerAppointment((prev) =>
                        prev.map((a) =>
                            a.id === appointment.id
                                ? {
                                    ...a,
                                    review: {
                                        id: 0,
                                        comment: res.review.comment,
                                        rating: res.review.rating,
                                        appointmentID: res.review.appointment_id,
                                    },
                                }
                                : a
                        )
                    )
                }
                // enviar la respuesta
                HandleIsOpen()
            } catch (error) {
                console.log(error)
            }
        },
        null
    )

    const onSubmit = (data: FormValues) => {
        startTransition(() => {
            reviewingAction(data)
        })
    }

    const quickTags = [
        "Excelente atención",
        "Muy profesional",
        "Ambiente agradable",
        "Buen precio",
        "Lo recomiendo",
    ]

    return (
        <Dialog open={isOpen} onOpenChange={HandleIsOpen}>
            <DialogTrigger asChild>
                <div className="flex gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setValue('rating', star)}
                            className="transition-transform duration-200 hover:scale-110"
                        >
                            <Star
                                className={cn(
                                    "h-5 w-5 transition-colors",
                                    star <= rating ? "text-amber-400 fill-amber-400" : "text-slate-200"
                                )}
                            />
                        </button>
                    ))}
                </div>
            </DialogTrigger>

            <DialogContent
                className="sm:max-w-[450px] sm:h-auto h-full p-0 overflow-hidden sm:rounded-xl bg-black transition-shadow border-zinc-600">
                {
                    isreviewingPending ? (
                        <DialogHeader>
                            <div className="w-full flex flex-col items-center justify-center gap-4 ">
                                <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
                                <DialogTitle className="text-center text-lg font-semibold text-slate-800 flex items-center gap-2">
                                    Enviando Reseña
                                    <Send className="w-5 h-5 text-rose-500" />
                                </DialogTitle>
                                <DialogDescription>
                                    Esto puede tardar unos segundos...
                                </DialogDescription>
                            </div>
                        </DialogHeader>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6 bg-gray-900/50 border-gray-800 sm:rounded-md shadow-md">
                            <div className="flex flex-col items-start gap-3">
                                <DialogHeader>
                                    <DialogTitle className="text-xl text-start font-bold text-rose-500">
                                        ¿Qué te pareció el servicio <span className="text-rose-400">{ }</span>?
                                    </DialogTitle>
                                    <DialogDescription className="text-sm text-start text-zinc-400">
                                        Tu opinión es importante para que podamos seguir mejorando nuestros servicios
                                    </DialogDescription>
                                </DialogHeader>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="comment" className="text-sm font-medium text-zinc-300">
                                    Descripción
                                </label>
                                <textarea
                                    id="comment"
                                    rows={6}
                                    placeholder="Comparte tu experiencia..."
                                    className="w-full p-3 text-sm text-zinc-100 bg-gray-800 border border-gray-700 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-rose-500 placeholder-zinc-500"
                                    {...register("comment")}
                                />
                            </div>

                            <div>
                                <p className="text-sm font-medium text-zinc-300 mb-3">Etiquetas rápidas</p>
                                <div className="flex flex-wrap gap-2">
                                    {quickTags.map((tag) => (
                                        <Button
                                            key={tag}
                                            type="button"
                                            variant={selectedTags.includes(tag) ? "default" : "outline"}
                                            className={cn(
                                                "h-8 text-xs",
                                                selectedTags.includes(tag)
                                                    ? "bg-rose-500 hover:bg-rose-600 text-white"
                                                    : "border-gray-600 text-zinc-300 hover:bg-gray-800 bg-transparent hover:border-rose-500 hover:text-rose-500 hover:bg-transparent"
                                            )}
                                            onClick={() => handleTagClick(tag)}
                                        >
                                            {tag}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <Button
                                    type="button"
                                    variant={"ghost"}
                                    onClick={() => setIsOpen(false)}
                                    className="flex-1 border border-gray-700 text-zinc-300 hover:text-zinc-400 bg-transparent hover:bg-transparent"
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={rating === 0 || isreviewingPending}
                                    className="flex-1 bg-rose-500 hover:bg-rose-600 text-white gap-2"
                                >
                                    {isreviewingPending ? (
                                        <>
                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-4 w-4" />
                                            Enviar Reseña
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    )
                }
            </DialogContent>
        </Dialog>
    )
}

export default AddReviewDialog