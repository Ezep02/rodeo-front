import React, { useContext } from "react";
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

import { ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useServices } from "../hooks/useServices";
import MakeReservationLayout from "../components/layout/MakeReservationLayout";
import { useReservation } from "../hooks/useReservation";

const Dashboard: React.FC = () => {

  const {
    isUserAuthenticated
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

  return (
    <div className="container mx-auto px-4 py-6">

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
                  <div className="space-y-2">
                    {services.map((servicio) => (
                      <Card
                        key={servicio.ID}
                        className={`cursor-pointer hover:shadow-sm transition-all ${selectedService?.ID === servicio.ID ? "border-zinc-900" : ""}`}
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
                          <div className="font-bold text-green-400">${servicio.price}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
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
