
import { Slot, SlotWithStatus } from "@/types/Slot";
import React, { useState } from "react";
import { BarberInfo } from "../types/BarberInfo";
import { PaymentOption } from "../types/Preference";

interface ShopContextProps {
  // # Hash map para sincronizar los slots con el calendario
  slotByDateMap: Map<string, SlotWithStatus[]>
  setSlotByDateMap: React.Dispatch<React.SetStateAction<Map<string, SlotWithStatus[]>>>
  // # Fecha determinada por el calendario
  currentDate: Date
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>
  // BARBERO Y HORARIO SELECCIONADO
  selectedBarber: BarberInfo | undefined
  setSelectedBarber:  React.Dispatch<React.SetStateAction<BarberInfo | undefined>>;
  selectedSlot: Slot | undefined
  setSelectedSlot:  React.Dispatch<React.SetStateAction<Slot | undefined>>;
  // Metodo de pago
  selectedPaymentMethod: string
  setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentOption | "">>;
}

export const ShopContext = React.createContext<ShopContextProps | undefined>(undefined);

interface ChildrenProviderProp {
  children: React.ReactNode;
}

export const ShopContextProvider: React.FC<ChildrenProviderProp> = ({children}) => {
  // Hash map (clave: FECHA, valor: []slots )
  const [slotByDateMap, setSlotByDateMap] = useState<Map<string, SlotWithStatus[]>>(new Map)

  // Fecha donde se encuentra posicionado el calendario 
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // # SELECCION DE BARBERO Y HORARIO
  const [selectedBarber, setSelectedBarber] = useState<BarberInfo>()
  const [selectedSlot, setSelectedSlot] = useState<Slot>()

  // # SELECCION DE METODO DE PAGO
  const [selectedPaymentMethod, setPaymentMethod] = useState<PaymentOption | "">("")

  return (
    <ShopContext.Provider
      value={{
        slotByDateMap,
        setSlotByDateMap,
        currentDate,
        setCurrentDate,
        selectedBarber,
        setSelectedBarber,
        selectedSlot,
        setSelectedSlot,
        selectedPaymentMethod,
        setPaymentMethod
      }}    
    >
      {children}
    </ShopContext.Provider>
  );
};
