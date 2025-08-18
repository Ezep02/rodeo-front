import { Product } from "../../models/ServicesModels"
import { DollarSign, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { TbTags } from "react-icons/tb"
import { GiBullHorns } from "react-icons/gi"

type ServiceItemProp = {
    product: Product
    onEdit?: (product: Product) => void
    onDelete?: (id: number) => void
}

const ServiceItem: React.FC<ServiceItemProp> = ({ product, onEdit, onDelete }) => {
    return (
        <div className="flex flex-wrap md:flex-nowrap border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition bg-white">
            {/* Left preview image area as background */}
            <div className="w-full md:w-40 h-32 md:h-auto flex items-center justify-center bg-gray-100">
                {product.preview_url ? (
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${product.preview_url})` }}
                    />
                ) : (
                    <GiBullHorns size={40} className="text-gray-400" />
                )}
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col justify-between gap-2">
                <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-gray-800">{product.name}</h4>
                    <p className="text-xs text-gray-600">{product.description || "Sin descripción"}</p>

                    <div className="flex items-center gap-1 text-xs mt-1">
                        <TbTags className="w-4 h-4 text-gray-400" />
                        <span
                            className="px-2 py-0.5 rounded text-white"
                            style={{ backgroundColor: product.category?.color || "#aaa" }}
                        >
                            {product.category?.name || "Sin categoría"}
                        </span>
                    </div>

                    <div className="flex items-center text-green-600 font-semibold text-sm gap-1">
                        <DollarSign className="w-4 h-4" />
                        {product.price}
                    </div>
                </div>

                {/* Acciones */}
                <div className="flex justify-end gap-2 mt-2">
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={() => onEdit?.(product)}
                    >
                        <Edit className="w-4 h-4 text-gray-600" />
                    </Button>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button size="icon" variant="ghost" className="h-8 w-8">
                                <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Eliminar Servicio</AlertDialogTitle>
                                <AlertDialogDescription>
                                    ¿Estás seguro de que quieres eliminar "{product.name}"? Esta acción no se puede
                                    deshacer.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => onDelete?.(product.id)}>
                                    Eliminar
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </div>
    )
}

export default ServiceItem
