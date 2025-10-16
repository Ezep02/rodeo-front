import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import React from "react";
import { useServiceAction } from "../../hooks/useServiceAction";
import { FiTrash } from "react-icons/fi";

type Props = {
    itemId: number
}

const DeleteServiceDialog:React.FC<Props> = ({itemId}) => {
  
   const {
    onDeleteService
   } = useServiceAction()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="rounded-full cursor-pointer active:scale-95"
          variant="default"
        >
          <FiTrash/> Eliminar servicio
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="rounded-4xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Eliminar promoción</AlertDialogTitle>
          <AlertDialogDescription>
            Una vez que elimines esta promoción, no podrás recuperarla. ¿Estás
            seguro de que deseas continuar?
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* footer */}
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-full cursor-pointer active:scale-95">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="rounded-full cursor-pointer active:scale-95"
            onClick={() => onDeleteService(itemId)}
          >
            Sí, eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteServiceDialog;
