import { AdminContext } from "@/context/AdminContext";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ExpenseFormData, ExpenseSchema } from "../../types/ExpensesTypes";
import { ExpenseFormField } from "./ExpenseFormField";
import { Button } from "@/components/common/CustomButtons";
import { IoClose } from "react-icons/io5";
import ShowErrorPopUp from "@/components/common/ShowErrorPopUp";

const UpdateExpenseForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(ExpenseSchema),
  });

  const {
    OpenUpdateFormHandler,
    selectedExpenseToEdit,
    UpdateExpense,
    updateExpenseIsLoading,
    updateExpenseFormError,
    setUpdateExpenseFormError
  } = useContext(AdminContext)!;

  useEffect(() => {
    if (updateExpenseFormError.length > 0) {
      const timer = setTimeout(() => {
        setUpdateExpenseFormError([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [updateExpenseFormError]);

  const onSubmit = (data: ExpenseFormData) => {
    UpdateExpense(data);
  };

  return (
    <>
      {updateExpenseIsLoading ? (
        <div className="flex h-full w-full justify-center items-center bg-zinc-100 rounded-xl">
          <p className="loader"></p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-xl flex flex-col p-8 w-full h-full min-h-full shadow-lg flex-1 gap-4"
        >
          {updateExpenseFormError.length > 0 && (
            <ShowErrorPopUp errorMessage={updateExpenseFormError[0]} />
          )}

          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-rose-500">
              Actualizar Gasto
            </h1>

            <span>
              <button
                className=" hover:text-zinc-800 hover:shadow-sm rounded-full active:text-zinc-800  active:scale-90 text-gray-600"
                type="button"
                onClick={OpenUpdateFormHandler}
              >
                <IoClose size={24} />
              </button>
            </span>
          </div>
          <div className="flex justify-between gap-2">
            <div className="flex flex-col gap-1 w-full">
              <label
                htmlFor="Titulo"
                className="text-pretty font-semibold text-gray-700"
              >
                Titulo
              </label>
              <ExpenseFormField
                type="title"
                placeholder="Ingrese titulo"
                name="title"
                register={register}
                error={errors.title}
                defaultValue={selectedExpenseToEdit?.title}
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label
                htmlFor="password"
                className="text-pretty font-semibold text-gray-700"
              >
                Monto
              </label>
              <ExpenseFormField
                type="text"
                placeholder="Registrar monto"
                name="amount"
                valueAsNumber={true}
                register={register}
                error={errors.amount}
                defaultValue={selectedExpenseToEdit?.amount}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-pretty font-semibold text-gray-700"
            >
              Descripcion
            </label>
            <textarea
              className="bg-zinc-200 rounded-md border-1 resize-none outline-gray-300 p-2"
              placeholder="Crea una descripcion"
              {...register("description")}
              rows={5}
              defaultValue={selectedExpenseToEdit?.description}
            />
            {errors.description && (
              <span className="text-rose-500 text-pretty">
                {errors.description.message}
              </span>
            )}
          </div>
          <div className="flex justify-end">
            <Button text="Guardar cambios" />
          </div>
        </form>
      )}
    </>
  );
};

export default UpdateExpenseForm;
