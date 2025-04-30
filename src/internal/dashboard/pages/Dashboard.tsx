import React, { useContext, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { motion, AnimatePresence } from "framer-motion"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
// import { Skeleton } from "@/components/ui/skeleton";
import { AuthContext } from "@/context/AuthContext";
import CustomerNextTurns from "../components/common/CustomerNextTurns";

import { ArrowLeft, Calendar, Clock, Crown, Info, MapPin, Scissors, Search, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useServices } from "../hooks/useServices";
import MakeReservationLayout from "../components/layout/MakeReservationLayout";
import { useReservation } from "../hooks/useReservation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { usePopularServices } from "../hooks/usePopularServices";




interface Testimonio {
  id: number
  nombre: string
  comentario: string
  calificacion: number
  fecha: string
}

const Dashboard: React.FC = () => {

  const {
    isUserAuthenticated,
  } = useContext(AuthContext)!


  const {
    seleccionarServicio,
    volverPaso,
    paso,
    selectedService,
  } = useReservation()

  const {
    services
  } = useServices()

  const {
    popularServices
  } = usePopularServices()


  const testimonios: Testimonio[] = [
    {
      id: 1,
      nombre: "Juan Pérez",
      comentario: "Excelente servicio, el mejor fade que me han hecho.",
      calificacion: 5,
      fecha: "hace 2 días",
    },
    {
      id: 2,
      nombre: "Roberto García",
      comentario: "Muy profesionales y puntuales. Recomendado.",
      calificacion: 4,
      fecha: "hace 1 semana",
    },
    {
      id: 3,
      nombre: "Roberto García",
      comentario: "Muy profesionales y puntuales. Recomendado.",
      calificacion: 3,
      fecha: "hace 3 semana",
    },
    {
      id: 4,
      nombre: "Roberto García",
      comentario: "Muy profesionales y puntuales. Recomendado.",
      calificacion: 4,
      fecha: "hace 5 semana",
    },
    {
      id: 5,
      nombre: "Roberto García",
      comentario: "Muy profesionales y puntuales. Recomendado.",
      calificacion: 5,
      fecha: "hace 1 semana",
    },
    {
      id: 6,
      nombre: "Roberto García",
      comentario: "Muy profesionales y puntuales. Recomendado.",
      calificacion: 2,
      fecha: "hace 1 semana",
    },
  ]

  const [busqueda, setBusqueda] = useState<string>("")

  const serviciosFiltrados = services.filter((servicio) =>
    servicio.title.toLowerCase().includes(busqueda.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-white">


      {/* Información de la barbería - Banner superior */}
      <div className="bg-gray-100 p-3 text-center text-sm flex justify-center items-center gap-2">
        <MapPin className="h-4 w-4 text-red-500" />
        <span>Av. 29, Calle 48 •</span>
        <a href="https://maps.app.goo.gl/mpWfZ32yUaZ6Xbbr6" target="_blank">
          Como llegar?
        </a>

      </div>


      <div className="max-w-4xl mx-auto p-4">
        <Tabs defaultValue="Servicios">

          <TabsList className="grid grid-cols-3 w-[300px] mb-4">
            <TabsTrigger value="Servicios">Servicios</TabsTrigger>

            {
              isUserAuthenticated && (
                <>
                  <TabsTrigger value="Citas">Citas</TabsTrigger>
                  <TabsTrigger value="Perfil">Perfil</TabsTrigger>
                </>
              )
            }
          </TabsList>

          {/* SERVICIOS */}
          <TabsContent value="Servicios">
            <div className="flex items-center mb-6">
              {paso > 1 && (
                <Button onClick={() => volverPaso(paso - 1)} className="mr-2">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {paso === 1 ? "Servicios" : "Fecha y hora"}
                </h2>
                <p className="text-gray-500 text-sm">
                  {paso === 1
                    ? "Reserva tu próximo servicio"
                    : paso === 2
                      ? `${selectedService?.title} - $${selectedService?.price}`
                      : `- ${selectedService?.title}`}
                </p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {paso === 1 && (
                <motion.div
                  key="servicios"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Banner promocional */}
                  <Card className="mb-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold mb-2">Bienvenido</h3>
                          <p className="text-gray-300 text-sm mb-4">
                            20% de descuento en combo completo los martes y miércoles
                          </p>
                          <Button
                            size="sm"

                            className="text-white "
                          >
                            Ver detalles
                          </Button>
                        </div>
                        <div className="hidden sm:block">
                          <Scissors className="h-16 w-16 text-rose-500 opacity-60" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>


                  {/* Servicios populares */}

                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="h-4 w-4 text-red-500" />
                      <h3 className="font-medium text-gray-900">Servicios populares</h3>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {popularServices
                        ?.sort((a, b) => b.total_avg - a.total_avg) // ordenar de mayor a menor
                        .map((popular_service, i) => {
                          const podiumColors = ["bg-gradient-to-b from-amber-500 to-yellow-400", "bg-gradient-to-b from-gray-400 to-gray-200", "bg-gradient-to-b from-amber-700 to-amber-600"]; // Oro, plata, bronce
                          const positionLabels = [<Crown className="w-6 h-6 text-yellow-300" />, <Crown className="w-6 h-6 text-zinc-50" />, <Crown className="w-6 h-6 " />];
                          return (
                            <Card
                              key={i}
                              className={`hover:shadow-sm transition-all border-gray-200 ${podiumColors[i]}`}
                            >
                              <CardContent className="p-4">
                                <div className="font-bold text-center flex justify-center text-lg text-gray-900">
                                  {positionLabels[i]}
                                </div>
                                <div className="font-medium text-center mt-2 text-zinc-50">{popular_service.title}</div>
                                <div className="text-sm font-medium text-center mt-1 text-zinc-100 bg-zinc-900 rounded-md shadow-md">{popular_service.total_avg}% de clientes</div>
                              </CardContent>
                            </Card>
                          );
                        })}
                    </div>

                  </div>

                  {/* Listado de servicios */}
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-3">
                      {busqueda ? `Resultados para "${busqueda}"` : "Todos los servicios"}
                    </h3>
                    {/* Buscador de servicios */}
                    <div className="relative mb-6">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        placeholder="Buscar servicios..."
                        className="pl-10 w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      {serviciosFiltrados.length > 0 ? (
                        serviciosFiltrados.map((servicio) => (
                          <Card
                            key={servicio.ID}
                            className={`cursor-pointer hover:shadow-sm transition-all ${selectedService?.ID === servicio.ID ? "border-red-500" : ""
                              }`}
                            onClick={() => seleccionarServicio(servicio)}
                          >
                            <CardContent className="p-4 flex items-center justify-between">
                              <div>
                                <h3 className="font-medium text-gray-900">{servicio.title}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{servicio.service_duration}</span>
                                </div>
                              </div>
                              <div className="font-bold text-green-500">${servicio.price}</div>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          No se encontraron servicios que coincidan con tu búsqueda
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Testimonios */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <h3 className="font-medium text-gray-900">Reseñas</h3>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-2 gap-2">
                      {testimonios.map((testimonio) => (
                        <Card key={testimonio.id} className="border-gray-200">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium">{testimonio.nombre}</div>
                                <div className="text-sm text-gray-500">{testimonio.fecha}</div>
                              </div>
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < testimonio.calificacion ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700 text-sm mt-2">{testimonio.comentario}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Preguntas frecuentes */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Info className="h-4 w-4 text-red-500" />
                      <h3 className="font-medium text-gray-900">Preguntas frecuentes</h3>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="text-sm font-medium">
                          ¿Cómo puedo cancelar mi cita?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-gray-600">
                          Puedes cancelar tu cita hasta 2 horas antes sin costo. Para cancelar, ve a la sección de
                          "Citas" y selecciona la opción de cancelar.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger className="text-sm font-medium">
                          ¿Qué métodos de pago aceptan?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-gray-600">
                          Aceptamos efectivo, tarjetas de crédito/débito y pagos móviles como Apple Pay y Google Pay.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger className="text-sm font-medium">
                          ¿Necesito llevar algo para mi cita?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-gray-600">
                          Solo necesitas llegar a tiempo. Si tienes alguna referencia o imagen del estilo que deseas,
                          puedes mostrarla a tu barbero.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  {/* Próxima cita disponible */}
                  <Card className="mb-6 border-gray-200 bg-gray-50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-red-500 p-2 rounded-full">
                          <Calendar className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Próxima cita disponible</h3>
                          <p className="text-sm text-gray-600">Hoy a las 16:00 con Carlos</p>
                        </div>
                        <Button className="ml-auto" size="sm">
                          Reservar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {paso === 2 && (
                <motion.div
                  key="calendario"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MakeReservationLayout />
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>


          {/* CITAS */}

          <TabsContent value="Citas">
            <Card
              className='border-none p-0 shadow-none bg-transparent'
            >
              <CardHeader>
                <CardTitle>Próximas citas</CardTitle>
                <CardDescription>Citas programadas para los próximos días</CardDescription>
              </CardHeader>

              <CardContent>
                {/* CITAS TODO */}

                <div className="min-h-[350px]">
                  <CustomerNextTurns />
                </div>

              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
};

export default Dashboard;
