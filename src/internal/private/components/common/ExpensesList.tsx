import { AdminContext } from "@/context/AdminContext";
import React, { useContext, useEffect, useState } from "react";
import DeleteExpensePopUp from "./DeleteExpensePopUp";
import { Expense } from "../../models/ExpenseModel";
import { DeleteRegisteredExpense } from "../../services/AnalyticService";

const ExpensesList: React.FC = () => {
  const {
    LoadExpensesHistorial,
    expenseList,
    UpdateExpenseHandler,
    setExpenseFormError,
    setExpenseList,
    setTotalExpenses,
    totalExpenses
  } = useContext(AdminContext)!;

  useEffect(() => {
    LoadExpensesHistorial();
  }, []);
  
  const [openExpensesPopUp, setOpenExpensesPopUp] = useState<boolean>();
  const [expenseToDelete, setExpenseToDelete] = useState<Expense>();
  
  
  const DeleteExpenseRegister = async (id: number) => {
    try {
      let res = await DeleteRegisteredExpense(id);

      if (res.status === 200) {
        
        
        if(expenseToDelete?.CreatedAt){
          let deleteDate = new Date(expenseToDelete?.CreatedAt).toLocaleDateString("es-ES", {
            month: "long"
          })

          setTotalExpenses(()=> {
  
            let expensesAmount = [...totalExpenses]
            // actualizar el saldo
            let expenseIndx = expensesAmount.findIndex((e) => new Date(e.month_start_date).toLocaleDateString("es-ES", {month: "long"}) === deleteDate)

            if (expenseIndx !== -1) {
              let currentExpense = Number(expensesAmount[expenseIndx].total_expense);
              let deleteAmount = Number(expenseToDelete.amount);
              
              // restar saldo
              expensesAmount[expenseIndx].total_expense = currentExpense - deleteAmount;
            }
            return expensesAmount
          })
        }
        HandleOpenDeletePopUp();

        setExpenseList(() => {
          let notUpdatedExpense = [...expenseList].filter((e) => e.ID !== id);
          return notUpdatedExpense;
        });
      }
    } catch (error: any) {
      setExpenseFormError([
        error?.response?.data ||
          "Algo salio mal intentando eliminar el registro",
      ]);
    }
  };

  const HandleOpenDeletePopUp = () => {
    setOpenExpensesPopUp((prev) => !prev);
  };


  const SelectExpenseToDelete = (exp: Expense) => {
    setExpenseToDelete(exp);
  };

  return (
    <>
      {expenseList.length > 0 ? (
        <ul className="flex flex-col gap-2 overflow-y-scroll scroll-abrir-tarjeta h-full p-1">
          <>
            {openExpensesPopUp && (
              <DeleteExpensePopUp
                HandleCancel={HandleOpenDeletePopUp}
                HandleDelete={DeleteExpenseRegister}
                expense={expenseToDelete!}
              />
            )}
          </>

          <>
            {expenseList.map((exp) => (
              <li
                key={exp.ID}
                className="w-full border shadow-md rounded-lg p-2 flex flex-col gap-2 bg-white hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between w-full">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {exp.title}
                  </h2>

                  <span className="text-base font-bold text-rose-500">
                    ${exp.amount}
                  </span>
                </div>
                <p>{exp.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(exp.CreatedAt).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>

                  <div className="flex gap-2">
                    <button
                      className="text-gray-600"
                      onClick={() => UpdateExpenseHandler(exp)}
                    >
                      editar
                    </button>
                    <button
                      className="text-gray-600"
                      onClick={() => {
                        HandleOpenDeletePopUp();
                        SelectExpenseToDelete(exp);
                      }}
                    >
                      eliminar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </>

          <button
            className="hover:text-zinc-800 rounded-full active:text-zinc-800 p-2 active:scale-90 text-gray-600"
            onClick={LoadExpensesHistorial}
          >
            ver mas
          </button>
        </ul>
      ) : (
        <p>Historial vacio</p>
      )}
    </>
  );
};

export default ExpensesList;
