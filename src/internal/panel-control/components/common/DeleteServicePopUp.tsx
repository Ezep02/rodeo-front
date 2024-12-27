import React from "react";
import { Service } from "../../models/Services.models";
import { TbTrash } from "react-icons/tb";

type DeleteServicePopUpProps = {
  HandleDelete: (id: number) => void;
  Srv: Service;
  HandleCancel: () => void;
};

const DeleteServicePopUp: React.FC<DeleteServicePopUpProps> = ({
  HandleDelete,
  Srv,
  HandleCancel,
}) => {
  return (
    <div className="inset-0 absolute flex items-center justify-center bg-opacity-70 z-50 ">
      {/* Modal Container */}
      <div className="bg-zinc-800 rounded-lg shadow-lg p-6 w-full max-w-lg text-center space-y-6">
        {/* Title */}
        <h2 className="text-lg font-semibold text-zinc-100">
          Eliminar Servicio
        </h2>

        {/* Message */}
        <p className="text-gray-300">
          ¿Estás seguro de que quieres eliminar{" "}
          <span className="font-bold text-zinc-50">{Srv.title}</span> de tu
          lista de servicios? Esta acción no se puede deshacer.
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <div>
            <button
              onClick={() => HandleDelete(Srv.ID)}
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-2xl bg-red-600 text-white shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
            >
              <TbTrash />
              Eliminar
            </button>
          </div>

          <div>
            <button
              onClick={HandleCancel}
              className="px-4 py-2 text-gray-300 text-sm font-medium rounded-lg shadow-md hover:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteServicePopUp;
