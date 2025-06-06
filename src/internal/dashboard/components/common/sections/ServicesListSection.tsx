import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useServices } from "@/internal/dashboard/hooks/useServices"
import ServiceCard from "../cards/ServiceCard"
import { useReservation } from "@/internal/dashboard/hooks/useReservation"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import Reservation from "../Reservation"


const ServicesListSection: React.FC = () => {


  const {
    seleccionarServicio,
    selectedService,
    setCreateAppointmentModalOpen,
    isCreateAppointmentModalOpen
  } = useReservation()


  const {
    services
  } = useServices()

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto">
        <div className="mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Nuestros <span className="text-rose-500">Servicios</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl">
            Encontra el servicio que mas te guste
          </p>
        </div>

        {
          selectedService && isCreateAppointmentModalOpen && (
            <Dialog open={isCreateAppointmentModalOpen} onOpenChange={setCreateAppointmentModalOpen}>
              <DialogContent
                className="
                w-full max-w-3xl max-h-[700px] mx-4 sm:mx-auto rounded-lg shadow-lg bg-white p-6 sm:p-8
              "
              >
                <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 text-center">
                  Reservá tu turno
                </DialogTitle>
                <DialogDescription className="text-sm sm:text-base text-gray-500 mb-6 text-center">
                  Completá los datos a continuación para agendar tu turno en la barbería.
                </DialogDescription>
                <Reservation />
              </DialogContent>
            </Dialog>
          )
        }

        {/* Category Tabs */}
        <Tabs defaultValue="todos" className="mb-8">
          <TabsList className="bg-gray-900/50 border border-gray-700 mx-auto">
            <TabsTrigger
              value="todos"
              className="text-gray-300 data-[state=active]:bg-rose-500 data-[state=active]:text-white"
            >
              Todos
            </TabsTrigger>
            <TabsTrigger
              value="cortes"
              className="text-gray-300 data-[state=active]:bg-rose-500 data-[state=active]:text-white"
            >
              Cortes
            </TabsTrigger>
            <TabsTrigger
              value="barbas"
              className="text-gray-300 data-[state=active]:bg-rose-500 data-[state=active]:text-white"
            >
              Barbas
            </TabsTrigger>
            <TabsTrigger
              value="combos"
              className="text-gray-300 data-[state=active]:bg-rose-500 data-[state=active]:text-white"
            >
              Combos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="todos" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceCard 
                  key={service.ID} service={service} 
                  seleccionarServicio={seleccionarServicio}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cortes" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services
                .filter((service) => service.category === "cortes")
                .map((service) => (
                  <ServiceCard 
                    key={service.ID} 
                    service={service} 
                    seleccionarServicio={seleccionarServicio}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="barbas" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services
                .filter((service) => service.category === "barbas")
                .map((service) => (
                  <ServiceCard 
                  key={service.ID} 
                  service={service}
                  seleccionarServicio={seleccionarServicio}
                />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="combos" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services
                .filter((service) => service.category === "combos")
                .map((service) => (
                  <ServiceCard 
                    key={service.ID} 
                    service={service} 
                    seleccionarServicio={seleccionarServicio}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export default ServicesListSection