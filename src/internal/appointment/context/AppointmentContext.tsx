import React, { ReactNode, useState } from "react";
import { UpcomingApptStats } from "../types/Appointment";
import { Booking } from "../models/Appointment";
import { AppointmentFilterStatus } from "../types/ApptFilter";

interface AppointmentContextProps {
  // # Estadisticas
  upcomingStats: UpcomingApptStats | undefined;
  setUpcomingStats: React.Dispatch<
    React.SetStateAction<UpcomingApptStats | undefined>
  >;

  // Proximas citas
  upcomingAppointment: Booking[] | [];
  setUpcomingAppointments: React.Dispatch<React.SetStateAction<Booking[]>>;

  // Filtros
  status: AppointmentFilterStatus;
  setStatus: React.Dispatch<React.SetStateAction<AppointmentFilterStatus>>;

  // # Fecha determinada por el calendario
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;

  // # Appointment seleccionado para marcar como upcoming
  selectedAppt: Booking | undefined
  setSelectedApp: React.Dispatch<React.SetStateAction<Booking | undefined>>;
}

export const AppointmentContext = React.createContext<
  AppointmentContextProps | undefined
>(undefined);

interface ChildrenProviderProp {
  children: ReactNode;
}

export const AppointmentContextProvider: React.FC<ChildrenProviderProp> = ({
  children,
}) => {
  // # Estadisticas de las proximas citas del barbero
  const [upcomingStats, setUpcomingStats] = useState<UpcomingApptStats>();

  // # Estados de las proximas citas
  const [upcomingAppointment, setUpcomingAppointments] = useState<Booking[]>(
    []
  );

  // # Estados de filtros
  const [status, setStatus] = useState<AppointmentFilterStatus>("");

  // Fecha donde se encuentra posicionado el calendario
  const [currentDate, setCurrentDate] = useState(new Date());

  // # Cita seleccionada para mostrar en el upcoming card
  const [selectedAppt, setSelectedApp] = useState<Booking>();

  return (
    <AppointmentContext.Provider
      value={{
        upcomingStats,
        setUpcomingStats,
        upcomingAppointment,
        setUpcomingAppointments,
        status,
        setStatus,
        currentDate,
        setCurrentDate,
        selectedAppt,
        setSelectedApp,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
