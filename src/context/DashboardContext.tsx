import React, { ReactNode, useState } from "react";
import {
  Service,
} from "../internal/panel-control/models/ServicesModels";

import {Shift} from "../internal/dashboard/models/DashboardModels";

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
  selectedShift: Shift | undefined;
  setSelectedShift: React.Dispatch<React.SetStateAction<Shift | undefined>>;
  SelectDateHandler: (day: Date) => void;
  SelectScheduleTimeHandler: (selectedShift: Shift) => void

  handleReserveClick: (srv: Service) => void;
 
  isMakeReservationOpen: boolean;
  setMakeReservation: React.Dispatch<React.SetStateAction<boolean>>;
  HandleMakeReservation: ()=> void
  
  schedulerOffset: number;
  setSchedulerOffset:React.Dispatch<React.SetStateAction<number>>;

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

  // Shift seleccionado por el usuario
  const [selectedShift, setSelectedShift] = useState<Shift>();

  const SelectScheduleTimeHandler = (selectedShift: Shift) => {
    setSelectedShift(selectedShift)
  }


  // Func para manejar la seleccion del servicio
  const [isMakeReservationOpen, setMakeReservation] = useState(false)

  const HandleMakeReservation = () => {
    setMakeReservation((prev)=> !prev )
  }

  const handleReserveClick = (srv: Service) => {
   
    setSelectedService({
      ID: srv.ID,
      created_by_id: srv.created_by_id,
      description: srv.description,
      service_duration: srv.service_duration,
      price: srv.price,
      title: srv.title,
      preview_url: srv.preview_url
    });
    HandleMakeReservation()
   
  };  

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
        selectedShift,
        setSelectedShift,
        handleReserveClick,
        isMakeReservationOpen,
        setMakeReservation,
        HandleMakeReservation,
        SelectDateHandler,
        SelectScheduleTimeHandler,
        serviceOffset,
        setServiceOffset,
        schedulerOffset,
        setSchedulerOffset
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
