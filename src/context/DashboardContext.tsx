import React, { ReactNode, useState } from "react";

import { Appointment } from "@/internal/Appointment/models/Appointment";
import { Product } from "@/internal/reservation/model/Product";
import { Post } from "@/internal/panel-control/models/Post";

interface DashboardContextProps {
  // V1
  // PRODUCTS
  productShop: Product[] | [];
  setProductShop: React.Dispatch<React.SetStateAction<Product[] | []>>;
  // APPOINTMENTS
  customerAppointment: Appointment[];
  setCustomerAppointment: React.Dispatch<
    React.SetStateAction<Appointment[] | []>
  >;

  sliderDate: Date;
  setSliderDate: React.Dispatch<React.SetStateAction<Date>>;

  // Posts
  post: Post[] | [];
  setPost: React.Dispatch<React.SetStateAction<Post[] | []>>;
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

  // V1 APPOINTMENTS
  const [customerAppointment, setCustomerAppointment] = useState<Appointment[]>(
    []
  );

  // Slader
  const [sliderDate, setSliderDate] = useState<Date>(new Date());

  // POSTS
  const [post, setPost] = useState<Post[] | []>([]);

  return (
    <DashboardContext.Provider
      value={{
        productShop,
        setProductShop,
        customerAppointment,
        setCustomerAppointment,
        sliderDate,
        setSliderDate,
        setPost,
        post,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
