import { Plus, Search, Settings } from "lucide-react"
import { useState } from "react"

import ServiceItem from "@/internal/panel-control/components/cards/ServiceItemCard"
import { useProduct } from "../../hooks/useProduct"
import { Button } from "@/components/ui/button"
import useCategories from "../../hooks/useCategories"
import { HiOutlinePlus, HiOutlineViewList } from "react-icons/hi"
import CategoryDialog from "../dialogs/CategoryDialog"
import { TbTags } from "react-icons/tb"
import CategoryListDialog from "../dialogs/CategoryListDialog"
import { Category } from "../../models/Category"
import SuccessAlert from "@/components/alerts/SuccessAlert"
import ErrorAlert from "@/components/alerts/ErrorAlert"
import ServiceDialog from "../dialogs/ServiceDialog"
import { Product } from "../../models/ServicesModels"

const ServiceManagementSection = () => {
  const {
    productList,
    CreateService,
    UpdateService,
    DeleteService
  } = useProduct()

  const {
    UpdateCategory,
    CreateCategory,
    DeleteCategory,
    categories,
    isOnErrAlert,
    capturedErr,
    onSuccess,
    onSuccessMsg,
    setOnSuccess,
    setIsOnErrAlert
  } = useCategories()

  // Abrir el dialogo para crear una nueva categoría
  const [isCategoryDialogOpen, setCategoryDialoOpen] = useState(false)
  const toggleCategoryDialog = () => {
    setCategoryDialoOpen(prev => !prev)
  }

  // Buscar servicios por nombre
  const [searchTerm, setSearchTerm] = useState("")
  const filteredServices = productList.filter(service =>
    service.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Abrir el dialogo para subir un nuevo servicio
  const [isServiceDialogOpen, setServiceDialogOpen] = useState(false)
  const toggleServiceDialog = () => {
    setServiceDialogOpen(prev => !prev)
  }

  // Abrir el dialogo para ver el listado de categorías
  const [isCategoryListDialogOpen, setCategoryListDialogOpen] = useState(false)
  const toggleCategoryListDialog = () => {
    setCategoryListDialogOpen(prev => !prev)
  }


  // Abrir el formualrio para editar un servicio
  const [editingService, setEditingService] = useState<Product | null>(null)

  const EditServiceHandler = (service: Product) => {
    setEditingService(service)
    setServiceDialogOpen(true)
  }

  return (
    <div className="min-h-[80vh] overflow-y-auto bg-white border border-slate-200 shadow-md rounded-2xl px-4 py-6 flex flex-col gap-4 flex-grow">

      {/* Header */}
      <header className="flex flex-col gap-4 ">
        <div className="flex flex-wrap items-center gap-4">
          {/* Izquierda: icono + texto */}
          <div className="p-2 bg-zinc-900 rounded-lg shadow">
            <Settings size={22} className="text-white" />
          </div>
          <div>
            <h5 className="text-zinc-800 text-base font-semibold">Gestión de servicios</h5>
            <p className="text-zinc-500 text-sm">Creá y administrá tus servicios fácilmente</p>
          </div>
        </div>
      </header>

      {/* CATEGORÍAS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-zinc-800">Categorías</p>
            <span className="text-xs text-zinc-500">Agrupá y administrá tus servicios</span>
          </div>

          <div className="flex gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleCategoryDialog}
              className="text-zinc-700 hover:bg-zinc-100"
            >
              <HiOutlinePlus className="w-5 h-5" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={toggleCategoryListDialog}
              className="text-zinc-700 hover:bg-zinc-100"
            >
              <HiOutlineViewList className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {categories.length > 0 ? (
          <div className="flex items-center gap-2 flex-wrap">
            {categories.slice(0, 2).map((category, idx) => (
              <div
                key={idx}
                className="px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-medium text-white"
                style={{ backgroundColor: category.color }}
              >
                <TbTags size={14} className="opacity-80" />
                {category.name}
              </div>
            ))}

            {categories.length > 2 && (
              <div className="px-3 py-1.5 rounded-full flex items-center text-xs font-medium text-zinc-50 bg-zinc-900 hover:bg-zinc-700 transition">
                <Plus size={14} className="mr-1" />
                {categories.length - 2}
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-zinc-400">No hay categorías aún.</p>
        )}
      </div>

      {/* Diálogo para crear | ver listado de categoría */}
      <CategoryDialog
        onCreateSubmit={CreateCategory}
        onClose={toggleCategoryDialog}
        open={isCategoryDialogOpen}
      />

      <CategoryListDialog
        open={isCategoryListDialogOpen}
        onClose={toggleCategoryListDialog}
        categories={categories}
        onEdit={async (category: Category) => {
          UpdateCategory(category)
        }}
        onDelete={(id: number) => {
          DeleteCategory(id)
        }}
      />

      {/* Dialogos de exito y error */}
      <SuccessAlert
        message={onSuccessMsg}
        show={onSuccess}
        onClose={() => setOnSuccess(false)}
      />

      <ErrorAlert
        message={capturedErr}
        show={isOnErrAlert}
        onClose={() => setIsOnErrAlert(false)}
      />


      {/* Centro: buscador */}
      <div className="flex gap-2">
        <div className="relative w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <input
            type="search"
            placeholder="Buscar servicio..."
            className="w-full pl-10 pr-3 py-2 text-sm border border-zinc-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-transparent transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex-shrink-0">
          <Button
            size="sm"
            onClick={toggleServiceDialog}
            className="bg-zinc-800 text-white hover:bg-zinc-700 transition rounded-xl whitespace-nowrap"
          >
            <Plus className="w-4 h-4 mr-1" />
            Crear
          </Button>
        </div>
      </div>


      {/* MODAL DE SERVICIO */}
      <ServiceDialog
        onClose={toggleServiceDialog}
        open={isServiceDialogOpen}
        categories={categories}
        onSubmit={(data) => {
          CreateService(data)
          toggleServiceDialog()
        }}
        mode={editingService ? 'edit' : 'create'}
        initialData={editingService || undefined}
        onEditSubmit={
          async (data) => {
            UpdateService(data)
            toggleServiceDialog()
            setEditingService(null)
          }
        }

      />

      {/* LISTADO DE SERVICIOS */}

      <div className="overflow-x-auto max-h-[60vh] overflow-y-auto rounded-lg ">
        {filteredServices.length > 0 ? (
          <div className="flex flex-col gap-2">
            {
              filteredServices.map((product, idx) => (
                <ServiceItem
                  key={idx}
                  product={product}
                  onEdit={EditServiceHandler}
                  onDelete={DeleteService}
                />
              ))
            }
          </div>
        ) : (
          <div className="text-center text-sm text-zinc-400 py-8">
            No se encontraron servicios.
          </div>
        )}
      </div>

    </div>
  )
}

export default ServiceManagementSection
