import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Service, ServiceRequest } from "../../models/ServicesModels"


type ServiceFormModalProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (service: Omit<ServiceRequest, "id">) => void
    initialData?: Service
    mode: "create" | "edit"
}

export function ServiceFormModal({ open, onOpenChange, onSubmit, initialData, mode }: ServiceFormModalProps) {

    const [formData, setFormData] = useState<Omit<ServiceRequest, "id">>({
        title: initialData?.title || "",
        description: initialData?.description || "",
        service_duration: initialData?.service_duration || 30,
        price: initialData?.price || 0,
    })

    const handleChange = (field: string, value: string | number) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
        onOpenChange(false)
    }

    

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{mode === "create" ? "Agregar nuevo servicio" : "Editar servicio"}</DialogTitle>
                    <DialogDescription>
                        {mode === "create"
                            ? "Completa los detalles para agregar un nuevo servicio."
                            : "Actualiza los detalles del servicio."}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="title" className="text-right">
                                Nombre
                            </label>
                            <input
                                id="titles"
                                value={formData.title}
                                onChange={(e) => handleChange("title", e.target.value)}
                                className="col-span-3 p-2 border rounded-md border-zinc-200 text-sm"
                                placeholder="Nombre del servicio"
                                type="text"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="description" className="text-right">
                                Descripción
                            </label>
                            <textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => handleChange("description", e.target.value)}
                                placeholder="Una breve descripción del servicio"
                                className="col-span-3 p-2 border rounded-md border-zinc-200 resize-none text-sm"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="service_duration" className="text-right">
                                Duración (min)
                            </label>
                            <input
                                id="service_duration"
                                type="number"
                                value={formData.service_duration}
                                onChange={(e) => handleChange("service_duration", Number.parseInt(e.target.value))}
                                className="col-span-3 p-2 border rounded-md border-zinc-200 text-sm"
                                min={5}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="price" className="text-right">
                                Precio
                            </label>
                            <input
                                id="price"
                                type="number"
                                value={formData.price}
                                onChange={(e) => handleChange("price", Number.parseFloat(e.target.value))}
                                className="col-span-3 p-2 border rounded-md border-zinc-200 text-sm"
                                min={0}
                                step={0.01}
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">{mode === "create" ? "Agregar" : "Guardar cambios"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
