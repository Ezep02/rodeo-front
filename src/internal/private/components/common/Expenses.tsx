import { Button } from "@/components/common/CustomButtons";
import { AdminContext } from "@/context/AdminContext";
import React, { Suspense, useContext } from "react";
import AddExpenseForm from "./AddExpenseForm";

const ExpensesList = React.lazy(() => import("./ExpensesList"));

const Expenses: React.FC = () => {
  const { OpenExpensesPopUp, openAddExpense, OpenAddExpense } =
    useContext(AdminContext)!;

  return (
    <div
      className="
        xl:col-start-5 xl:col-end-10 xl:row-start-3 xl:row-end-11
        col-start-1 col-end-13 row-start-1 row-end-13
      bg-zinc-100 flex flex-col w-full h-full gap-3
    "
    >
      {openAddExpense ? (
        <>
          <AddExpenseForm />
        </>
      ) : (
        <>
          <header className="flex justify-end">
            <button onClick={OpenExpensesPopUp}>cerrar</button>
          </header>

          <div className="flex flex-col w-full h-full">
            <div className="flex w-full justify-between items-center">
              <h4 className="text-blue-500 font-semibold">historial</h4>

              <div>
                <Button text="Agregar" onClickAction={OpenAddExpense} />
              </div>
            </div>

            <Suspense
              fallback={
                <div
                  className="
                        h-full
                        w-full bg-white p-2 flex justify-center items-center
                    "
                >
                  <p className="loader"></p>
                </div>
              }
            >
              <ExpensesList />
            </Suspense>
          </div>
        </>
      )}
    </div>
  );
};

export default Expenses;
