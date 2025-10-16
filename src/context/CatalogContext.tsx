import { Slot } from "@/types/Slot";
import { BarberInfo } from "@/internal/shop/types/BarberInfo";
import { Categorie } from "@/types/Categorie";
import { Media } from "@/types/MediaFile";
import { Promotion } from "@/types/Promotions";
import { Service } from "@/types/ServiceTypes";
import React, { ReactNode, useState } from "react";



interface CatalogContextProps {
  // PRODUCTS
  serviceList: Service[];
  setServiceList: React.Dispatch<React.SetStateAction<Service[]>>;

  // PROMOCIONES
  promotionList: Promotion[]
  setPromotionList: React.Dispatch<React.SetStateAction<Promotion[]>>;

  // CATEGORIAS
  categorieList: Categorie[]
  setCategorieList: React.Dispatch<React.SetStateAction<Categorie[]>>;
  
  // CONTENIDO MULTIMEDIA RELACIANADO A LOS SERVICIOS
  serviceMedia: Media[] | []
  setServiceMedia: React.Dispatch<React.SetStateAction<Media[]>>;

  // BARBEROS DISPONIBLES
  availableBarbers: BarberInfo[];
  setAvailableBarbers: React.Dispatch<React.SetStateAction<BarberInfo[]>>;
}

export const CatalogContext = React.createContext<CatalogContextProps | undefined>(undefined);

interface ChildrenProviderProp { children: ReactNode }

export const CatalogContextProvider: React.FC<ChildrenProviderProp> = ({ children }) => {

  // # Listado de servicios cargados
  const [serviceList, setServiceList] = useState<Service[]>([]);

  // PROMOCIONES
  const [promotionList, setPromotionList] = useState<Promotion[]>([])

  // # Listado de categorias 
  const [categorieList, setCategorieList] = useState<Categorie[]>([])

  // # Contenido multimedia del servicio
  const [serviceMedia, setServiceMedia] = useState<Media[] | []>([])

  // # BARBEROS DISPONIBLES
  const [availableBarbers, setAvailableBarbers] = useState<BarberInfo[] | []>([])


  return (
    <CatalogContext.Provider
      value={{
        serviceList,
        setServiceList,
        promotionList,
        setPromotionList,
        categorieList,
        setCategorieList,
        serviceMedia,
        setServiceMedia,
        availableBarbers,
        setAvailableBarbers,
       
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};