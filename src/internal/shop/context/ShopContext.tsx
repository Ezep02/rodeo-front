import React, { useState } from "react";

import { PaymentOption } from "../types/Preference";
import { Service } from "@/types/ServiceTypes";
import { Payment } from "../../../types/Payment";

interface ShopContextProps {
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
        selectedPaymentMethod,
        setPaymentMethod,
        serviceInfo,
        setServiceInfo,
        transactionErr,
        setTransactionErr,
        prefWithAliasPayment,
        setPrefWithAliasPayment,
      }}    
    >
      {children}
    </ShopContext.Provider>
  );
};
