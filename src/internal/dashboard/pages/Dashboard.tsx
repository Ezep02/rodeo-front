import React, { Suspense, useContext } from "react";
import MakeReservationLayout from "@/internal/dashboard/components/layout/MakeReservationLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton";
import { useServices } from "../hooks/useServices";
import { AuthContext } from "@/context/AuthContext";
import CustomerNextTurns from "../components/common/CustomerNextTurns";

const ServicesList = React.lazy(() => import("../components/common/ServicesList"));

const Dashboard: React.FC = () => {

  const {
    isUserAuthenticated
  } = useContext(AuthContext)!

  const {
    services,
    SearchMoreServices,
    isMakeReservationOpen
  } = useServices();



  return (
    <div className="container mx-auto px-4 py-6">

      <div className="space-y-6 ">
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

            <Card
              className='border-none p-0 shadow-none bg-transparent'
            >
              <CardHeader>
                <CardTitle>Servicios</CardTitle>
                <CardDescription>Reserva tu próximo servicio</CardDescription>
              </CardHeader>

              <CardContent className="grid gap-4 ">

                <Suspense
                  fallback={
                    <article className="flex items-center justify-between rounded-lg border">
                      <div className="flex flex-col md:flex-row w-full bg-zinc-200 h-[150px]">
                        <div className="flex flex-1 flex-col p-6">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <Skeleton className="h-5 w-[250px]" />
                            </div>

                            <div>
                              <Skeleton className="h-6 w-[80px]" />
                            </div>
                          </div>

                          <Skeleton className="h-4 w-[350px]" />
                        </div>
                      </div>
                    </article>
                  }
                >
                  <ServicesList
                    services={services ? services : []}
                    SearchMoreServices={SearchMoreServices}
                  />

                  {/* Apretar boton reservar -> abre el layout para seleccionar horario */}
                  {
                    isMakeReservationOpen && <MakeReservationLayout />
                  }

                </Suspense>
              </CardContent>
            </Card>
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
