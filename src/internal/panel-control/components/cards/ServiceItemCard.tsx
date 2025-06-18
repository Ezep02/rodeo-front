import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Edit, Trash2 } from "lucide-react"
import { Service } from "../../models/ServicesModels"


type ServiceItemProp = {
    ServiceData: Service
    onDelete: (service_to_delete: Service)=> void
    onUpdate?: ()=> void
}

const ServiceItem: React.FC<ServiceItemProp> = ({ ServiceData, onDelete}) => {
    return (
        <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-rose-500/30 transition-colors">
            <div className="flex sm:items-center justify-between sm:flex-row flex-col">
                <div className="space-y-1">
                    <h3 className="font-medium text-white">{ServiceData.title}</h3>
                    <p className="text-gray-400 text-sm">{ServiceData.description}</p>
                </div>

                <div className="flex items-center gap-4">
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                        <Clock className="w-3 h-3 mr-1" />
                        {ServiceData.service_duration}
                    </Badge>
                    <span className="font-medium text-rose-500">${ServiceData.price}</span>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-700">
                            <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                            onClick={()=> onDelete(ServiceData)}
                            variant="ghost" size="icon" 
                            className="text-gray-400 hover:text-white hover:bg-gray-700"

                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceItem