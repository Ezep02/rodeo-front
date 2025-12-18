import React, { ReactNode, useState } from "react";

import { BookingWithPayment } from "@/models/Appointment";

interface PanelControlContextProps {

  // Proximas citas
  inboxAppointment: BookingWithPayment[] | [];
  setInboxAppointments: React.Dispatch<React.SetStateAction<BookingWithPayment[]>>;
}

export const PanelControlContext = React.createContext<PanelControlContextProps | undefined>(undefined);

interface ChildrenProviderProp {
  children: ReactNode;
}

export const PanelControlContextProvider: React.FC<ChildrenProviderProp> = ({
  children,
}) => {

  // # Citas pendientes de aceptacion
  const [inboxAppointment, setInboxAppointments] = useState<BookingWithPayment[]>([]);


  return (
    <PanelControlContext.Provider
      value={{
        inboxAppointment,
        setInboxAppointments
      }}
    >
      {children}
    </PanelControlContext.Provider>
  );
};
