import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { Scissors, Search, Plus } from "lucide-react"
import { useServices } from "../../hooks/useServices"
import ServiceItem from "../cards/ServiceItemCard"
import { ServiceFormModal } from "../dialogs/ServiceFormModal"
import DeleteServicePopUp from "../common/DeleteServicePopUp"
import { useContext, useState } from "react"
import { PanelControlContext } from "@/context/PanelControlContext"

const ServiceManagementSection = () => {
  const {
    setCreateModalOpen,
    createModalOpen
  } = useContext(PanelControlContext)!

  const {
    serviceList,
    StartDeleteTransition,
    deleteServiceTransitionErr,
    isDeleteTransitionServiceLoading,
    HandleOpenDeleteServicePopUp,
    selectedServiceToDelete,
    HandleOpenDeletePopUp,
    deleteNotification
  } = useServices()


  // Filtrar servicios según el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = serviceList.filter((service) =>
    service.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-500/20 rounded-lg flex items-center justify-center">
              <Scissors className="w-5 h-5 text-rose-500" />
            </div>
            <div className="">
              <h2 className="text-sm sm:text-2xl font-bold text-white">Gestion de Servicios</h2>
              <p className="text-gray-400 text-sm">Administra tus servicios y horarios</p>
            </div>
          </div>
        </div>

        <ServiceFormModal
          open={createModalOpen}
          onOpenChange={setCreateModalOpen}
          mode="create"
        />

        {selectedServiceToDelete && deleteNotification && (
          <DeleteServicePopUp
            Srv={selectedServiceToDelete}
            HandleCancel={HandleOpenDeletePopUp}
            HandleDelete={StartDeleteTransition}
            deleteServiceTransitionErr={deleteServiceTransitionErr}
            isDeleteTransitionServiceLoading={isDeleteTransitionServiceLoading}
          />
        )}

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

          <Button size="icon" onClick={() => setCreateModalOpen(true)} className="bg-rose-500">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-sm text-gray-400 mb-4">Servicios actualmente activos: {serviceList.length}</div>

        {/* Services List */}
        <div className="space-y-4">

          {filteredServices?.map((service) => (
            <ServiceItem
              ServiceData={service}
              onDelete={HandleOpenDeleteServicePopUp}
            />
          ))}
        </div>
      </div>
    </Card>
  )
}

export default ServiceManagementSection



