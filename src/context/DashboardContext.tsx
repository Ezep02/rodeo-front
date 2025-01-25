import React, { ReactNode, useEffect, useState } from "react";
import {
  Service,
} from "../internal/panel-control/models/Services.models";
import {
  GetServices,
  GetAvailableSchedules,
  GetOrderHistorial,
} from "../internal/dashboard/services/DashboardService";
import {
  Shift
} from "../internal/dashboard/models/DashboardModels";
import { Order } from "../internal/dashboard/models/OrderModels";

interface DashboardContextProps {
  AllServices: () => void;
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  selectedService: Service | undefined;
  setSelectedService: React.Dispatch<React.SetStateAction<Service | undefined>>;

  barberSchedules: Shift[];
  setBarberSchedules: React.Dispatch<React.SetStateAction<Shift[]>>;
 
  filteredSchedulesByDay: Shift[];
  setFilteredSchedulesByDay: React.Dispatch<React.SetStateAction<Shift[]>>;
  selectedShift: Shift | undefined;
  setSelectedShift: React.Dispatch<React.SetStateAction<Shift | undefined>>;
  SelectDateHandler: (day: Date) => void;
  SelectScheduleTimeHandler: (selectedShift: Shift) => void

  handleReserveClick: (srv: Service) => void;
  pendingOrder: Order | undefined;
  setPendingOrder: React.Dispatch<React.SetStateAction<Order | undefined>>;
  ordersHistorial: Order[];
  setOrdersOrdersHistorial: React.Dispatch<React.SetStateAction<Order[]>>;
  makeReservation: boolean;
  setMakeReservation: React.Dispatch<React.SetStateAction<boolean>>;
  HandleMakeReservation: ()=> void
  LoadAvailableSchedules: () => void
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
  const [serviceOffset, setServiceOffset] = useState<number>(0);

  const AllServices = async () => {

    let limit: number = 5;

    try {
      const fetchedServices: Service[] = await GetServices(limit, serviceOffset);
      if (fetchedServices.length > 0) {
        
        setServices((prev) => {
 
          const filtered = fetchedServices.filter(
            (newService) => !prev.some((existingService) => existingService.ID === newService.ID)
          );
          
       
          return [...prev, ...filtered];
        });

        setServiceOffset(serviceOffset + 5);
      }
      
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };




  const [selectedService, setSelectedService] = useState<Service>();

  // Horarios de los barbero
  const [barberSchedules, setBarberSchedules] = useState<Shift[]>(
    []
  );

  // Reservation 

  // cada vez que el dia cambia, se realiza un filtro en busqueda de shifts cargados previamente
  const [schedulerOffset, setSchedulerOffset] = useState<number>(0);

  const [filteredSchedulesByDay, setFilteredSchedulesByDay] = useState<Shift[]>([]);

  const LoadAvailableSchedules = async () => {
    let limit: number = 31;

    try {
      let schedulesResponse = await GetAvailableSchedules(limit,schedulerOffset);
      
      setBarberSchedules((prev) => {
        schedulesResponse
        
        const filtered = schedulesResponse.filter(
          (existing) => !prev.some((existingSchedule) => existingSchedule.ID === existing.ID)
        );
        
        return [...prev, ...filtered];
      });
    
      
      setSchedulerOffset(schedulerOffset + 31);
    } catch (error) {
      console.log("schedules error", error);
    }
  }

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

  // useEffect(() => {
  //   const loadInitialOrders = async () => {
  //     let limit = 5;

  //     try {
  //       const fetchedOrders: Order[] = await GetOrderHistorial(
  //         limit,
  //         offsetHistorial
  //       );
  //       if (fetchedOrders.length > 0) {
  //         setOrdersOrdersHistorial(fetchedOrders);
  //         setOffsetHistorial(offsetHistorial + 5);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching orders:", error);
  //     }
  //   };

  //   loadInitialOrders();
  // }, []);


  return (
    <DashboardContext.Provider
      value={{
        AllServices,
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
        pendingOrder,
        setPendingOrder,
        ordersHistorial,
        setOrdersOrdersHistorial,
        makeReservation,
        setMakeReservation,
        HandleMakeReservation,
        SelectDateHandler,
        LoadAvailableSchedules,
        SelectScheduleTimeHandler
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
