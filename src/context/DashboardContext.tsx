import React, { ReactNode, useState } from "react";
import {
  Service,
} from "../internal/panel-control/models/ServicesModels";

import {Shift} from "../internal/dashboard/models/DashboardModels";
import { CustomerPendingOrder } from "@/internal/dashboard/models/OrderModels";
import { Coupon } from "@/internal/dashboard/models/Coupons";
import { CustomerServices } from "@/internal/dashboard/models/ShopServices";

interface DashboardContextProps {
  services: CustomerServices[];
  setServices: React.Dispatch<React.SetStateAction<CustomerServices[]>>;
  selectedService: CustomerServices | undefined;
  setSelectedService: React.Dispatch<React.SetStateAction<CustomerServices | undefined>>;
  serviceOffset: number;
  setServiceOffset:React.Dispatch<React.SetStateAction<number>>;

  barberSchedules: Shift[];
  setBarberSchedules: React.Dispatch<React.SetStateAction<Shift[]>>;
 
  filteredSchedulesByDay: Shift[];
  setFilteredSchedulesByDay: React.Dispatch<React.SetStateAction<Shift[]>>;
  SelectDateHandler: (day: Date) => void;


  schedulerOffset: number;
  setSchedulerOffset:React.Dispatch<React.SetStateAction<number>>;

  // ORDENES PENDIENTES
  customerPendingOrders: CustomerPendingOrder[] | []
  setCustomerPendingOrders: React.Dispatch<React.SetStateAction<CustomerPendingOrder[] | []>>
  // REPROGRAMADOR DE CITAS
  handleReschedule: ()=> void;
  isReschedulingOpen: boolean;
  setIsReschedulingOpen:React.Dispatch<React.SetStateAction<boolean>>;
  // RESERVA
  selectedShift: Shift | undefined
  setSelectedShift: React.Dispatch<React.SetStateAction<Shift | undefined>>
  // CUPONES
  availableCoupons: Coupon[] | []
  setAvailableCoupons: React.Dispatch<React.SetStateAction<Coupon[] | []>>
}

export const DashboardContext = React.createContext< DashboardContextProps | undefined >(undefined);

interface ChildrenProviderProp {
  children: ReactNode;
}

export const DashboardContextProvider: React.FC<ChildrenProviderProp> = ({
  children,
}) => {

  // lista de servicios cacheados
  const [services, setServices] = useState<CustomerServices[]>([]);
  const [serviceOffset, setServiceOffset] = useState<number>(0);

  const [selectedService, setSelectedService] = useState<CustomerServices>();

  // Horarios de los barbero
  const [barberSchedules, setBarberSchedules] = useState<Shift[]>([]);

  // Reservation 

    // cada vez que el dia cambia, se realiza un filtro en busqueda de shifts cargados previamente
  const [schedulerOffset, setSchedulerOffset] = useState<number>(0);

  const [filteredSchedulesByDay, setFilteredSchedulesByDay] = useState<Shift[]>([]);



  const SelectDateHandler = (day: Date) => {
    const fechaObjeto = new Date(day);
   
    // Filtrar los turnos acorde al dia seleccionado
    let days = barberSchedules.filter((sch) => {
      // Normalizar fechas a formato fecha
      const fechaSchedule = new Date(sch.Schedule_day_date).toLocaleDateString("es-AR", {
        weekday: "short", 
        month: "short",
        day: "numeric"
      });
      const fechaSeleccionada = fechaObjeto.toLocaleDateString("es-AR", {
        weekday: "short", 
        month: "short",
        day: "numeric"
      });
  
      // Comparar fechas
      return fechaSchedule === fechaSeleccionada;
    });
   
    setFilteredSchedulesByDay(days)
  };

  // SHIFT SELECCIONADO ( reserva )
  const [selectedShift, setSelectedShift] = useState<Shift>()

  // ORDENES PENDIENTES
  const [customerPendingOrders, setCustomerPendingOrders] = useState<CustomerPendingOrder[]>([])

  // abrir reprogramador de cita
  const [isReschedulingOpen, setIsReschedulingOpen] = React.useState<boolean>(false)

  const handleReschedule = () => {
    setIsReschedulingOpen(!isReschedulingOpen)
  }

  // CUPONES
  const [availableCoupons, setAvailableCoupons] = useState<Coupon[] | []>([])

  return (
    <DashboardContext.Provider
      value={{
        services,
        setServices,
        selectedService,
        setSelectedService,
        barberSchedules,
        setBarberSchedules,
        filteredSchedulesByDay,
        setFilteredSchedulesByDay,
        SelectDateHandler,
        serviceOffset,
        setServiceOffset,
        schedulerOffset,
        setSchedulerOffset,
        customerPendingOrders,
        setCustomerPendingOrders,
        isReschedulingOpen,
        setIsReschedulingOpen,
        handleReschedule,
        selectedShift,
        setSelectedShift,
        availableCoupons,
        setAvailableCoupons
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
