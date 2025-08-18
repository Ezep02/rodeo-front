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
import { FaArrowLeft } from 'react-icons/fa6'

import { TbPencil } from "react-icons/tb";
import ErrorAlert from '@/components/alerts/ErrorAlert'

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

    const [onErrorMsg, setOnErrorMsg] = useState<string>("")
    const [showAlert, setShowAlert] = useState<boolean>(false)

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
            } catch (error: any) {
                console.log(error)
                setOnErrorMsg(error?.data?.error || "error creando review")
                setShowAlert(true)
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
                className="w-full h-full p-6 bg-zinc-50 flex flex-col
                           overflow-y-auto shadow-2xl md:rounded-3xl
                           max-w-full  
                           md:max-w-xl md:max-h-[60vh] md:min-h-[40vh]"
            >
                <DialogHeader className="mb-4">
                    <div className="flex items-center gap-4 mb-6">
                        <button
                            className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition"
                            onClick={HandleIsOpen}
                        >
                            <FaArrowLeft size={18} className="text-zinc-700" />
                        </button>
                        <h1 className="text-xl font-bold text-zinc-800">
                            Reseña
                        </h1>
                    </div>



                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-zinc-900 rounded-xl text-white">

                            <TbPencil size={24} />
                        </div>
                        <div>
                            <DialogTitle className="text-lg font-semibold text-zinc-700 text-start">
                                ¿Cómo te fue? Podés dejar tu reseña acá.
                            </DialogTitle>
                            <DialogDescription className="text-zinc-600 mt-1 text-start">
                                Tu opinión es importante para que podamos seguir mejorando nuestros servicios
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <ErrorAlert
                    message={onErrorMsg}
                    show={showAlert}
                    onClose={() => setShowAlert(false)}
                />

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-grow gap-6">

                    {/* Cargando... */}
                    {isreviewingPending && (
                        <div className="w-full flex flex-col items-center justify-center gap-4">
                            <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
                            <DialogTitle className="text-center text-lg font-semibold text-slate-800 flex items-center gap-2">
                                Enviando Reseña
                                <Send className="w-5 h-5 text-rose-500" />
                            </DialogTitle>
                            <DialogDescription>
                                Esto puede tardar unos segundos...
                            </DialogDescription>
                        </div>
                    )}

                    {/* Comentario */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="comment" className="text-sm font-medium text-zinc-600">
                            Comentario
                        </label>
                        <textarea
                            id="comment"
                            rows={5}
                            placeholder="¿Cómo fue tu experiencia?"
                            className="w-full p-3 text-sm text-zinc-900 bg-white border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-rose-500 placeholder-zinc-400"
                            {...register("comment")}
                            disabled={isreviewingPending}
                        />
                    </div>

                    {/* Etiquetas rápidas */}
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-zinc-600">Etiquetas rápidas</p>
                        <div className="flex flex-wrap gap-2">
                            {quickTags.map((tag) => (
                                <Button
                                    key={tag}
                                    type="button"
                                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                                    className={cn(
                                        "h-8 text-xs transition",
                                        selectedTags.includes(tag)
                                            ? "bg-rose-500 hover:bg-rose-600 text-white"
                                            : "border-gray-300 text-zinc-600 hover:border-rose-400 hover:text-rose-500"
                                    )}
                                    onClick={() => handleTagClick(tag)}
                                    disabled={isreviewingPending}
                                >
                                    {tag}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Acciones */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setIsOpen(false)}
                            disabled={isreviewingPending}
                            className="flex-1 border border-gray-300 text-zinc-600 hover:text-zinc-700 hover:border-zinc-400"
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
            </DialogContent>
        </Dialog>
    )
}

export default AddReviewDialog