import React, { ReactNode, useState } from "react";

import {
  GetInstagramFeedMedias,
} from "../internal/panel-control/services/PanelServices";
import {

  Schedule,
  ScheduleResponse,
} from "../internal/panel-control/models/ShadulesModels";
import {
  MediaResponse,
  Service,
} from "../internal/panel-control/models/ServicesModels";
import { MonthlyHaircuts } from "@/internal/panel-control/models/ChartModel";
import { PendingOrder } from "@/internal/panel-control/models/OrderModel";

interface AuthContextProps {
  orderList: PendingOrder[];
  setOrderList: React.Dispatch<React.SetStateAction<PendingOrder[]>>;
  orderOffset: number;
  setOrderOffset: React.Dispatch<React.SetStateAction<number>>;
  serviceList: Service[];
  setServiceList: React.Dispatch<React.SetStateAction<Service[]>>;
  isSchedulerOpen: boolean;
  setIsSchedulerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  scheduleList: ScheduleResponse[];
  setScheduleList: React.Dispatch<React.SetStateAction<ScheduleResponse[]>>;
  schedule: Schedule | undefined;
  setSchedule: React.Dispatch<React.SetStateAction<Schedule | undefined>>;
  schedulesLoader: boolean;
  setSchedulesLoader: React.Dispatch<React.SetStateAction<boolean>>;

  isOrderLoading: boolean;
  setOrderIsLoading: React.Dispatch<React.SetStateAction<boolean>>;

  serviceLoading: boolean;
  setServiceIsLoading: React.Dispatch<React.SetStateAction<boolean>>;

  editarServicio: boolean;
  setEditarServicio: React.Dispatch<React.SetStateAction<boolean>>;
  selectedServiceToEdit: Service | undefined;
  setSelectedServiceToEdit: React.Dispatch<React.SetStateAction<Service | undefined>>;
  openAddService: boolean;
  setOpenAddService: React.Dispatch<React.SetStateAction<boolean>>;
  instagramPhotosloading: boolean;
  setInstagramPhotosLoading: React.Dispatch<React.SetStateAction<boolean>>;
  mediaList: MediaResponse[];
  setMediaList: React.Dispatch<React.SetStateAction<MediaResponse[]>>;
  selectedMediaUrl: string;
  setSelectedMediaUrl: React.Dispatch<React.SetStateAction<string>>;
  InstagramLogin: () => void;


  yearlyCutsChartData: MonthlyHaircuts[] | [];
  setYearlyCutsChartData: React.Dispatch<React.SetStateAction<MonthlyHaircuts[] | []>>;
  servicesOffset: number
  setServicesOffset: React.Dispatch<React.SetStateAction<number>>;

  deleteNotification: boolean
  setDeleteNofitification: React.Dispatch<React.SetStateAction<boolean>>;
  selectedServiceToDelete: Service | undefined
  setSelectedServiceToDelete: React.Dispatch<React.SetStateAction<Service | undefined>>;

  schedulerOffset: number;
  setSchedulerOffset: React.Dispatch<React.SetStateAction<number>>;
  date: Date | undefined
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;

  filteredSchedules: ScheduleResponse[] | []
  setFilteredSchedules: React.Dispatch<React.SetStateAction<ScheduleResponse[] | []>>;
}

export const PanelControlContext = React.createContext<AuthContextProps | undefined>(undefined);

interface ChildrenProviderProp { children: ReactNode }

export const PanelControlContextProvider: React.FC<ChildrenProviderProp> = ({ children }) => {
  const [orderOffset, setOrderOffset] = useState(0);
  const [orderList, setOrderList] = useState<PendingOrder[]>([]);

  //loader
  const [isOrderLoading, setOrderIsLoading] = useState(false);

  // Scheduler
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [schedulesLoader, setSchedulesLoader] = useState<boolean>(false);

  // View Scheduler Buttons Handlers

  const [scheduleList, setScheduleList] = useState<ScheduleResponse[]>([]);

  // scheduler offset
  const [schedulerOffset, setSchedulerOffset] = useState<number>(0);


  // Guardar los cambios del scheduler
  const [schedule, setSchedule] = useState<Schedule | undefined>(undefined);
  const [filteredSchedules, setFilteredSchedules] = useState<ScheduleResponse[]>([]);

  //cortes totales por mes
  const [yearlyCutsChartData, setYearlyCutsChartData] = useState<MonthlyHaircuts[]>([]);



  //Servicios
  const [serviceLoading, setServiceIsLoading] = useState(false);
  const [openAddService, setOpenAddService] = useState(false);

  const [serviceList, setServiceList] = useState<Service[]>([]);
  const [servicesOffset, setServicesOffset] = useState<number>(0);


  const [selectedServiceToDelete, setSelectedServiceToDelete] = useState<Service>();
  const [deleteNotification, setDeleteNofitification] = useState(false);


  // EDICION, CREACION, ELIMINACION DE SERVICIOS
  const [editarServicio, setEditarServicio] = useState<boolean>(false);
  const [selectedServiceToEdit, setSelectedServiceToEdit] = useState<Service>();

  // instagram photos
  const [selectedMediaUrl, setSelectedMediaUrl] = useState<string>("");
  const [mediaList, setMediaList] = useState<MediaResponse[]>([]);
  const [instagramPhotosloading, setInstagramPhotosLoading] = useState<boolean>(false);

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

  // useEffect(() => {
  //   SearchImages();
  // }, []);

  const InstagramLogin = async () => {
    // Construir la URL para redirigir al usuario
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${import.meta.env.VITE_RODEO_ID}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&scope=instagram_business_basic&response_type=code`
    // Abrir la URL de autenticación en una nueva ventana o pestaña
    window.location.href = authUrl
  };

  return (
    <PanelControlContext.Provider
      value={{
        orderList,
        setOrderList,
        orderOffset,
        setOrderOffset,
        setIsSchedulerOpen,
        isSchedulerOpen,
        scheduleList,
        setScheduleList,
        isOrderLoading,
        setOrderIsLoading,
        serviceList,
        setServiceList,
        serviceLoading,
        setServiceIsLoading,
        editarServicio,
        setEditarServicio,
        selectedServiceToEdit,
        setSelectedServiceToEdit,
        openAddService,
        setOpenAddService,
        selectedMediaUrl,
        setSelectedMediaUrl,
        mediaList,
        setMediaList,
        instagramPhotosloading,
        setInstagramPhotosLoading,
        InstagramLogin,
        schedule,
        setSchedule,
        yearlyCutsChartData,
        setYearlyCutsChartData,
        servicesOffset,
        setServicesOffset,
        deleteNotification,
        setDeleteNofitification,
        selectedServiceToDelete,
        setSelectedServiceToDelete,
        schedulerOffset,
        setSchedulerOffset,
        date,
        setDate,
        filteredSchedules,
        setFilteredSchedules,
        schedulesLoader,
        setSchedulesLoader
      }}
    >
      {children}
    </PanelControlContext.Provider>
  );
};
