import React from "react";

import { TbTrash } from "react-icons/tb";
import { Button, CancelButton } from "@/components/common/CustomButtons";
import { Expense } from "../../models/ExpenseModel";

type DeleteExpensePopUpPopUpProps = {
  HandleDelete: (id: number) => void;
  expense: Expense;
  HandleCancel: () => void;
};

const DeleteExpensePopUp: React.FC<DeleteExpensePopUpPopUpProps> = ({
  HandleDelete,
  expense,
  HandleCancel,
}) => {
  return (
    <div className="inset-0 absolute flex items-center justify-center  bg-opacity-70 z-50 ">
      {/* Modal Container */}
      <div className="bg-zinc-100 rounded-lg shadow-lg p-6 w-full max-w-lg text-center space-y-6">
        {/* Title */}
        <h2 className="text-lg font-semibold text-zinc-800">
          Eliminar Servicio
        </h2>

        {/* Message */}
        <p className="text-gray-800">
          ¿Estás seguro de que quieres eliminar{" "}
          <span className="font-bold text-zinc-900">{expense.title}</span> de tu
          lista de servicios? Esta acción no se puede deshacer.
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <div>
            <CancelButton
              icon={<TbTrash />}
              onClickAction={() => HandleDelete(expense.ID)}
              text="Eliminar"
            />
          </div>

          <div>
            <Button onClickAction={HandleCancel} text="Cancelar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteExpensePopUp;