import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { useServices } from '../../hooks/useServices'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Service } from '@/internal/panel-control/models/ServicesModels'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

type ServicesListProps = {
  SeleccionarServicio: (service: Service) => void
}

const ServicesList: React.FC<ServicesListProps> = ({ SeleccionarServicio }) => {
  const {
    services
  } = useServices()


  const [busqueda, setBusqueda] = useState<string>("")

  const serviciosFiltrados = services?.filter((servicio) =>
    servicio.title.toLowerCase().includes(busqueda.toLowerCase()),
  )

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Nuestros Servicios</h2>
        </div>
      </div>

      <Tabs defaultValue="todos" className="w-full">
        <TabsList className="mb-3">
          <TabsTrigger value="todos">Todos los servicios</TabsTrigger>
        </TabsList>

        <TabsContent value="todos" className="space-y-4">

          <div className="relative ">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              placeholder="Buscar servicios..."
              className="pl-10 w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <h3 className="font-medium text-gray-900 mb-3">
            {busqueda ? `Resultados para "${busqueda}"` : ""}
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {serviciosFiltrados.length > 0 ? (
              serviciosFiltrados.map((servicio) => (
                <Card
                  key={servicio.ID}
                >
                  <CardHeader>
                    <div className="flex justify-between">

                      <div className="flex items-center gap-2">
                        <CardTitle>{servicio.title}</CardTitle>
                        <Badge variant="outline">
                          {servicio.service_duration}{" "}min
                        </Badge>
                      </div>
                      <span className="text-xl font-bold text-green-500">${servicio.price}</span>
                    </div>
                    <CardDescription>{servicio.description ? servicio.description : "Sin descripcion"}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => SeleccionarServicio(servicio)}>
                      Reservar
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No se encontraron servicios que coincidan con tu búsqueda
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}

export default ServicesList