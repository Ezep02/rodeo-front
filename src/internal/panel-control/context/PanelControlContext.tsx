import React, { ReactNode, useState } from "react";

import { Booking } from "@/models/Appointment";

interface PanelControlContextProps {

  // Proximas citas
  inboxAppointment: Booking[] | [];
  setInboxAppointments: React.Dispatch<React.SetStateAction<Booking[]>>;
}

export const PanelControlContext = React.createContext<PanelControlContextProps | undefined>(undefined);

interface ChildrenProviderProp {
  children: ReactNode;
}

export const PanelControlContextProvider: React.FC<ChildrenProviderProp> = ({
  children,
}) => {

  // # Citas pendientes de aceptacion
  const [inboxAppointment, setInboxAppointments] = useState<Booking[]>([]);


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
