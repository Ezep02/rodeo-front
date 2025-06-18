import React, { startTransition, useActionState, useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Scissors, Upload, ImageIcon, X, AlertCircle, Check } from "lucide-react"
import { Service, ServiceRequest } from "../../models/ServicesModels"
import { CreateService } from "../../services/PanelServices"
import useCloudinary from "../../hooks/useCloudinary"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CloudinaryImage } from "../../models/Cloudinary"

type ServiceFormModalProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    initialData?: Service
    mode: "create" | "edit"
}

export function ServiceFormModal({ open, onOpenChange, initialData, mode }: ServiceFormModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ServiceRequest>({
        defaultValues: {
            title: "",
            description: "",
            service_duration: 30,
            price: 0,
            category: "cortes",
            preview_url: ""
        },
    })

    const selectedCategory = watch("category")

    const categories = [
        { id: "cortes", name: "Cortes", color: "bg-blue-500" },
        { id: "barbas", name: "Barbas", color: "bg-green-500" },
        { id: "color", name: "Color", color: "bg-purple-500" },
        { id: "combos", name: "Combos", color: "bg-rose-500" },
    ]

    const { cloudImgGallery } = useCloudinary()
    const [selectedImg, setImgSelected] = useState<CloudinaryImage | null>(null)

    const handleImageSelect = (image: CloudinaryImage | null) => {
        setImgSelected(image)
    }

    const [formErr, startFormAction, isFormPending] = useActionState(
        async (_: string | null, data: ServiceRequest) => {
            try {
                const updatedData = {
                    ...data,
                    preview_url: selectedImg?.url
                }

                const res = await CreateService(updatedData)
                console.log(res)
                return null
            } catch (error: any) {
                console.warn(error)
                return error?.response?.data || "Error de autenticación"
            }
        },
        null
    )

    const handleStartTransition = (data: ServiceRequest) => {
        startTransition(() => {
            startFormAction(data)
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="lg:max-w-7xl max-w-full lg:max-h-[90vh] max-h-screen bg-gray-900 border-gray-800 text-white overflow-y-auto">

                <DialogHeader className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-rose-500/20 rounded-lg flex items-center justify-center">
                            <Scissors className="w-5 h-5 text-rose-500" />
                        </div>
                        <div className="text-start">
                            <DialogTitle>
                                {mode === "create" ? "Agregar nuevo servicio" : "Editar servicio"}
                            </DialogTitle>
                            <DialogDescription>
                                {mode === "create"
                                    ? "Completa los detalles para agregar un nuevo servicio."
                                    : "Actualiza los detalles del servicio."}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">

                    {
                        isFormPending ? (
                            <>
                                <div className="lg:col-span-3 sm:col-span-2">
                                    <div className="w-full flex justify-center items-center flex-col gap-1 p-5">
                                        <p className="loader"></p>
                                        <span>Procesando..</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <section className="min-w-0 flex flex-col overflow-hidden gap-4 lg:col-span-2 col-span-full">
                                    <Card className="bg-gray-800/50 border border-gray-700 flex-1 overflow-hidden">
                                        <ScrollArea className="h-full">
                                            <div className="p-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                {Array.isArray(cloudImgGallery) && cloudImgGallery.length > 0 ? (
                                                    cloudImgGallery.map((img, idx) => (
                                                        <div
                                                            key={idx}
                                                            className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-all border ${selectedImg?.url === img.url
                                                                ? "border-rose-500 bg-rose-500/10"
                                                                : "border-transparent hover:bg-gray-800/40"
                                                                }`}
                                                            onClick={() => handleImageSelect(img)}
                                                        >
                                                            <img
                                                                src={img.url}
                                                                alt={img.display_name}
                                                                className="object-cover rounded-md border border-gray-600 w-full h-auto"
                                                            />
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-center py-8 space-y-3 col-span-full">
                                                        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mx-auto">
                                                            <ImageIcon className="w-6 h-6 text-gray-500" />
                                                        </div>
                                                        <p className="text-gray-400">No se encontraron imágenes</p>
                                                    </div>
                                                )}
                                            </div>
                                        </ScrollArea>
                                    </Card>

                                    {selectedImg && (
                                        <Card className="bg-gray-800/50 border border-gray-700 p-3 space-y-3">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Check className="w-5 h-5 text-green-500" />
                                                <span className="text-white font-medium">Imagen Seleccionada</span>
                                            </div>
                                            <div className="flex flex-col sm:flex-row items-start gap-4">
                                                <img
                                                    src={selectedImg.url}
                                                    alt="Imagen seleccionada"
                                                    className="w-full sm:w-20 h-auto object-cover rounded-lg border border-gray-600"
                                                />
                                                <div className="flex-1 space-y-1">
                                                    <p className="text-sm truncate text-gray-300">
                                                        {selectedImg.display_name ?? "Sin título"}
                                                    </p>
                                                    <p className="text-gray-400 text-sm">
                                                        {selectedImg.width} x {selectedImg.height} • {selectedImg.format.toUpperCase()}
                                                    </p>
                                                    <p className="text-gray-500 text-xs">{selectedImg.public_id}</p>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleImageSelect(null)}
                                                    className="text-gray-400 hover:text-white hover:bg-rose-500"
                                                >
                                                    Quitar
                                                </Button>
                                            </div>
                                        </Card>
                                    )}
                                </section>

                                {/* Formulario */}
                                <form
                                    onSubmit={handleSubmit(handleStartTransition)}
                                    className="flex flex-col space-y-6 col-span-full lg:col-span-1"
                                >
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Nombre *</Label>
                                        <Input
                                            id="title"
                                            {...register("title", { required: true })}
                                            placeholder="Nombre del servicio"
                                            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                                        />
                                        {errors.title && <p className="text-red-500 text-sm">Este campo es obligatorio</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-white font-medium">Categoría *</Label>
                                        <div className="flex flex-wrap gap-2">
                                            {categories.map((category) => (
                                                <Badge
                                                    key={category.id}
                                                    variant={selectedCategory === category.id ? "default" : "outline"}
                                                    className={`cursor-pointer transition-colors ${selectedCategory === category.id
                                                        ? `${category.color} text-white`
                                                        : "border-gray-600 text-gray-300 hover:bg-gray-800"
                                                        }`}
                                                    onClick={() => setValue("category", category.id)}
                                                >
                                                    {category.name}
                                                </Badge>
                                            ))}
                                        </div>
                                        {errors.category && (
                                            <div className="flex items-center gap-1 text-red-400 text-sm">
                                                <AlertCircle className="w-3 h-3" />
                                                <span>Debes seleccionar una categoría</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Descripción *</Label>
                                        <Textarea
                                            id="description"
                                            {...register("description", { required: true })}
                                            placeholder="Descripción del servicio"
                                            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 min-h-[100px]"
                                        />
                                        {errors.description && (
                                            <p className="text-red-500 text-sm">Este campo es obligatorio</p>
                                        )}
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="service_duration">Duración (min) *</Label>
                                            <Input
                                                id="service_duration"
                                                type="number"
                                                {...register("service_duration", { required: true, valueAsNumber: true })}
                                                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                                            />
                                            {errors.service_duration && (
                                                <p className="text-red-500 text-sm">Campo requerido</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="price">Precio *</Label>
                                            <Input
                                                id="price"
                                                type="number"
                                                step="0.01"
                                                {...register("price", { required: true, valueAsNumber: true })}
                                                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                                            />
                                            {errors.price && <p className="text-red-500 text-sm">Campo requerido</p>}
                                        </div>
                                    </div>

                                    <DialogFooter className="pt-4">
                                        <Button
                                            type="submit"
                                            className="w-full bg-rose-500 hover:bg-rose-600 text-white"
                                        >
                                            {mode === "create" ? "Agregar Servicio" : "Guardar Cambios"}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </>

                        )
                    }
                </div>


            </DialogContent>
        </Dialog>
    )
}
