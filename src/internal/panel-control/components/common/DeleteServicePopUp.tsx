import React from "react";
import { Service } from "../../models/ServicesModels";
import { TbTrash } from "react-icons/tb";
import { Button, CancelButton } from "@/components/common/CustomButtons";

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
      <div className="bg-zinc-100 rounded-lg shadow-lg p-6 w-full max-w-lg text-center space-y-6">

        <h2 className="text-lg font-semibold text-zinc-800">
          Eliminar Servicio
        </h2>


        <p className="text-gray-800">
          ¿Estás seguro de que quieres eliminar{" "}
          <span className="font-bold text-zinc-900">{Srv.title}</span> de tu
          lista de servicios? Esta acción no se puede deshacer.
        </p>

        <div className="flex justify-center gap-4">
          <div>
            <CancelButton
              icon={<TbTrash />}
              onClickAction={() => HandleDelete(Srv.ID)}
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

export default DeleteServicePopUp;
