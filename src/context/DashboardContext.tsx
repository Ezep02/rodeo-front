import React, { ReactNode, useState } from "react";


import { Product } from "@/internal/reservation/model/Product";

import { Slot, SlotWithStatus } from "@/types/Slot";
import { BarberInfo } from "@/types/BarberInfo";
import { Booking } from "@/models/Appointment";
import { selectedOption } from "@/internal/dashboard/types/Stepper";
import { PaymentInfoResponse } from "@/internal/dashboard/types/Booking";

interface DashboardContextProps {
  // V1
  // PRODUCTS
  productShop: Product[] | [];
  setProductShop: React.Dispatch<React.SetStateAction<Product[] | []>>;

  sliderDate: Date;
  setSliderDate: React.Dispatch<React.SetStateAction<Date>>;

  // Opcion seleccionada en el stepper
  selectedAction: selectedOption | ""
  setActionOption: React.Dispatch<React.SetStateAction<selectedOption | "">>;


  // ACCIONES DEL CALENDARIO DE HORARIO
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
  // BARBEROS DISPONIBLES
  availableBarbers: BarberInfo[];
  setAvailableBarbers: React.Dispatch<React.SetStateAction<BarberInfo[]>>;
  // Booking seleccionado al abrir el dialogo de detalles
  selectedBooking: Booking | undefined
  setSelectedBooking: React.Dispatch<React.SetStateAction<Booking | undefined>>;
  // # Hash map para almacenar la informacion de pago de cada slot
  paymentInfoMap: Map<number, PaymentInfoResponse>
  setPaymentInfoMap: React.Dispatch<React.SetStateAction<Map<number, PaymentInfoResponse>>>
}

export const DashboardContext = React.createContext<
  DashboardContextProps | undefined
>(undefined);

interface ChildrenProviderProp {
  children: ReactNode;
}

export const DashboardContextProvider: React.FC<ChildrenProviderProp> = ({
  children,
}) => {
  // V1 PRODUCTS
  const [productShop, setProductShop] = useState<Product[] | []>([]);

  // Slader
  const [sliderDate, setSliderDate] = useState<Date>(new Date());

  // 
  const [selectedAction, setActionOption] = useState<selectedOption | "">("")


  // Hash map (clave: FECHA, valor: []slots )
  const [slotByDateMap, setSlotByDateMap] = useState<Map<string, SlotWithStatus[]>>(new Map)
  
  // Fecha donde se encuentra posicionado el calendario 
  const [currentDate, setCurrentDate] = useState(new Date());
    
  // # SELECCION DE BARBERO Y HORARIO
  const [selectedBarber, setSelectedBarber] = useState<BarberInfo>()
  const [selectedSlot, setSelectedSlot] = useState<Slot>()
  
  // # BARBEROS DISPONIBLES
  const [availableBarbers, setAvailableBarbers] = useState<BarberInfo[] | []>([])

  // # Booking seleccionado para ver sus detalles
  const [selectedBooking, setSelectedBooking] = useState<Booking>()

  // # HashMap que almacena la informacion recuperada de cada bookings (key: booking id | value: payment info)
  const [paymentInfoMap, setPaymentInfoMap] = useState<Map<number, PaymentInfoResponse>>(new Map)

  return (
    <DashboardContext.Provider
      value={{
        productShop,
        setProductShop,
        sliderDate,
        setSliderDate,
        selectedAction,
        setActionOption,
        slotByDateMap,
        setSlotByDateMap,
        currentDate,
        setCurrentDate,
        selectedBarber,
        setSelectedBarber,
        selectedSlot,
        setSelectedSlot,
        availableBarbers,
        setAvailableBarbers,
        selectedBooking,
        setSelectedBooking,
        paymentInfoMap,
        setPaymentInfoMap
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
