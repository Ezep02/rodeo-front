import React from "react";
import { Scissors, } from "lucide-react";
import { useReservation } from "../hooks/useReservation";
import PromotionalBanner from "../components/common/PromotionalBanner";
import PopularServices from "../components/common/PopularServices";
import ServicesList from "../components/common/ServicesList";
import Reviews from "../components/common/Reviews";
import Faq from "../components/common/Faq";
import HowArrive from "../components/common/HowArrive";
import Reservation from "../components/common/Reservation";
import { Dialog, DialogContent, DialogDescription } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";



const Dashboard: React.FC = () => {

  const {
    seleccionarServicio,
    selectedService,
    setCreateAppointmentModalOpen,
    isCreateAppointmentModalOpen
  } = useReservation()


  return (
    <>
      {/* Banner promocional */}
      <PromotionalBanner />

      {/* Servicios populares */}
      <PopularServices />

      {/* Listado de servicios */}
      <ServicesList
        SeleccionarServicio={seleccionarServicio}
      />

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

      <HowArrive />

      {/* Testimonios */}
      <Reviews />

      {/* Preguntas frecuentes */}
      <Faq />

      <footer className="border-t bg-slate-50">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 font-bold text-xl mb-4">
                <Scissors className="h-5 w-5 text-rose-500" />
                <span>BarberStyle</span>
              </div>
              <p className="text-slate-600">Tu barbería de confianza desde 2015.</p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Horario</h3>
              <p className="text-slate-600">Lunes a Viernes: 9:00 - 20:00</p>
              <p className="text-slate-600">Sábados: 10:00 - 18:00</p>
              <p className="text-slate-600">Domingos: Cerrado</p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Contacto</h3>
              <p className="text-slate-600">Av. 29, Calle 48</p>
              <p className="text-slate-600">+123 456 7890</p>
              <p className="text-slate-600">info@barberstyle.com</p>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-slate-600">
            <p>© 2025 BarberStyle. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* 
      <UserConfigLayout /> */}
    </>

  );
};

export default Dashboard;
