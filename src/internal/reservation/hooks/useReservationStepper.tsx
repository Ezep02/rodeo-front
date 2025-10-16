import { useState } from 'react';
import { Service } from '../types/Service';


interface ReservationData {
  service?: Service;
  datetime?: { date: string; time: string };
  customer?: { name: string; phone: string; email: string };
  payment?: { method: string; percentage: string };
}

const useReservationStepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [reservationData, setReservationData] = useState<ReservationData>({});

  // Definición de los pasos
  const steps = [
    { title: 'Servicio', key: 'service' },
    { title: 'Horario', key: 'datetime' },
    { title: 'Datos', key: 'customer' },
    { title: 'Pago', key: 'payment' }
  ];

  // Navegar al siguiente paso
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      // Marcar el paso actual como completado
      setCompletedSteps(prev => new Set(prev).add(currentStep));
      setCurrentStep(prev => prev + 1);
    }
  };

  // Navegar al paso anterior
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Actualizar datos de la reserva
  const updateData = (stepData: Partial<ReservationData>) => {
    setReservationData(prev => ({ ...prev, ...stepData }));
  };

  // Marcar paso como completado manualmente
  const markStepComplete = (step: number) => {
    setCompletedSteps(prev => new Set(prev).add(step));
  };

  // Validar si se puede avanzar al siguiente paso
  const canGoNext = () => {
    switch (currentStep) {
      case 0: // Paso servicio
        return !!reservationData.service;
      
      case 1: // Paso horario
        return !!reservationData.datetime?.date && !!reservationData.datetime?.time;
      
      case 2: // Paso datos del cliente
        return !!reservationData.customer?.name && !!reservationData.customer?.phone;
      
      case 3: // Paso pago
        return !!reservationData.payment?.method;
      
      default:
        return false;
    }
  };

  // Resetear el stepper (útil al cerrar el modal)
  const resetStepper = () => {
    setCurrentStep(0);
    setCompletedSteps(new Set());
    setReservationData({});
  };

  return {
    // Estado
    currentStep,
    steps,
    completedSteps,
    reservationData,
    
    // Acciones
    nextStep,
    prevStep,
    updateData,
    markStepComplete,
    resetStepper,
    
    // Validaciones
    canGoNext: canGoNext(),
    
    // Utilidades
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps.length - 1,
    progress: ((currentStep + 1) / steps.length) * 100,
  };
};

export default useReservationStepper;