import React, { startTransition, useActionState, useContext, useState } from "react";
import { Product } from "../../models/ServicesModels";
import { TbTrash } from "react-icons/tb";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DeleteProduct } from "../../services/product_service";
import { PanelControlContext } from "@/context/PanelControlContext";
import { Trash2 } from "lucide-react";

type DeleteProps = {
  Prod: Product;
};

const DeleteServicePopUp: React.FC<DeleteProps> = ({
  Prod,
}) => {

  const {
    setProductList,
    productList
  } = useContext(PanelControlContext)!

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const HandleDeleteOpen = () => {
    setIsOpen((prev) => !prev)
  }


  // Elimina un servicio seleccionado mediante su ID, ocurre cuando se confirma en el Pop Up
  const [_, deleteProductAction, isDeleteTransitionLoading] = useActionState(
    async (_: void | null, id: number) => {

      try {
        const res = await DeleteProduct(id);
        if (res) {
          let filteredList = [...productList].filter((srv) => srv.id !== id);
          setProductList(filteredList);

          HandleDeleteOpen();
        }
      } catch (error) {
        console.warn("Error eliminando servicio")
      }
    },
    null
  )

  // Inicia la transicion a la hora de eliminar un servicio
  const StartDeleteTransition = (service_to_delete: number) => {
    startTransition(() => {
      deleteProductAction(service_to_delete)
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={HandleDeleteOpen}>
     
      <DialogTrigger asChild>
        <Button
          onClick={()=>HandleDeleteOpen}
          variant="ghost" size="icon"
          className="text-gray-400 hover:text-white hover:bg-gray-700"

        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] max-w-[350px] rounded-md">
        {
          isDeleteTransitionLoading ? (
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
                  <span className="font-bold text-rose-500">{Prod.name}</span> de tu
                  lista de servicios? Esta acción no se puede deshacer.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>

                <div className="flex flex-col w-full gap-2">
                  <Button
                    onClick={() => StartDeleteTransition(Prod.id)}
                  >
                    <TbTrash />
                    Eliminar
                  </Button>

                  <Button
                    variant="outline"
                    onClick={HandleDeleteOpen}
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

