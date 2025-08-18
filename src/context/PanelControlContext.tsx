import React, { ReactNode, useState } from "react";
import {
  Product,
} from "../internal/panel-control/models/ServicesModels";
import { MonthlyHaircuts } from "@/internal/barber/models/ChartModel";
import { Category } from "@/internal/panel-control/models/Category";
import { Post } from "@/internal/panel-control/models/Post";

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

  // Categorias
  categories: Category[] | []
  setCategories: React.Dispatch<React.SetStateAction<Category[] | []>>;


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


  // categorias
  // Lista de categorias
  const [categories, setCategories] = useState<Category[]>([])


 
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
        categories,
        setCategories,
      }}
    >
      {children}
    </PanelControlContext.Provider>
  );
};