import React, { ReactNode, useState } from "react";
import {
  Product,
} from "../internal/panel-control/models/ServicesModels";
import { MonthlyHaircuts } from "@/internal/panel-control/models/ChartModel";
import { Appointment } from "@/internal/panel-control/models/Appointments";

interface AuthContextProps {
  
 
  // PRODUCTS
  productList: Product[];
  setProductList: React.Dispatch<React.SetStateAction<Product[]>>;

  serviceLoading: boolean;
  setServiceIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  yearlyCutsChartData: MonthlyHaircuts[] | [];
  setYearlyCutsChartData: React.Dispatch<React.SetStateAction<MonthlyHaircuts[] | []>>;
  servicesOffset: number
  setServicesOffset: React.Dispatch<React.SetStateAction<number>>;
  selectedServiceToDelete: Product | undefined
  setSelectedServiceToDelete: React.Dispatch<React.SetStateAction<Product | undefined>>;
  // A B M servicios
  editModalOpen: boolean
  setEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteDialogOpen: boolean
  setDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;

  // NEXT APPOINTMENT
  nextAppointment: Appointment[] | []
  setNextAppointment: React.Dispatch<React.SetStateAction<Appointment[]>>

}

export const PanelControlContext = React.createContext<AuthContextProps | undefined>(undefined);

interface ChildrenProviderProp { children: ReactNode }

export const PanelControlContextProvider: React.FC<ChildrenProviderProp> = ({ children }) => {


  


  // Guardar los cambios del scheduler
  //cortes totales por mes
  const [yearlyCutsChartData, setYearlyCutsChartData] = useState<MonthlyHaircuts[]>([]);
  //Servicios
  const [serviceLoading, setServiceIsLoading] = useState(false);
  const [productList, setProductList] = useState<Product[]>([]);
  const [servicesOffset, setServicesOffset] = useState<number>(0);
  const [selectedServiceToDelete, setSelectedServiceToDelete] = useState<Product>();
  // EDICION, CREACION, ELIMINACION DE SERVICIOS
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)


  // V1 APPOINTMENTS
  const [nextAppointment, setNextAppointment] = useState<Appointment[] | []>([])




  return (
    <PanelControlContext.Provider
      value={{
        productList,
        setProductList,
        serviceLoading,
        setServiceIsLoading,
        yearlyCutsChartData,
        setYearlyCutsChartData,
        servicesOffset,
        setServicesOffset,
        selectedServiceToDelete,
        setSelectedServiceToDelete,
        editModalOpen,
        setEditModalOpen,
        deleteDialogOpen,
        setDeleteDialogOpen,
        nextAppointment,
        setNextAppointment
      }}
    >
      {children}
    </PanelControlContext.Provider>
  );
};