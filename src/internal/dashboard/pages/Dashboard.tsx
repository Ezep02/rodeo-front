import React, { Suspense, useContext } from "react";
import { DashboardContext } from "../../../context/DashboardContext";
import MakeReservationLayout from "../components/layout/MakeReservationLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton";

const ServicesList = React.lazy(() => import("../components/common/ServicesList"));

const Dashboard: React.FC = () => {
  const { isMakeReservationOpen } = useContext(DashboardContext)!;

  return (
    <div className="container mx-auto px-4 py-6">


      <div className="space-y-6 ">
        <Tabs defaultValue="Servicios">

          <TabsList className="grid grid-cols-3 w-[300px] mb-4">
            <TabsTrigger value="Servicios">Servicios</TabsTrigger>
            <TabsTrigger value="Citas">Citas</TabsTrigger>
            <TabsTrigger value="Perfil">Perfil</TabsTrigger>
          </TabsList>

          {/* SERVICIOS */}
          <TabsContent value="Servicios">

            <Card
              className='border-none p-0 shadow-none '
            >
              <CardHeader>
                <CardTitle>Servicios</CardTitle>
                <CardDescription>Reserva tu próximo servicio</CardDescription>
              </CardHeader>

              <CardContent className="grid gap-4 ">

                <Suspense
                  fallback={
                    <article className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex flex-col md:flex-row w-full">

                        <Skeleton className="flex h-32 w-full items-center justify-center md:h-auto md:w-1/4" />

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

                          <div className="mt-6 flex justify-end">
                            <Skeleton className="h-8 w-[100px]" />
                          </div>
                        </div>
                      </div>
                    </article>
                  }
                >

                  <ServicesList />
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
              className='border-none p-0 shadow-none'
            >
              <CardHeader>
                <CardTitle>Próximas citas</CardTitle>
                <CardDescription>Citas programadas para los próximos días</CardDescription>
              </CardHeader>

              <CardContent>
                {/* CITAS TODO */}
                <div className="min-h-[350px]">
                  sin citas
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
