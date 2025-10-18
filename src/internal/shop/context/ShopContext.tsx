
import { Slot, SlotWithStatus } from "@/types/Slot";
import React, { useState } from "react";
import { BarberInfo } from "../types/BarberInfo";
import { PaymentOption } from "../types/Preference";
import { Service } from "@/types/ServiceTypes";
import { Payment } from "../types/Payment";

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
  selectedPaymentMethod: PaymentOption | ""
  setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentOption | "">>;
  // Informacion del servicio seleccionado
  serviceInfo: Service | undefined
  setServiceInfo: React.Dispatch<React.SetStateAction<Service | undefined>>;
  // Manejo de errores de preferencia
  transactionErr: string | null 
  setTransactionErr: React.Dispatch<React.SetStateAction<string | null>>;
  // Payment obtenido como respuesta luego de generar una preferencia con alias
  prefWithAliasPayment: Payment | undefined
  setPrefWithAliasPayment: React.Dispatch<React.SetStateAction<Payment | undefined>>;
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

  // Informacion del servicio seleccionado
  const [serviceInfo, setServiceInfo] = useState<Service>();

  // Transaccion iniciada al momento de intentar crear la preferencia
  const [transactionErr, setTransactionErr] = useState<string | null>(null);

  // Informacion de la transaccion genereada por el cliente (CREACION DE PREFERENCIA CON ALIAS)
  const [prefWithAliasPayment, setPrefWithAliasPayment] = useState<Payment>()

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
        setPaymentMethod,
        serviceInfo,
        setServiceInfo,
        transactionErr,
        setTransactionErr,
        prefWithAliasPayment,
        setPrefWithAliasPayment
      }}    
    >
      {children}
    </ShopContext.Provider>
  );
};
