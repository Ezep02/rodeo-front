import { Badge } from "@/components/ui/badge"
import { Product } from "../../models/ServicesModels"
import DeleteServicePopUp from "../dialogs/DeleteServicePopUp"
import UpdateProductDialog from "../dialogs/UpdateProduct"


type ServiceItemProp = {
    product: Product
    onUpdate?: () => void
}

const ServiceItem: React.FC<ServiceItemProp> = ({ product }) => {
    return (
        <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-rose-500/30 transition-colors">
            <div className="flex sm:items-center justify-between sm:flex-row flex-col">
                <div className="space-y-1">
                    <h3 className="font-medium text-white">{product.name}</h3>
                    <p className="text-gray-400 text-sm">{product.description}</p>
                </div>

                <div className="flex items-center gap-4">
                    <Badge variant="outline" className="border-gray-400 text-green-400">
                        ${product.price}
                    </Badge>
                    <div className="flex gap-2">
                        <UpdateProductDialog
                            Prod={product}
                        />

                        <DeleteServicePopUp
                            Prod={product}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceItem