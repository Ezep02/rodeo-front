import { Card } from "@/components/ui/card"
import { Search } from "lucide-react"
import { useProduct } from "../../hooks/useProduct"
import ServiceItem from "../cards/ServiceItemCard"
import ServiceFormModal from "../dialogs/ServiceFormModal"
import { useState } from "react"

const ServiceManagementSection = () => {

  const {
    productList,
  } = useProduct()


  // Filtrar servicios según el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = productList.filter((service) =>
    service.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <div className="p-6">
        
        <ServiceFormModal />


        {/* Search and Add */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              className='w-full flex border  border-zinc-300 text-sm font-medium focus:ring-1 pl-8 p-2 rounded-md outline-none ring-zinc-400 '
              placeholder='Buscar servicio...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="text-sm text-gray-400 mb-4">Servicios actualmente activos: {productList.length}</div>

        {/* Services List */}
        <div className="space-y-4">
          {filteredServices?.map((prod, idx) => (
            <ServiceItem
              key={idx}
              product={prod}
            />
          ))}
        </div>
      </div>
    </Card>
  )
}

export default ServiceManagementSection



