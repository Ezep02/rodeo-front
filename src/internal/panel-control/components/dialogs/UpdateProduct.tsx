import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { AlertCircle, Edit, Scissors } from 'lucide-react'
import React, { startTransition, useActionState, useContext, useState } from 'react'
import { Product } from '../../models/ServicesModels'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { useForm } from 'react-hook-form'
import { UpdateProduct } from '../../services/product_service'
import { PanelControlContext } from '@/context/PanelControlContext'

type Props = {
    Prod: Product
}

const UpdateProductDialog: React.FC<Props> = ({ Prod }) => {
    const { setProductList } = useContext(PanelControlContext)!

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const HandleIsOpen = () => {
        setIsOpen((prev) => !prev)
    }

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<Product>({
        defaultValues: {
            name: Prod.name,
            description: Prod.description,
            price: Prod.price,
            category: Prod.category,
            preview_url: Prod.preview_url
        }
    })

    const selectedCategory = watch('category')

    const categories = [
        { id: 'cortes', name: 'Cortes', color: 'bg-blue-500' },
        { id: 'barbas', name: 'Barbas', color: 'bg-green-500' },
        { id: 'combos', name: 'Combos', color: 'bg-rose-500' }
    ]

    const [_, startFormAction, isFormPending] = useActionState(
        async (_: string | null, data: Product) => {
            try {
                const updatedData = {
                    ...data,
                    id: Prod.id
                }

                const res = await UpdateProduct(updatedData, Prod.id)

                if (res.product) {
                    setProductList((prev) =>
                        prev.map((prod) => (prod.id === res.product.id ? res.product : prod))
                    )
                    HandleIsOpen()
                }

                return null
            } catch (error: any) {
                console.warn(error)
                return error?.response?.data?.error || 'Ocurrió un error actualizando el producto'
            }
        },
        null
    )

    const handleStartTransition = (data: Product) => {
        startTransition(() => {
            startFormAction(data)
        })
    }

    const fieldClass =
        'bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors'

    return (
        <Dialog open={isOpen} onOpenChange={HandleIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-black hover:bg-gray-200"
                >
                    <Edit className="w-4 h-4" />
                </Button>
            </DialogTrigger>

            <DialogContent className="lg:max-w-4xl max-w-full bg-gray-50 border border-gray-200 text-gray-900 overflow-y-auto">
                <DialogHeader className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-rose-500/20 rounded-lg flex items-center justify-center">
                            <Scissors className="w-5 h-5 text-rose-500" />
                        </div>
                        <div className="text-start">
                            <DialogTitle>Editar servicio</DialogTitle>
                            <DialogDescription>
                                Modifica los detalles del servicio existente
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="grid grid-cols-1 gap-6">
                    {isFormPending ? (
                        <div className="lg:col-span-3 sm:col-span-2">
                            <div className="w-full flex justify-center items-center flex-col gap-1 p-5">
                                <p className="loader"></p>
                                <span>Procesando...</span>
                            </div>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit(handleStartTransition)}
                            className="flex flex-col space-y-6 col-span-full lg:col-span-1"
                        >
                            <div className="space-y-2">
                                <Label htmlFor="name">Nombre *</Label>
                                <Input
                                    id="name"
                                    {...register('name', { required: true })}
                                    placeholder="Nombre del servicio"
                                    className={fieldClass}
                                />
                                {errors.name && (
                                    <p className="text-red-600 text-sm">Este campo es obligatorio</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label className="font-medium">Categoría *</Label>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((category) => (
                                        <Badge
                                            key={category.id}
                                            variant={selectedCategory === category.id ? 'default' : 'outline'}
                                            className={`cursor-pointer transition-colors ${selectedCategory === category.id
                                                    ? `${category.color} text-white`
                                                    : 'border-gray-400 text-gray-700 hover:bg-gray-100'
                                                }`}
                                            onClick={() => setValue('category', category.id)}
                                        >
                                            {category.name}
                                        </Badge>
                                    ))}
                                </div>
                                {errors.category && (
                                    <div className="flex items-center gap-1 text-red-500 text-sm">
                                        <AlertCircle className="w-3 h-3" />
                                        <span>Debes seleccionar una categoría</span>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Descripción *</Label>
                                <Textarea
                                    id="description"
                                    {...register('description', { required: true })}
                                    placeholder="Descripción del servicio"
                                    className={`${fieldClass} min-h-[100px]`}
                                />
                                {errors.description && (
                                    <p className="text-red-600 text-sm">Este campo es obligatorio</p>
                                )}
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="price">Precio *</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        {...register('price', { required: true, valueAsNumber: true })}
                                        className={fieldClass}
                                    />
                                    {errors.price && (
                                        <p className="text-red-600 text-sm">Campo requerido</p>
                                    )}
                                </div>
                            </div>

                            <DialogFooter className="pt-4">
                                <Button
                                    type="submit"
                                    className="w-full bg-rose-500 hover:bg-rose-600 text-white"
                                >
                                    Guardar Cambios
                                </Button>
                            </DialogFooter>
                        </form>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProductDialog
