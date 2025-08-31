import React, { startTransition, useActionState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FaArrowLeft } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { TbTags } from 'react-icons/tb'
import { Upload } from 'lucide-react'
import { Category } from '../../models/Category'
import clsx from 'clsx'


type CategoryForm = {
    name: string
    color: string
}

type Props = {
    onClose: () => void
    open: boolean
    mode?: 'create' | 'edit'
    initialData?: Category
    onEditSubmit?: (updatedCategory: Category) => Promise<void>
    onCreateSubmit?: (newCategory: Omit<Category, "id" | "created_at" | "updated_at">) => Promise<void>
}

const colorOptions = [
    '#FF6B6B', // coral rojo
    '#F7B801', // amarillo dorado
    '#6BCB77', // verde menta
    '#4D96FF', // azul suave
    '#9B5DE5', // violeta brillante
    '#00BBF9', // celeste
    '#FFC6FF', // rosado pastel
    '#FEE440', // amarillo pastel
    '#B8F2E6', // verde agua
    '#FF9F1C', // naranja vibrante
]


const CategoryDialog: React.FC<Props> = ({
    onClose,
    open,
    mode = 'create',
    initialData,
    onEditSubmit,
    onCreateSubmit
}) => {
    const isEditMode = mode === 'edit'

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
    } = useForm<CategoryForm>()


    useEffect(() => {
        if (isEditMode && initialData) {
            reset({
                name: initialData.name,
                color: initialData.color || '#000000',
            })
        } else {
            reset({
                name: '',
                color: '#000000',
            })
        }
    }, [isEditMode, initialData, reset])

    const [_, submitCategoryAction, isPending] = useActionState(
        async (_: void | null, data: CategoryForm) => {
            try {
                if (isEditMode && initialData && onEditSubmit) {
                    await onEditSubmit({ ...initialData, ...data })
                } else if (onCreateSubmit){
                    await onCreateSubmit(data)
                    reset()
                }
                onClose()
            } catch (err) {
                console.error('Error al guardar la categoría:', err)
            }
        },
        undefined
    )

    const startSubmitTransition = (formData: CategoryForm) => {
        startTransition(() => {
            submitCategoryAction(formData)
        })
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="md:max-w-md max-w-sm p-6 rounded-3xl shadow-2xl bg-zinc-50">
                <DialogHeader className="mb-6 pt-2">
                    <div className="flex items-start flex-col gap-3">
                        <div className="flex items-center gap-4 mb-6">
                            <button
                                className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition"
                                onClick={onClose}
                            >
                                <FaArrowLeft size={18} className="text-zinc-700" />
                            </button>
                            <h1 className="text-lg font-semibold text-zinc-700">
                                {isEditMode ? 'Editar Categoría' : 'Nueva Categoría'}
                            </h1>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-zinc-900 rounded-xl text-white">
                                <TbTags size={24} />
                            </div>
                            <div>
                                <DialogTitle className="text-lg font-semibold text-zinc-700">
                                    Organiza tus productos
                                </DialogTitle>
                                <DialogDescription>
                                    Crea o modifica categorías para agrupar tus servicios y mejorar la navegación.
                                </DialogDescription>
                            </div>
                        </div>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit(startSubmitTransition)} className="space-y-6 px-1">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2">Nombre</label>
                            <input
                                {...register('name', { required: true })}
                                className="w-full p-3 border border-zinc-300 rounded-2xl"
                                placeholder="Nombre de la categoría"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-1">Color</label>
                            <div className="flex gap-2 flex-wrap">
                                {colorOptions.map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        className={clsx(
                                            'w-8 h-8 rounded-full border-2 transition',
                                            watch('color') === color
                                                ? 'ring-2 ring-offset-2 ring-zinc-600 border-zinc-900'
                                                : 'border-transparent'
                                        )}
                                        style={{ backgroundColor: color }}
                                        onClick={() => setValue('color', color)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
                        <Button type="submit" disabled={isPending}>
                            <Upload className="w-4 h-4 mr-2" />
                            {isEditMode ? 'Guardar Cambios' : 'Crear Categoría'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CategoryDialog
