import React, { ReactNode, useEffect, useState } from "react";
import { Order } from "../internal/panel-control/types/OrderTypes";
import {
  CreateService,
  GetInstagramFeedMedias,
  GetOrderList,
  GetSchedulesList,
  GetServicesList,
  UpdateSchedulesList,
  UpdateServiceByID,
} from "../internal/panel-control/services/PanelServices";
import { ScheduleResponse } from "../internal/panel-control/models/Shadules.models";
import {
  MediaResponse,
  Service,
  ServiceRequest,
} from "../internal/panel-control/models/Services.models";

interface AuthContextProps {
  GetOrdersList: () => Promise<void>;
  orderList: Order[];
  setOrderList: React.Dispatch<React.SetStateAction<Order[]>>;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  serviceList: Service[];
  setServiceList: React.Dispatch<React.SetStateAction<Service[]>>;
  modifyScheduler: boolean;
  setModifyScheduler: React.Dispatch<React.SetStateAction<boolean>>;
  addScheduler: boolean;
  setAddScheduler: React.Dispatch<React.SetStateAction<boolean>>;
  HandleModifyScheduler: () => void;
  HandleAddScheduler: () => void;
  scheduleList: ScheduleResponse[];
  setScheduleList: React.Dispatch<React.SetStateAction<ScheduleResponse[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  serviceLoading: boolean;
  setServiceIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  schedule: ScheduleResponse[];
  setSchedule: React.Dispatch<React.SetStateAction<ScheduleResponse[]>>;
  HandleSaveChanges: () => Promise<void>;
  openServices: boolean;
  setOpenServices: React.Dispatch<React.SetStateAction<boolean>>;
  editarServicio: boolean;
  setEditarServicio: React.Dispatch<React.SetStateAction<boolean>>;
  HandleEditarServicioView: () => void;
  selectedServiceToEdit: Service;
  setSelectedServiceToEdit: React.Dispatch<React.SetStateAction<Service>>;
  HandleEditarServicio: () => void;
  UpdateServiceData: (data: Service) => Promise<void>;
  openAddService: boolean;
  setOpenAddService: React.Dispatch<React.SetStateAction<boolean>>;
  CreateNewService: (data: ServiceRequest) => Promise<void>;
  HandleAddNewService: () => void;
  instagramPhotosloading: boolean;
  setInstagramPhotosLoading: React.Dispatch<React.SetStateAction<boolean>>;
  mediaList: MediaResponse[];
  setMediaList: React.Dispatch<React.SetStateAction<MediaResponse[]>>;
  selectedMediaUrl: string;
  setSelectedMediaUrl: React.Dispatch<React.SetStateAction<string>>;
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

  const [scheduleList, setScheduleList] = useState<ScheduleResponse[]>([]);

  useEffect(() => {
    const loadScheduleList = async () => {
      const response = await GetSchedulesList();

      if (response) {
        setScheduleList(response);
      }
    };

    loadScheduleList();
  }, []);

  const [schedule, setSchedule] = useState<ScheduleResponse[]>([]);
  // Guardar los cambios
  const HandleSaveChanges = async () => {
    try {
      // console.log("NEW",schedule)

      await UpdateSchedulesList(schedule);
    } catch (error) {
      console.log(error);
    }

    // extraer los datos actualizados, y actualizar el hook
    // cerrar el viewer updated
    HandleModifyScheduler();
  };

  //Servicios
  const [serviceList, setServiceList] = useState<Service[]>([]);
  const [serviceLoading, setServiceIsLoading] = useState(false);
  const [openServices, setOpenServices] = useState(false);
  const [openAddService, setOpenAddService] = useState(false);

  useEffect(() => {
    const loadInitialServices = async () => {
      const response: Service[] = await GetServicesList();

      if (response) {
        setServiceList(response);
      }
    };
    loadInitialServices();
  }, []);

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

  // Abre el formulario de agregar servicio
  const HandleAddNewService = () => {
    setOpenAddService((prev) => !prev);
  };

  // funcion para manejar la actualizacion del servicio
  const UpdateServiceData = async (data: Service) => {
    try {
      await UpdateServiceByID(data, data.ID);
      HandleEditarServicio();
    } catch (error) {
      console.log(error);
    }
  };

  const CreateNewService = async (data: ServiceRequest) => {
    try {
      await CreateService(data);
    } catch (error) {
      console.log(error);
    }
  };

  // instagram photos

  const [selectedMediaUrl, setSelectedMediaUrl] = useState<string>("");
  const [mediaList, setMediaList] = useState<MediaResponse[]>([]);
  const [instagramPhotosloading, setInstagramPhotosLoading] = useState<boolean>(false);



  const SearchImages = async () => {
    setInstagramPhotosLoading(true);
    try {
      const res = await GetInstagramFeedMedias()
      setMediaList(res.data);
      setInstagramPhotosLoading(false);
    } catch (error) {
      console.error("Error fetching media:", error);
    }
  };

  useEffect(() => {
    SearchImages();
  }, []);

  return (
    <PanelControlContext.Provider
      value={{
        orderList,
        GetOrdersList,
        setOrderList,
        offset,
        setOffset,
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
        openServices,
        setOpenServices,
        editarServicio,
        setEditarServicio,
        HandleEditarServicioView,
        selectedServiceToEdit,
        setSelectedServiceToEdit,
        HandleEditarServicio,
        UpdateServiceData,
        openAddService,
        setOpenAddService,
        CreateNewService,
        HandleAddNewService,
        selectedMediaUrl,
        setSelectedMediaUrl,
        mediaList,
        setMediaList,
        instagramPhotosloading,
        setInstagramPhotosLoading,
      }}
    >
      {children}
    </PanelControlContext.Provider>
  );
};
