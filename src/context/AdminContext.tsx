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
  UpdateRegisteredExpense,
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

  totalExpenses: ExpenseChart[];
  setTotalExpenses: React.Dispatch<React.SetStateAction<ExpenseChart[]>>;
  GetTotalExpenses: () => void;

  openUpdateForm: boolean;
  setOpenUpdateForm: React.Dispatch<React.SetStateAction<boolean>>;
  OpenUpdateFormHandler: () => void;

  selectedExpenseToEdit: Expense | undefined;
  setSelectedExpenseToEdit: React.Dispatch<
    React.SetStateAction<Expense | undefined>
  >;
  UpdateExpenseHandler: (expense: Expense) => void;

  // actualizar un gasto registrado
  updateExpenseIsLoading: boolean;
  setUpdateExpenseIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  updateExpenseFormError: string[];
  setUpdateExpenseFormError: React.Dispatch<
    React.SetStateAction<string[] | []>
  >;
  UpdateExpense: (expense: ExpenseRequest) => void;
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

  // obtener el numero de gastos en el año
  const [totalExpenses, setTotalExpenses] = useState<ExpenseChart[]>([]);

  // Agregar gasto al listado

  const [addExpenseIsLoading, setAddExpenseIsLoading] = useState<boolean>(false);

  const [expenseList, setExpenseList] = useState<Expense[]>([]);

  const [expenseFormError, setExpenseFormError] = useState<string[]>([]);
  const RegisterExpense = async (data: ExpenseRequest) => {
    setAddExpenseIsLoading(true);
    try {
      let newExpense: Expense = await RegisterNewExpense(data);
  
      if (newExpense) {
        // Agregar nuevo gasto a la lista de gastos
        setExpenseList((prev) => [...prev, newExpense]);
  
        let newExpenseDate = new Date(newExpense.CreatedAt).toLocaleDateString(
          "es-ES",
          { month: "long" }
        );
  
        setTotalExpenses((prev) => {
          // Asegurarse de que `prev` siempre sea un arreglo
          let expensesAmount = Array.isArray(prev) ? [...prev] : [];
  
          // Buscar el índice del mes correspondiente
          let expenseIndx = expensesAmount.findIndex(
            (e) =>
              new Date(e.month_start_date).toLocaleDateString("es-ES", {
                month: "long",
              }) === newExpenseDate
          );
  
          if (expenseIndx !== -1) {
            // Si ya existe el mes, actualizar el total
            let currentExpense = Number(expensesAmount[expenseIndx].total_expense);
            let newAmount = Number(newExpense.amount);
  
            expensesAmount[expenseIndx].total_expense = currentExpense + newAmount;
          } else {
            // Si no existe el mes, agregar un nuevo registro
            expensesAmount.push({
              month_start_date: newExpense.CreatedAt,
              total_expense: newExpense.amount,
            });
          }
  
          return expensesAmount;
        });
      }
  
      OpenAddExpense();
    } catch (error: any) {
      console.error(error);
      setExpenseFormError([
        error?.response?.data || "Algo salió mal intentando crear el registro",
      ]);
    }
    setAddExpenseIsLoading(false);
  };
  
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

  // actualizar un gasto registrado
  const [openUpdateForm, setOpenUpdateForm] = useState<boolean>(false);

  const OpenUpdateFormHandler = () => {
    setOpenUpdateForm(!openUpdateForm);
  };

  const [selectedExpenseToEdit, setSelectedExpenseToEdit] = useState<Expense>();

  const UpdateExpenseHandler = (expense: Expense) => {
    setSelectedExpenseToEdit(expense);
    OpenUpdateFormHandler();
  };

  // Agregar gasto al listado
  const [updateExpenseIsLoading, setUpdateExpenseIsLoading] =
    useState<boolean>(false);

  const [updateExpenseFormError, setUpdateExpenseFormError] = useState<
    string[]
  >([]);

  const UpdateExpense = async (data: ExpenseRequest) => {
    setUpdateExpenseIsLoading(true);

    const { amount, title, description } = data;

    if (selectedExpenseToEdit) {
      let exp: Expense = {
        amount: amount,
        ID: selectedExpenseToEdit.ID,
        Created_by_name: selectedExpenseToEdit.Created_by_name,
        CreatedAt: selectedExpenseToEdit.CreatedAt,
        title: title,
        UpdatedAt: selectedExpenseToEdit.UpdatedAt,
        description: description,
      };
      try {
        let updatedExpense: Expense = await UpdateRegisteredExpense(exp);

        if (updatedExpense) {
          // Actualizar totales por mes
          const updateMonthlyTotals = (prev: ExpenseChart[]) => {
            let expensesAmount = [...prev];

            // Fecha del nuevo gasto
            let newExpenseDate = new Date(updatedExpense.CreatedAt
            ).toLocaleDateString("es-ES", { month: "long" });

            // Buscar el indice del mes correspondiente
            let expenseIndx = expensesAmount.findIndex(
              (e) =>
                new Date(e.month_start_date).toLocaleDateString("es-ES", {
                  month: "long",
                }) === newExpenseDate
            );

            if (expenseIndx !== -1) {
              let previousAmount = Number(selectedExpenseToEdit.amount);
              let newAmount = Number(updatedExpense.amount);

              // Calcular la diferencia
              let difference = newAmount - previousAmount;

              // Actualizar el total
              expensesAmount[expenseIndx].total_expense += difference;
            }

            return expensesAmount;
          };

          // Actualizar la lista de gastos
          const updateExpenseList = () => {
            let notUpdatedExpense = [...expenseList];

            let capturedIndex = notUpdatedExpense.findIndex(
              (e) => e.ID === exp.ID
            );

            if (capturedIndex !== -1) {
              notUpdatedExpense[capturedIndex] = updatedExpense;
            }

            return notUpdatedExpense;
          };

          // Aplica las actualizaciones
          setTotalExpenses(updateMonthlyTotals);
          setExpenseList(updateExpenseList);

          OpenUpdateFormHandler();
        }
      } catch (error: any) {
        setUpdateExpenseFormError([
          error?.response?.data ||
            "Algo salió mal intentando actualizar el registro",
        ]);
      }
    }

    setUpdateExpenseIsLoading(false);
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
        openUpdateForm,
        setOpenUpdateForm,
        OpenUpdateFormHandler,
        selectedExpenseToEdit,
        setSelectedExpenseToEdit,
        UpdateExpenseHandler,
        updateExpenseIsLoading,
        setUpdateExpenseIsLoading,
        updateExpenseFormError,
        setUpdateExpenseFormError,
        UpdateExpense,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
