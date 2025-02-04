import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { Order } from "../internal/panel-control/types/OrderTypes";
import {
  CreateLongInstagramToken,
  CreateService,
  GetInstagramFeedMedias,
  GetOrderList,
  GetBarberSchedulesList,
  GetBarberServicesList,
  GetShortInstagramToken,
  UpdateBarberSchedules,
  UpdateServiceByID,
  GetBarberCutsByMonth,
} from "../internal/panel-control/services/PanelServices";
import {
  CutsQuantity,
  Schedule,
  ScheduleResponse,
} from "../internal/panel-control/models/Shadules.models";
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
  HandleModifyScheduler: () => void;
  scheduleList: ScheduleResponse[];
  setScheduleList: React.Dispatch<React.SetStateAction<ScheduleResponse[]>>;
  schedule: Schedule | undefined;
  setSchedule: React.Dispatch<React.SetStateAction<Schedule | undefined>>;
  HandleSaveSchedulesChanges: () => Promise<void>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  serviceLoading: boolean;
  setServiceIsLoading: React.Dispatch<React.SetStateAction<boolean>>;

  editarServicio: boolean;
  setEditarServicio: React.Dispatch<React.SetStateAction<boolean>>;
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
  InstagramLogin: () => void;
  HandleLoadSchedulesList: () => Promise<void>;
  cutsChartData: CutsQuantity[];
  setCutsChartData: React.Dispatch<React.SetStateAction<CutsQuantity[]>>;
  LoadServices: () => void;
  HandleLoadTotalCuts: () => void;
  loadInitialOrders: () => void
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


  //loader
  const [isLoading, setIsLoading] = useState(false);

  const GetOrdersList = async () => {
    let limit = "10";

    setIsLoading(true);
    try {
      const fetchedOrders: Order[] = await GetOrderList(limit, String(offset));
      if (fetchedOrders.length > 0) {
        setOrderList((prev: Order[] | null) => {
          return prev ? [...prev, ...fetchedOrders] : fetchedOrders;
        });
        setOffset(offset + 5);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Scheduler
  const [modifyScheduler, setModifyScheduler] = useState(false);
  // View Scheduler Buttons Handlers
  const HandleModifyScheduler = () => setModifyScheduler((prev) => !prev);
  const [scheduleList, setScheduleList] = useState<ScheduleResponse[]>([]);

  // scheduler offset
  const [schedulerOffset, setSchedulerOffset] = useState<number>(0);

  const HandleLoadSchedulesList = async () => {
    // TODO: utilizar offset y limit solo si cambia el mes
    let limit: number = 31;

    try {
      let schedulesResponse = await GetBarberSchedulesList(
        limit,
        schedulerOffset
      );
      setSchedulerOffset((prev) => prev + 31);
      setScheduleList(schedulesResponse);
    } catch (error) {
      console.log("schedules error", error);
    }
  };

 

  // Guardar los cambios del scheduler
  const [schedule, setSchedule] = useState<Schedule | undefined>(undefined);
  const HandleSaveSchedulesChanges = async () => {
    if (schedule) {
      try {
        // filtrar los schedules con status "NOT CHANGE", y luego realizar la peticion
        schedule.schedule_add = schedule.schedule_add.filter(
          (sch) => sch.Schedule_status !== "NOT CHANGE"
        );

        await UpdateBarberSchedules(schedule);

        // Actualizar el estado si hay schedules para eliminar
        if (schedule.schedule_delete && schedule.schedule_delete?.length > 0) {
          setScheduleList((prev) => {
            const updatedData = prev.filter(
              (sch) =>
                !schedule.schedule_delete?.some((delID) => delID.ID === sch.ID)
            );
            return updatedData;
          });
        }

        HandleModifyScheduler();
      } catch (error) {
        console.log("error al guardar los datos", error);
      }
    } else {
      console.log("Schedules es undefined");
    }
  };

  //cortes totales por mes

  const [cutsChartData, setCutsChartData] = useState<CutsQuantity[]>([]);

  const HandleLoadTotalCuts = async () => {
    
    try {
      const res = await GetBarberCutsByMonth();

      if (res) {
        setCutsChartData(res);
      }
    } catch (error) {
      console.log("load cuts", error);
    }
  };


  //Servicios
  const [serviceLoading, setServiceIsLoading] = useState(false);
  const [openAddService, setOpenAddService] = useState(false);
  
  const [serviceList, setServiceList] = useState<Service[]>([]);
  const [servicesOffset, setServicesOffset] = useState<number>(0);

  const LoadServices = async () => {
    
    const limit = 5;
    // Obtener nuevos datos desde la API
    const response = await GetBarberServicesList(limit, servicesOffset); 
   
    if (response.length > 0) {
  
      setServiceList((prev) => {
 
        const filtered = response.filter(
          (newService) => !prev.some((existingService) => existingService.ID === newService.ID)
        );
        
     
        return [...prev, ...filtered];
      });
 
      setServicesOffset(servicesOffset+5);
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
  const [instagramPhotosloading, setInstagramPhotosLoading] =
    useState<boolean>(false);

  const SearchImages = async () => {
    setInstagramPhotosLoading(true);

    try {
      const res = await GetInstagramFeedMedias();
      setMediaList(res.data);
      setInstagramPhotosLoading(false);
    } catch (error) {
      console.error("Error fetching media:", error);
    }
  };

  useEffect(() => {
    SearchImages();
  }, []);

  const InstagramLogin = async () => {
    // Construir la URL para redirigir al usuario
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${import.meta.env.VITE_RODEO_ID}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&scope=instagram_business_basic&response_type=code`
    // Abrir la URL de autenticación en una nueva ventana o pestaña
    window.location.href = authUrl
  };

  // Verificar si hay un código en la URL

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
        isLoading,
        setIsLoading,
        HandleSaveSchedulesChanges,
        serviceList,
        setServiceList,
        serviceLoading,
        setServiceIsLoading,

        editarServicio,
        setEditarServicio,

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
        InstagramLogin,
        schedule,
        setSchedule,
        HandleLoadSchedulesList,
        cutsChartData,
        setCutsChartData,
        LoadServices,
        HandleLoadTotalCuts,
        loadInitialOrders
      }}
    >
      {children}
    </PanelControlContext.Provider>
  );
};
