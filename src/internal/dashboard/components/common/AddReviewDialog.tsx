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
import React, { startTransition, useActionState, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CustomerPreviousOrder } from '../../models/OrderModels'
import { cn } from '@/lib/utils'
import { ReviewRequest } from '../../models/Reviews'
import { CreateReview } from '../../services/Reviews'

type FormValues = {
    comment: string
    rating: number
}



type AddReviewDialogProps = {
    previousOrder: CustomerPreviousOrder
}

const AddReviewDialog: React.FC<AddReviewDialogProps> = ({ previousOrder }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedTags, setSelectedTags] = useState<string[]>([])

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

    const [_, reviewingAction, isreviewingPending] = useActionState(
        async (_: void | null, data: FormValues) => {
            // Aquí iría tu lógica para enviar
            const { comment, rating } = data

            try {

                const reviewBuilder: ReviewRequest = {
                    Schedule_id: previousOrder.shift_id,
                    Order_id: previousOrder.ID,
                    Comment: comment,
                    Rating: rating
                }

                const response = await CreateReview(reviewBuilder)
                // actualizar la review con los datos
                console.log(response)
                // enviar la respuesta
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
        // setIsOpen(false)
    }

    const quickTags = [
        "Excelente atención",
        "Muy profesional",
        "Ambiente agradable",
        "Buen precio",
        "Lo recomiendo",
    ]

    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-4">
                <p className="text-amber-800 text-sm mb-3">
                    ¡Comparte tu experiencia! Tu reseña ayuda a otros clientes, y nos permite mejorar nuestro servicio.
                </p>
                <DialogTrigger asChild>
                    <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white gap-2">
                        <Star className="h-4 w-4" />
                        Agregar Reseña
                    </Button>
                </DialogTrigger>
            </div>

            <DialogContent className="sm:max-w-[450px] sm:h-auto h-full p-0 overflow-hidden sm:rounded-xl">
                {
                    isreviewingPending ? (
                        <DialogHeader>
                            <div className="w-full flex flex-col items-center justify-center gap-4 py-8">
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
                        <>
                            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                                <div className="flex flex-col items-center gap-3">
                                    <DialogHeader>
                                        <DialogTitle className="text-xl font-bold text-center text-slate-900">
                                            ¿Qué te pareció el servicio <span className="text-rose-500">{previousOrder.title}</span>?
                                        </DialogTitle>
                                    </DialogHeader>
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
                                                        "h-10 w-10 transition-colors",
                                                        star <= rating ? "text-amber-400 fill-amber-400" : "text-slate-200"
                                                    )}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-center text-sm font-medium text-slate-500">
                                        {rating > 0 ? `${rating} ${rating === 1 ? "estrella" : "estrellas"}` : "Califica con estrellas"}
                                    </p>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="comment" className="text-sm font-medium text-zinc-700">
                                        Descripción
                                    </label>
                                    <textarea
                                        id="comment"
                                        rows={6}
                                        placeholder="Comparte tu experiencia..."
                                        className="w-full p-3 rounded-md text-sm text-zinc-900 border border-slate-200 resize-none focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300"
                                        {...register("comment")}
                                    />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-slate-700 mb-3">Etiquetas rápidas</p>
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
                                                        : "hover:bg-rose-50 hover:border-rose-200 hover:text-rose-700"
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
                                        variant="outline"
                                        onClick={() => setIsOpen(false)}
                                        className="flex-1"
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={rating === 0 || isreviewingPending}
                                        className="flex-1 bg-rose-500 hover:bg-rose-600 gap-2 text-white"
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
                        </>
                    )
                }
            </DialogContent>
        </Dialog>
    )
}

export default AddReviewDialog
