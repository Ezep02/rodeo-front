import React, { startTransition, useActionState, useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Scissors, AlertCircle, Plus } from "lucide-react"
import { Product } from "../../models/ServicesModels"
import { PanelControlContext } from "@/context/PanelControlContext"
import { CreateProduct } from "../../services/product_service"

const ServiceFormModal: React.FC = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<Product>({
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            category: "cortes",
            preview_url: ""
        },
    })

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const toggleOpen = () => setIsOpen((prev) => !prev)

    const { setProductList } = useContext(PanelControlContext)!
    const selectedCategory = watch("category")

    const [_, startFormAction, isFormPending] = useActionState(
        async (_: string | null, data: Product) => {
            try {
                const updatedData = { ...data }
                const res = await CreateProduct(updatedData)
                if (res.product) {
                    setProductList((prev) => [...prev, res.product])
                    toggleOpen()
                }
                return null
            } catch (error: any) {
                console.warn(error)
                return error?.response?.data?.error || "Ocurrió un error creando el producto"
            }
        },
        null
    )

    const handleStartTransition = (data: Product) => {
        startTransition(() => {
            startFormAction(data)
        })
    }

    const categories = [
        { id: "cortes", name: "Cortes", color: "bg-blue-500" },
        { id: "barbas", name: "Barbas", color: "bg-green-500" },
        { id: "combos", name: "Combos", color: "bg-rose-500" },
    ]

    return (
        <>
            {/* Header de sección */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-rose-500/20 rounded-lg flex items-center justify-center">
                        <Scissors className="w-5 h-5 text-rose-500" />
                    </div>
                    <div>
                        <h2 className="text-sm sm:text-2xl font-bold text-white">Gestión de Servicios</h2>
                        <p className="text-gray-400 text-sm">Administra tus servicios y horarios</p>
                    </div>
                </div>

                <Dialog open={isOpen} onOpenChange={toggleOpen}>
                    <DialogTrigger asChild>
                        <Button className="flex gap-2 bg-gray-800 hover:bg-gray-700 text-white">
                            <Plus className="w-4 h-4" />
                            Agregar
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="lg:max-w-3xl h-full sm:h-auto w-full sm:rounded-xl bg-white border border-gray-200 text-gray-900 p-6 shadow-xl">
                        <DialogHeader className="mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                                    <Scissors className="w-5 h-5 text-rose-500" />
                                </div>
                                <div>
                                    <DialogTitle className="text-xl font-semibold">Nuevo servicio</DialogTitle>
                                    <DialogDescription className="text-gray-500">
                                        Completa los detalles del servicio
                                    </DialogDescription>
                                </div>
                            </div>
                        </DialogHeader>

                        {isFormPending ? (
                            <div className="flex flex-col items-center gap-2 py-10">
                                <p className="loader" />
                                <span className="text-gray-500">Guardando servicio...</span>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(handleStartTransition)} className="space-y-5">
                                <div>
                                    <Label htmlFor="name">Nombre *</Label>
                                    <Input
                                        id="name"
                                        {...register("name", { required: true })}
                                        placeholder="Ej. Corte clásico"
                                        className="mt-1 bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none"
                                    />


                                    {errors.name && <p className="text-red-500 text-sm mt-1">Campo obligatorio</p>}
                                </div>

                                <div>
                                    <Label htmlFor="description">Descripción *</Label>
                                    <Textarea
                                        id="description"
                                        {...register("description", { required: true })}
                                        placeholder="Describe el servicio..."
                                        className="mt-1 bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 min-h-[100px] focus:outline-none"
                                    />

                                    {errors.description && <p className="text-red-500 text-sm mt-1">Campo obligatorio</p>}
                                </div>

                                <div>
                                    <Label htmlFor="price">Precio *</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        {...register("price", { required: true, valueAsNumber: true })}
                                        className="mt-1 bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none"
                                    />

                                    {errors.price && <p className="text-red-500 text-sm mt-1">Campo obligatorio</p>}
                                </div>

                                <div>
                                    <Label>Categoría *</Label>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {categories.map((cat) => (
                                            <Badge
                                                key={cat.id}
                                                variant={selectedCategory === cat.id ? "default" : "outline"}
                                                className={`cursor-pointer px-3 py-1 rounded-full text-sm transition
                                                    ${selectedCategory === cat.id
                                                        ? `${cat.color} text-white`
                                                        : "border border-gray-300 text-gray-600 hover:bg-gray-100"}
                                                `}
                                                onClick={() => setValue("category", cat.id)}
                                            >
                                                {cat.name}
                                            </Badge>
                                        ))}
                                    </div>
                                    {errors.category && (
                                        <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                                            <AlertCircle className="w-4 h-4" />
                                            <span>Selecciona una categoría</span>
                                        </div>
                                    )}
                                </div>

                                <DialogFooter className="pt-4">
                                    <Button
                                        type="submit"
                                        className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold tracking-wide"
                                    >
                                        Agregar Servicio
                                    </Button>
                                </DialogFooter>
                            </form>
                        )}
                    </DialogContent>

                </Dialog>
            </div>
        </>
    )
}

export default ServiceFormModal
