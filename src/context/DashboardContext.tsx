import React, { ReactNode, useEffect, useState } from "react";
import {
  Barber,
  Service,
} from "../internal/panel-control/models/Services.models";
import {
  GetAllServices,
  GetOrderHistorial,
} from "../internal/dashboard/services/DashboardService";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ScheduleDay,
  ScheduleResponse,
  SelectedShiftByUser,
} from "../internal/dashboard/models/DashboardModels";
import { Order } from "../internal/dashboard/models/OrderModels";

interface DashboardContextProps {
  AllServices: () => Promise<void>;
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  selectedService: Service | undefined;
  setSelectedService: React.Dispatch<React.SetStateAction<Service | undefined>>;
  navigationIndex: number;
  setNavigationIndex: React.Dispatch<React.SetStateAction<number>>;
  NavigationLinks: Array<string>;
  AddNewIndex: () => void;
  nextStep: boolean;
  setNextStep: React.Dispatch<React.SetStateAction<boolean>>;
  navigateToPrevious: () => void;
  barbersList: Barber[];
  setBarberList: React.Dispatch<React.SetStateAction<Barber[]>>;
  selectedBarber: Barber | undefined;
  setSelectedBarber: React.Dispatch<React.SetStateAction<Barber | undefined>>;
  barberSchedules: ScheduleResponse[];
  setBarberSchedules: React.Dispatch<React.SetStateAction<ScheduleResponse[]>>;
  ShowSchedulesDayList: (date: Date) => void;
  filteredSchedulesByDay: ScheduleDay | undefined;
  setFilteredSchedulesByDay: React.Dispatch<React.SetStateAction<ScheduleDay | undefined>>;
  selectedShift: SelectedShiftByUser;
  setSelectedShift: React.Dispatch<React.SetStateAction<SelectedShiftByUser>>;
  SelectShiftHandler: (sh: SelectedShiftByUser) => void;
  handleReserveClick: (srv: Service) => void;
  handleSelectBarber: (barber: Barber) => void;
  pendingOrder: Order | undefined;
  setPendingOrder: React.Dispatch<React.SetStateAction<Order | undefined>>;
  ordersHistorial: Order[];
  setOrdersOrdersHistorial: React.Dispatch<React.SetStateAction<Order[]>>;
  makeReservation: boolean;
  setMakeReservation: React.Dispatch<React.SetStateAction<boolean>>;
  HandleMakeReservation: ()=> void
}

export const DashboardContext = React.createContext<
  DashboardContextProps | undefined
>(undefined);

interface ChildrenProviderProp {
  children: ReactNode;
}

export const DashboardContextProvider: React.FC<ChildrenProviderProp> = ({
  children,
}) => {
  const [services, setServices] = useState<Service[]>([]);

  const AllServices = async () => {
    try {
      const fetchedServices: Service[] = await GetAllServices();
      if (fetchedServices) {
        setServices(fetchedServices);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    AllServices();
  }, []);

  const [selectedService, setSelectedService] = useState<Service>();

  // seleccion del barbero
  const [selectedBarber, setSelectedBarber] = useState<Barber>();

  const handleSelectBarber = (barber: Barber) => {
    setSelectedBarber(barber);
    setNextStep(true);
  };

  useEffect(() => {
    setNextStep(true);
  }, [selectedBarber]);

  // lista de barberos
  const [barbersList, setBarberList] = useState<Barber[]>([]);

  const NavigationLinks: string[] = [
    "/service",
    "/service/select-staff",
    "/service/select-staff/time",
  ];

  const [navigationIndex, setNavigationIndex] = useState(0);
  const [nextStep, setNextStep] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const updateIndex = () => {
      const index = NavigationLinks.findIndex(
        (link) => link === location.pathname
      );

      setNavigationIndex(index);
    };

    updateIndex();
  }, [location.pathname]);

  // Avanzar al siguiente paso y navegar al enlace correspondiente
  const AddNewIndex = () => {
    if (navigationIndex < NavigationLinks.length - 1) {
      const nextIndex = navigationIndex + 1;

      setNavigationIndex(nextIndex);
      setNextStep(false);
      navigate(NavigationLinks[nextIndex]);
    }
  };

  // Retrocede al índice anterior y navega
  const navigateToPrevious = () => {
    if (navigationIndex > 0) {
      const newIndex = navigationIndex - 1;
      navigate(NavigationLinks[newIndex]);
    }
  };

  // Horarios del barbero, obtenido por su ID
  const [barberSchedules, setBarberSchedules] = useState<ScheduleResponse[]>(
    []
  );

  // Filtro de horarios segun el dia seleccionado
  const [filteredSchedulesByDay, setFilteredSchedulesByDay] = useState<ScheduleDay>();

  // Captura el dia seleccionado
  const ShowSchedulesDayList = (date: Date) => {
    // Extraer nombre del día
    const dayName = date
      .toLocaleDateString("es-ES", { weekday: "long" })
      .toLowerCase();

    // Encontrar el horario del barbero para el día seleccionado
    const scheduleByIndex = barberSchedules.find((sch) => sch.Day.toLowerCase() === dayName);

    // TODO: Manejarlo en un pop up
    if (!scheduleByIndex) {
      console.warn("No se encontró un horario para el día seleccionado.");
      setFilteredSchedulesByDay(undefined);
      return;
    }

    // Extraer y formatear datos de la fecha seleccionada
    const dayDate = date.toLocaleDateString("es-ES", { day: "numeric" });
    const monthDate = date.toLocaleDateString("es-ES", { month: "numeric" });
    const yearDate = date.toLocaleDateString("es-ES", { year: "numeric" });

    // Actualizar el estado con los horarios filtrados
    setFilteredSchedulesByDay({
      Day: scheduleByIndex.Day,
      End_date: scheduleByIndex.end ? new Date(scheduleByIndex.end) : new Date(),
      ID: scheduleByIndex.ID,
      Shift_add:
        scheduleByIndex.Shift_add?.map((sh_copy) => ({
          ...sh_copy,
          Day_date: dayDate,
          Month_date: monthDate,
          Year_date: yearDate,
          Date: date,
        })),
      Start_date: scheduleByIndex.start ? new Date(scheduleByIndex.start) : new Date(),
  });
    return null;
  };

  // Shift seleccionado por el usuario
  const [selectedShift, setSelectedShift] = useState<SelectedShiftByUser>();

  const SelectShiftHandler = (sh: SelectedShiftByUser) => {
    if (sh) {
      setSelectedShift({
        Day: sh.Day,
        ID: sh.ID,
        Schedule_id: sh.Schedule_id,
        Day_date: sh.Day_date,
        Month_date: sh.Month_date,
        Year_date: sh.Year_date,
        Start_time: sh.Start_time,
        Barber_id: selectedService?.created_by_id!,
        Date: sh.Date,
        Created_by_name: sh.Created_by_name,
        Available: sh.Available,
        CreatedAt: sh.CreatedAt
      });
      setNextStep(true);
    }
  };

  // Func para manejar la seleccion del servicio
  const [makeReservation, setMakeReservation] = useState(false)

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
    setNextStep(true);
  };

  // estado de ordenes pendientes
  const [pendingOrder, setPendingOrder] = useState<Order>();

  // useEffect(() => {
  //   // solo si pending order state es vacio
  //   const PendingOrder = async () => {
  //     let order = await GetPendingOrder();
  //     setPendingOrder(order);
  //   };
  //   PendingOrder();
  // }, []);

  const [offsetHistorial, setOffsetHistorial] = useState(0);
  const [ordersHistorial, setOrdersOrdersHistorial] = useState<Order[]>([]);

  useEffect(() => {
    const loadInitialOrders = async () => {
      let limit = 5;

      try {
        const fetchedOrders: Order[] = await GetOrderHistorial(
          limit,
          offsetHistorial
        );
        if (fetchedOrders.length > 0) {
          setOrdersOrdersHistorial(fetchedOrders);
          setOffsetHistorial(offsetHistorial + 5);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    loadInitialOrders();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        AllServices,
        services,
        setServices,
        selectedService,
        setSelectedService,
        navigationIndex,
        NavigationLinks,
        setNavigationIndex,
        AddNewIndex,
        nextStep,
        setNextStep,
        navigateToPrevious,
        barbersList,
        setBarberList,
        selectedBarber,
        setSelectedBarber,
        barberSchedules,
        setBarberSchedules,
        filteredSchedulesByDay,
        ShowSchedulesDayList,
        setFilteredSchedulesByDay,
        selectedShift,
        setSelectedShift,
        SelectShiftHandler,
        handleReserveClick,
        handleSelectBarber,
        pendingOrder,
        setPendingOrder,
        ordersHistorial,
        setOrdersOrdersHistorial,
        makeReservation,
        setMakeReservation,
        HandleMakeReservation
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
