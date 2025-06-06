import React from "react";
import { Service } from "../../models/ServicesModels";
import { TbTrash } from "react-icons/tb";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type DeleteServicePopUpProps = {
  HandleDelete: (id: number) => void;
  Srv: Service;
  HandleCancel: () => void;
  deleteServiceTransitionErr: void | null
  isDeleteTransitionServiceLoading: boolean
};

const DeleteServicePopUp: React.FC<DeleteServicePopUpProps> = ({
  HandleDelete,
  Srv,
  HandleCancel,
  deleteServiceTransitionErr,
  isDeleteTransitionServiceLoading
}) => {

  return (
    <Dialog open={true} onOpenChange={HandleCancel}>
      <DialogContent className="sm:max-w-[425px] max-w-[350px] rounded-md">
        {
          isDeleteTransitionServiceLoading ? (
            <>
              <div className="w-full flex justify-center items-center flex-col gap-1 p-5">
                <p className="loader"></p>
                <span>Procesando eliminacion</span>
              </div>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Estas a un paso de eliminar el servicio</DialogTitle>
                <DialogDescription className="text-left">
                  ¿Estás seguro de que quieres eliminar{" "}
                  <span className="font-bold text-rose-500">{Srv.title}</span> de tu
                  lista de servicios? Esta acción no se puede deshacer.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                
                <div className="flex flex-col w-full gap-2">
                  <Button
                    onClick={() => HandleDelete(Srv.ID)}
                  >
                    <TbTrash />
                    Eliminar
                  </Button>

                  <Button
                    variant="outline"
                    onClick={HandleCancel}
                  >

                    Cancelar
                  </Button>
                </div>
                

              </DialogFooter>
            </>
          )
        }
      </DialogContent>
    </Dialog>
  );
}

export default DeleteServicePopUp;

