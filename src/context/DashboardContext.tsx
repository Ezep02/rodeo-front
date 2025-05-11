import React, { ReactNode, useState } from "react";
import {
  Service,
} from "../internal/panel-control/models/ServicesModels";

import {Shift} from "../internal/dashboard/models/DashboardModels";
import { CustomerPendingOrder, Order } from "@/internal/dashboard/models/OrderModels";

interface DashboardContextProps {
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  selectedService: Service | undefined;
  setSelectedService: React.Dispatch<React.SetStateAction<Service | undefined>>;
  serviceOffset: number;
  setServiceOffset:React.Dispatch<React.SetStateAction<number>>;

  barberSchedules: Shift[];
  setBarberSchedules: React.Dispatch<React.SetStateAction<Shift[]>>;
 
  filteredSchedulesByDay: Shift[];
  setFilteredSchedulesByDay: React.Dispatch<React.SetStateAction<Shift[]>>;
  SelectDateHandler: (day: Date) => void;

  
  handleReserveClick: (srv: Service) => void;
  schedulerOffset: number;
  setSchedulerOffset:React.Dispatch<React.SetStateAction<number>>;

  // ORDENES PENDIENTES
  cutomerPendingOrders: CustomerPendingOrder[] | []
  setCustomerPendingOrders: React.Dispatch<React.SetStateAction<CustomerPendingOrder[] | []>>
  // REPROGRAMADOR DE CITAS
  handleReschedule: ()=> void;
  isReschedulingOpen: boolean;
  setIsReschedulingOpen:React.Dispatch<React.SetStateAction<boolean>>;
}

export const DashboardContext = React.createContext< DashboardContextProps | undefined >(undefined);

interface ChildrenProviderProp {
  children: ReactNode;
}

export const DashboardContextProvider: React.FC<ChildrenProviderProp> = ({
  children,
}) => {

  // lista de servicios cacheados
  const [services, setServices] = useState<Service[]>([]);
  const [serviceOffset, setServiceOffset] = useState<number>(0);

  const [selectedService, setSelectedService] = useState<Service>();

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

 


  const handleReserveClick = (srv: Service) => {
   
    setSelectedService({
      ID: srv.ID,
      created_by_id: srv.created_by_id,
      description: srv.description,
      service_duration: srv.service_duration,
      price: srv.price,
      title: srv.title,
    });   
  };  

  // ORDENES PENDIENTES
  const [cutomerPendingOrders, setCustomerPendingOrders] = useState<CustomerPendingOrder[]>([])

  // abrir reprogramador de cita
  const [isReschedulingOpen, setIsReschedulingOpen] = React.useState<boolean>(false)

  const handleReschedule = () => {
    setIsReschedulingOpen(!isReschedulingOpen)
  }


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
        handleReserveClick,
        SelectDateHandler,
        serviceOffset,
        setServiceOffset,
        schedulerOffset,
        setSchedulerOffset,
        cutomerPendingOrders,
        setCustomerPendingOrders,
        isReschedulingOpen,
        setIsReschedulingOpen,
        handleReschedule,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
