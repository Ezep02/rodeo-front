import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa6";
import useCoupon from "../../hooks/useCoupon";
import { Coupon } from "../../model/Coupon";
import { LuCalendarPlus } from "react-icons/lu";
import useReservationStepper from "../../hooks/useReservationStepper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ServiceStep from "./reservation/ServiceStep";

const ReservationDialog = () => {
  const { user } = useUser();
  const { activeCoupon } = useCoupon();
  const [paymentPercentage, setPaymentPercentage] = useState("100");
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | undefined>();
  
  // ESTADO PARA CONTROLAR EL DIALOG
  const [isOpen, setIsOpen] = useState(false);

  // IMPORTAR TODAS LAS VARIABLES NECESARIAS DEL HOOK
  const {
    completedSteps,
    currentStep,
    steps,          
    canGoNext,       
    reservationData,
    markStepComplete,
    nextStep,
    prevStep,
    updateData,      
    resetStepper,    
  } = useReservationStepper();

  const handleComplete = () => {
    console.log('Reserva completada:', reservationData);
    alert('¡Reserva creada exitosamente!');
    setIsOpen(false);
    resetStepper();
  };

  //  FUNCIÓN PARA CERRAR Y RESETEAR
  const handleClose = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetStepper();
    }
  };

  //  SWITCH CASE CORREGIDO - EMPEZAR DESDE 0
  const RenderStepper = () => {
    switch (currentStep) {
      case 0: // PRIMER STEP
        return (
          <ServiceStep/>
        );
      
      case 1: // SEGUNDO STEP
        return (
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Seleccionar Horario</h3>
            <div className="space-y-3">
              <div className="p-4 border border-gray-200 rounded-lg">
                <p>DateTimeStep component aquí</p>
              </div>
            </div>
          </div>
        );

      case 2: // TERCER STEP
        return (
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Datos del Cliente</h3>
            <div className="space-y-3">
              <div className="p-4 border border-gray-200 rounded-lg">
                <p>CustomerStep component aquí</p>
              </div>
            </div>
          </div>
        );

      case 3: // CUARTO STEP
        return (
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Pago y Confirmación</h3>
            <div className="space-y-3">
              <div className="p-4 border border-gray-200 rounded-lg">
                <p>PaymentStep component aquí</p>
                <p>Porcentaje de pago: {paymentPercentage}%</p>
                {selectedCoupon && (
                  <p>Cupón: {selectedCoupon.code}</p>
                )}
                {activeCoupon && (
                  <p>Cupón activo disponible</p>
                )}
              </div>
            </div>
          </div>
        );

      default: // CASE POR DEFECTO
        return (
          <div className="p-6">
            <p>Error: Step no encontrado</p>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button variant="default" className="rounded-full cursor-pointer ">
          <LuCalendarPlus />
          Nueva reserva
        </Button>
      </DialogTrigger>
      
      <DialogContent className="xl:max-w-xl rounded-4xl">
        {/* HEADER CON TÍTULO */}
        <DialogHeader>
          <DialogTitle>Nueva Reserva - Paso {currentStep + 1} de {steps.length}</DialogTitle>
        </DialogHeader>

        {/* CONTENIDO DEL STEP ACTUAL */}
        {RenderStepper()}

        {/* FOOTER CON NAVEGACIÓN */}
        <DialogFooter className="border-t p-6 flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`
              flex items-center px-4 py-2 rounded-lg transition-colors
              ${currentStep === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100'
              }
            `}
          >
            <ChevronLeft size={16} className="mr-1" />
            Atrás
          </button>
          
          <button
            onClick={currentStep === steps.length - 1 ? handleComplete : nextStep}
            disabled={!canGoNext}
            className={`
              flex items-center px-6 py-2 rounded-lg transition-colors
              ${canGoNext
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            {currentStep === steps.length - 1 ? 'Confirmar Reserva' : 'Siguiente'}
            {currentStep < steps.length - 1 && <ChevronRight size={16} className="ml-1" />}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationDialog;