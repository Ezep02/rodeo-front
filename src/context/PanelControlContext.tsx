import React, { ReactNode, useEffect, useState } from "react";
import { Order } from "../internal/panel-control/types/OrderTypes";
import {
  GetOrderList,
  GetSchedulesList,
  GetServicesList,
  UpdateSchedulesList,
  UpdateServiceByID,
} from "../internal/panel-control/services/PanelServices";
import {
  ScheduleDayResponse,
  ScheduleModifyDay,
} from "../internal/panel-control/models/Shadules.models";
import { Service } from "../internal/panel-control/models/Services.models";

interface AuthContextProps {
  GetOrdersList: () => Promise<void>;
  orderList: Order[];
  setOrderList: React.Dispatch<React.SetStateAction<Order[]>>;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  serviceOffset: number;
  serviceList: Service[];
  setServiceList: React.Dispatch<React.SetStateAction<Service[]>>;
  setServiceOffset: React.Dispatch<React.SetStateAction<number>>;
  modifyScheduler: boolean;
  setModifyScheduler: React.Dispatch<React.SetStateAction<boolean>>;
  addScheduler: boolean;
  setAddScheduler: React.Dispatch<React.SetStateAction<boolean>>;
  HandleModifyScheduler: () => void;
  HandleAddScheduler: () => void;
  scheduleList: ScheduleDayResponse[];
  setScheduleList: React.Dispatch<React.SetStateAction<ScheduleDayResponse[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  serviceLoading: boolean;
  setServiceIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  GetServices: () => Promise<void>;
  schedule: ScheduleModifyDay[];
  setSchedule: React.Dispatch<React.SetStateAction<ScheduleModifyDay[]>>;
  HandleSaveChanges: () => Promise<void>;
  openServices: boolean;
  setOpenServices: React.Dispatch<React.SetStateAction<boolean>>;
  editarServicio: boolean;
  setEditarServicio: React.Dispatch<React.SetStateAction<boolean>>;
  HandleEditarServicioView: () => void;
  selectedServiceToEdit: Service;
  setSelectedServiceToEdit: React.Dispatch<React.SetStateAction<Service>>;
  HandleEditarServicio: () => void;
  UpdateServiceData: () => void;
}

export const PanelControlContext = React.createContext<
  AuthContextProps | undefined
>(undefined);

interface ChildrenProviderProp {
  children: ReactNode;
}

export const PanelControlContextProvider: React.FC<ChildrenProviderProp> = ({
  children,
}) => {
  const [offset, setOffset] = useState(0);
  const [orderList, setOrderList] = useState<Order[]>([]);

  useEffect(() => {
    const loadInitialOrders = async () => {
      let limit = "5";

      try {
        const fetchedOrders: Order[] = await GetOrderList(
          limit,
          String(offset)
        );
        if (fetchedOrders.length > 0) {
          setOrderList(fetchedOrders);
          setOffset(offset + 5);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    loadInitialOrders();
  }, []);

  //loader
  const [isLoading, setIsLoading] = useState(false);

  const GetOrdersList = async () => {
    let limit = "5";

    setIsLoading(true);
    try {
      const fetchedOrders: Order[] = await GetOrderList(limit, String(offset));
      if (fetchedOrders.length > 0) {
        setOrderList((prev: Order[] | null) => {
          return prev ? [...prev, ...fetchedOrders] : fetchedOrders;
        });
        setOffset(offset + 5);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Scheduler
  const [modifyScheduler, setModifyScheduler] = useState(false);
  const [addScheduler, setAddScheduler] = useState(false);

  // View Scheduler Buttons Handlers
  const HandleModifyScheduler = () => setModifyScheduler((prev) => !prev);
  const HandleAddScheduler = () => setAddScheduler((prev) => !prev);

  const [scheduleList, setScheduleList] = useState<ScheduleDayResponse[]>([]);

  useEffect(() => {
    const loadScheduleList = async () => {
      const response = await GetSchedulesList();

      if (response) {
        setScheduleList(response);
      }
    };

    loadScheduleList();
  }, []);

  const [schedule, setSchedule] = useState<ScheduleModifyDay[]>([]);
  // Guardar los cambios
  const HandleSaveChanges = async () => {
    try {
      await UpdateSchedulesList(schedule);
    } catch (error) {
      console.log(error);
    }

    // extraer los datos actualizados, y actualizar el hook
    // cerrar el viewer updated
    HandleModifyScheduler();
  };

  //Servicios
  const [serviceOffset, setServiceOffset] = useState(0);
  const [serviceList, setServiceList] = useState<Service[]>([]);
  const [serviceLoading, setServiceIsLoading] = useState(false);
  const [openServices, setOpenServices] = useState(false);

  useEffect(() => {
    let serviceLimit = "5";
    const loadInitialServices = async () => {
      const response: Service[] = await GetServicesList(
        serviceLimit,
        String(serviceOffset)
      );

      if (response) {
        setServiceList(response);
      }
    };
    loadInitialServices();
  }, []);

  const GetServices = async () => {
    let servicelimit = "5";

    setServiceIsLoading(true);

    try {
      const response: Service[] = await GetServicesList(
        servicelimit,
        String(serviceOffset)
      );
      if (response.length > 0) {
        setServiceList((prev: Service[] | null) => {
          return prev ? [...prev, ...response] : response;
        });
        setServiceOffset(offset + 5);
        setServiceIsLoading(false);
      }
    } catch (error) {
      console.error("Error obteniendo los servicios", error);
    }
  };

  // EDICION, CREACION, ELIMINACION DE SERVICIOS
  const [editarServicio, setEditarServicio] = useState<boolean>(false);
  const [selectedServiceToEdit, setSelectedServiceToEdit] = useState<Service>({
    created_by_id: 0,
    description: "",
    ID: 0,
    price: 0,
    title: "",
    service_duration: 0,
  });

  // muestra los servicos
  const HandleEditarServicioView = () => {
    setOpenServices((prev) => !prev);
  };

  //abre la ventana de edicion de servicios
  const HandleEditarServicio = () => {
    setEditarServicio((prev) => !prev);
  };

  // funcion para manejar la actualizacion del servicio
  const UpdateServiceData = async () => {
    
    console.log(selectedServiceToEdit)
    try {
      const updatedServe = await UpdateServiceByID(selectedServiceToEdit, selectedServiceToEdit.ID);
      console.log(updatedServe);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PanelControlContext.Provider
      value={{
        orderList,
        GetOrdersList,
        setOrderList,
        offset,
        setOffset,
        serviceOffset,
        setServiceOffset,
        modifyScheduler,
        setModifyScheduler,
        HandleModifyScheduler,
        scheduleList,
        setScheduleList,
        addScheduler,
        setAddScheduler,
        HandleAddScheduler,
        isLoading,
        setIsLoading,
        schedule,
        setSchedule,
        HandleSaveChanges,
        serviceList,
        setServiceList,
        serviceLoading,
        setServiceIsLoading,
        GetServices,
        openServices,
        setOpenServices,
        editarServicio,
        setEditarServicio,
        HandleEditarServicioView,
        selectedServiceToEdit,
        setSelectedServiceToEdit,
        HandleEditarServicio,
        UpdateServiceData,
      }}
    >
      {children}
    </PanelControlContext.Provider>
  );
};
