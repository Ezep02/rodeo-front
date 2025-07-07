import React, { ReactNode, useState } from "react";
import { Product } from "@/internal/reservation/services/shop_service";
import { Appointment } from "@/internal/Appointment/models/Appointment";

interface DashboardContextProps {
  // V1 
  // PRODUCTS
  productShop: Product[] | []
  setProductShop: React.Dispatch<React.SetStateAction<Product[] | []>>
  // APPOINTMENTS
  customerAppointment: Appointment[]
  setCustomerAppointment: React.Dispatch<React.SetStateAction<Appointment[] | []>>

}

export const DashboardContext = React.createContext<DashboardContextProps | undefined>(undefined);

interface ChildrenProviderProp {
  children: ReactNode;
}

export const DashboardContextProvider: React.FC<ChildrenProviderProp> = ({
  children,
}) => {

  // V1 PRODUCTS
  const [productShop, setProductShop] = useState<Product[] | []>([])

  // V1 APPOINTMENTS
  const [customerAppointment, setCustomerAppointment] = useState<Appointment[]>([])

  return (
    <DashboardContext.Provider
      value={{
        productShop,
        setProductShop,
        customerAppointment,
        setCustomerAppointment
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
