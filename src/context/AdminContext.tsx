import { Revenue, ExpenseChart } from "@/internal/private/models/ChartModel";
import {
  Expense,
  ExpenseRequest,
} from "@/internal/private/models/ExpenseModel";
import {
  GetExpensesHistorial,
  GetRecivedClients,
  GetRegisteredUsersCount,
  GetRevenue,
  GetTotalExpenseCount,
  RegisterNewExpense,
} from "@/internal/private/services/AnalyticService";
import React, { useState } from "react";

type AdminContextProps = {
  GetTotalRevenue: () => void;
  totalRevenue: Revenue[] | [];
  setTotalRevenue: React.Dispatch<React.SetStateAction<Revenue[] | []>>;

  GetRegisteredUsers: () => void;
  totalUsers: number;
  setTotalUsers: React.Dispatch<React.SetStateAction<number>>;

  GetRecivedTotalClients: () => void;
  recivedTotalClient: number;
  setRecivedTotalClient: React.Dispatch<React.SetStateAction<number>>;

  OpenExpensesPopUp: () => void;
  openExpensesPopUp: boolean;
  setOpenExepensesPopUp: React.Dispatch<React.SetStateAction<boolean>>;

  OpenAddExpense: () => void;
  openAddExpense: boolean;
  setOpenAddExpense: React.Dispatch<React.SetStateAction<boolean>>;
  addExpenseIsLoading: boolean;
  setAddExpenseIsLoading: React.Dispatch<React.SetStateAction<boolean>>;

  RegisterExpense: (data: ExpenseRequest) => void;

  expenseList: Expense[];
  setExpenseList: React.Dispatch<React.SetStateAction<Expense[] | []>>;
  LoadExpensesHistorial: () => void;

  expenseFormError: string[];
  setExpenseFormError: React.Dispatch<React.SetStateAction<string[] | []>>;

  totalExpenses: ExpenseChart[] | [];
  setTotalExpenses: React.Dispatch<React.SetStateAction<ExpenseChart[] | []>>;
  GetTotalExpenses: () => void;
};

export const AdminContext = React.createContext<AdminContextProps | undefined>(
  undefined
);

type AdminContextProviderProps = {
  children: React.ReactNode;
};

export const AdminContextProvider: React.FC<AdminContextProviderProps> = ({
  children,
}) => {
  const [totalRevenue, setTotalRevenue] = useState<Revenue[]>([]);

  // get revenues
  const GetTotalRevenue = async () => {
    try {
      let revenue = await GetRevenue();
      console.log("revenue", revenue)
      setTotalRevenue(revenue);
    } catch (error) {
      console.log("revenue", error);
    }
  };

  // obtener los usuarios totales
  const [totalUsers, setTotalUsers] = useState<number>(0);

  const GetRegisteredUsers = async () => {
    try {
      let users = await GetRegisteredUsersCount();
      setTotalUsers(users);
    } catch (error) {
      console.log("revenue", error);
    }
  };

  // obtener los clientes atendidos
  const [recivedTotalClient, setRecivedTotalClient] = useState<number>(0);

  const GetRecivedTotalClients = async () => {
    try {
      let users = await GetRecivedClients();
      setRecivedTotalClient(users);
    } catch (error) {
      console.log("revenue", error);
    }
  };

  const [openExpensesPopUp, setOpenExepensesPopUp] = useState<boolean>(false);
  // controlador para abrir el pop up de gastos
  const OpenExpensesPopUp = () => {
    setOpenExepensesPopUp((prev) => !prev);
  };

  const [openAddExpense, setOpenAddExpense] = useState<boolean>(false);

  const OpenAddExpense = () => {
    setOpenAddExpense((prev) => !prev);
  };

  // Agregar gasto al listado
  const [addExpenseIsLoading, setAddExpenseIsLoading] =
    useState<boolean>(false);

  const [expenseList, setExpenseList] = useState<Expense[]>([]);

  const [expenseFormError, setExpenseFormError] = useState<string[]>([]);
  const RegisterExpense = async (data: ExpenseRequest) => {
    setAddExpenseIsLoading(true);
    try {
      let newExpense: Expense = await RegisterNewExpense(data);
      if (newExpense) {
        setExpenseList((prev) => [...prev, newExpense]);
      }

      OpenAddExpense();
    } catch (error: any) {
      setExpenseFormError([
        error?.response?.data || "Algo salio mal intentando crear el registro",
      ]);
    }
    setAddExpenseIsLoading(false);
  };

  // obtener el numero de gastos en el año
  const [totalExpenses, setTotalExpenses] = useState<ExpenseChart[]>([]);

  const GetTotalExpenses = async () => {
    try {
      let exp = await GetTotalExpenseCount();
    
      setTotalExpenses(exp);
    } catch (error) {
      console.log("revenue", error);
    }
  };

  const [expensesOffset, setExpensesOffset] = useState<number>(0);
  const LoadExpensesHistorial = async () => {
    const limit = 5;
    // Obtener nuevos datos desde la API
    const response = await GetExpensesHistorial(limit, expensesOffset);

    if (response.length > 0) {
      setExpenseList((prev) => {
        const filtered = response.filter(
          (exp) =>
            !prev.some((existingService) => existingService.ID === exp.ID)
        );

        return [...prev, ...filtered];
      });

      setExpensesOffset(expensesOffset + 5);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        GetTotalRevenue,
        totalRevenue,
        setTotalRevenue,
        GetRegisteredUsers,
        totalUsers,
        setTotalUsers,
        GetRecivedTotalClients,
        recivedTotalClient,
        setRecivedTotalClient,
        OpenExpensesPopUp,
        openExpensesPopUp,
        setOpenExepensesPopUp,
        openAddExpense,
        setOpenAddExpense,
        OpenAddExpense,
        addExpenseIsLoading,
        setAddExpenseIsLoading,
        RegisterExpense,
        expenseList,
        setExpenseList,
        LoadExpensesHistorial,
        expenseFormError,
        setExpenseFormError,
        totalExpenses,
        setTotalExpenses,
        GetTotalExpenses,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
