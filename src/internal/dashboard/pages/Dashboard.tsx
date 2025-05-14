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

import { ArrowLeft, MapPin, Scissors, } from "lucide-react";
import { Button } from "@/components/ui/button";
import MakeReservationLayout from "../components/layout/MakeReservationLayout";
import { useReservation } from "../hooks/useReservation";
import UserConfigLayout from "../components/layout/UserConfigLayout";
import PromotionalBanner from "../components/common/PromotionalBanner";
import PopularServices from "../components/common/PopularServices";
import ServicesList from "../components/common/ServicesList";
import Reviews from "../components/common/Reviews";
import Faq from "../components/common/Faq";
import HowArrive from "../components/common/HowArrive";



const Dashboard: React.FC = () => {

  const {
    seleccionarServicio,
    volverPaso,
    paso,
    selectedService,
  } = useReservation()

  return (

    <>

      {/* Banner promocional */}
      {
        paso <= 1 && (
          <PromotionalBanner />
        )
      }
      {/* Listado de servicios */}
      <ServicesList
        SeleccionarServicio={seleccionarServicio}
      />

      <HowArrive/>

      {/* Testimonios */}
      <Reviews />

      {/* Preguntas frecuentes */}
      <Faq />

      <Tabs defaultValue="Servicios">




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

        <TabsContent value="Perfil">

          <UserConfigLayout />
        </TabsContent>

      </Tabs>

    </>

  );
};

export default Dashboard;
