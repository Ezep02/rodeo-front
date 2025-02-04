import { AdminContext } from "@/context/AdminContext";
import React, { Suspense, useContext } from "react";
import AddExpenseForm from "./AddExpenseForm";
import { IoClose } from "react-icons/io5";
import UpdateExpenseForm from "./UpdateExpenseForm";

const ExpensesList = React.lazy(() => import("./ExpensesList"));

const Expenses: React.FC = () => {
  const { OpenExpensesPopUp, openAddExpense, OpenAddExpense, openUpdateForm } =
    useContext(AdminContext)!;

  return (
    <div
      className="
        xl:col-start-4 xl:col-end-10 xl:row-start-3 xl:row-end-11
        col-start-1 col-end-13 row-start-1 row-end-13
      bg-zinc-100 flex flex-col w-full h-full gap-3
    "
    >
      {openAddExpense ? (
        <AddExpenseForm />
      ) : openUpdateForm ? (
        <UpdateExpenseForm />
      ) : (
        <>
          <header className="flex justify-end">
            <button
              className="hover:text-zinc-800 hover:shadow-sm rounded-full active:text-zinc-800 p-2 active:scale-90 text-gray-600"
              type="button"
              onClick={OpenExpensesPopUp}
            >
              <IoClose size={24} />
            </button>
          </header>

          <div className="flex flex-col w-full h-full p-2 gap-2 overflow-hidden">
            <div className="flex w-full justify-between items-center">
              <h4 className="text-rose-500 font-semibold">historial</h4>

              <div>
                <button
                  className=" hover:text-zinc-800 hover:shadow-sm rounded-full active:text-zinc-800  active:scale-90 text-gray-600"
                  type="button"
                  onClick={OpenAddExpense}
                >
                  Agregar
                </button>
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
