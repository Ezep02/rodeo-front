
import React, { useState } from "react";
import { Barber } from "../types/Barber";
import { SlotWithStatus } from "../../../types/Slot";

interface TrackingContextProps {
  barberInfo: Barber | undefined
  setBarberInfo: React.Dispatch<React.SetStateAction<Barber | undefined>>

  // # Hash map para sincronizar los slots con el calendario
  slotByDateMap: Map<string, SlotWithStatus[]>
  setSlotByDateMap: React.Dispatch<React.SetStateAction<Map<string, SlotWithStatus[]>>>

  // # Fecha determinada por el calendario
  currentDate: Date
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>
}

export const CalendarContext = React.createContext<TrackingContextProps | undefined>(undefined);

interface ChildrenProviderProp {
  children: React.ReactNode;
}

export const CalendarContextProvider: React.FC<ChildrenProviderProp> = ({children}) => {
  
  // Informacion del barbero
  const [barberInfo, setBarberInfo] = useState<Barber>()

  // Hash map (clave: FECHA, valor: []slots )
  const [slotByDateMap, setSlotByDateMap] = useState<Map<string, SlotWithStatus[]>>(new Map)

  // Fecha donde se encuentra posicionado el calendario 
  const [currentDate, setCurrentDate] = useState(new Date());
  


  return (
    <CalendarContext.Provider
      value={{
       barberInfo,
       setBarberInfo,
       slotByDateMap,
       setSlotByDateMap,
       currentDate,
       setCurrentDate
      }}    
    >
      {children}
    </CalendarContext.Provider>
  );
};
