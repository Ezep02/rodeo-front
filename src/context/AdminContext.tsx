import { CurrentYearMonthlyRevenue, FrequentCustomer, MonthlyAppointmens, MonthlyNewCustomers, MonthlyPopularServices, MonthlyRevenue } from "@/internal/analytics/models/analyticsModels";
import React, { useState } from "react";

type AdminContextProps = {
  monthlyRevenue: MonthlyRevenue | undefined;
  setMonthlyRevenue: React.Dispatch<React.SetStateAction<MonthlyRevenue | undefined>>
  monthlyAppointmens: MonthlyAppointmens | undefined;
  setMonthlyAppointmens: React.Dispatch<React.SetStateAction<MonthlyAppointmens | undefined>>
  monthlyNewCustomers: MonthlyNewCustomers | undefined
  setMonthlyNewCustomers: React.Dispatch<React.SetStateAction<MonthlyNewCustomers | undefined>>
  currentYearMonthlyRevenue: CurrentYearMonthlyRevenue[] | []
  setCurrentYearMonthlyRevenue: React.Dispatch<React.SetStateAction<CurrentYearMonthlyRevenue[] | []>>
  monthlyPopularServices: MonthlyPopularServices[] | []
  setMonthlyPopularServices: React.Dispatch<React.SetStateAction<MonthlyPopularServices[] | []>>
  frequentCustomersList: FrequentCustomer[] | []
  setFrequentCustomersList: React.Dispatch<React.SetStateAction<FrequentCustomer[] | []>>
};

export const AdminContext = React.createContext<AdminContextProps | undefined>(undefined);

type AdminContextProviderProps = { children: React.ReactNode };

export const AdminContextProvider: React.FC<AdminContextProviderProps> = ({ children }) => {

  // estados de estadisticas de resumen y promedios
  const [monthlyRevenue, setMonthlyRevenue] = useState<MonthlyRevenue>()
  const [monthlyAppointmens, setMonthlyAppointmens] = useState<MonthlyAppointmens>()
  const [monthlyNewCustomers, setMonthlyNewCustomers] = useState<MonthlyNewCustomers>()
  const [currentYearMonthlyRevenue, setCurrentYearMonthlyRevenue ] = useState<CurrentYearMonthlyRevenue[]>([])
  const [monthlyPopularServices, setMonthlyPopularServices] = useState<MonthlyPopularServices[]>([])
  const [frequentCustomersList, setFrequentCustomersList] = useState<FrequentCustomer[]>([])

  return (
    <AdminContext.Provider
      value={{
        monthlyRevenue,
        setMonthlyRevenue,
        monthlyAppointmens,
        setMonthlyAppointmens,
        monthlyNewCustomers,
        setMonthlyNewCustomers,
        currentYearMonthlyRevenue,
        setCurrentYearMonthlyRevenue,
        monthlyPopularServices,
        setMonthlyPopularServices,
        frequentCustomersList,
        setFrequentCustomersList
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
