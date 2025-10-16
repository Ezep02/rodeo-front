import React from "react";
import { Service } from "../../../types/ServiceTypes";
import PromotionDialog from "./dialog/PromotionDialog";
import { Button } from "@/components/ui/button";
import { Edit2, Loader2, Plus } from "lucide-react";
import usePromo from "../hooks/usePromo";
import PromotionItem from "./common/PromotionItem";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import usePromoAction from "../hooks/usePromoAction";

type Props = {
  itemInfo: Service;
};

const PromotionList: React.FC<Props> = ({ itemInfo }) => {
  const { isPromoLoading, promotionList } = usePromo(itemInfo.id);
  

  const {
    onDeletePromotion
  } = usePromoAction()

  return (
    <div className="bg-gray-100 p-5 rounded-4xl">
      <div className="flex justify-between items-center">
        <div className="p-2">
          <span className="text-gray-800 font-medium">Promociones</span>
          <p className="text-gray-600">Todas las promociones</p>
        </div>

        <PromotionDialog
          service_id={itemInfo.id}
          trigger={
            <Button
              className="rounded-full cursor-pointer active:scale-95"
              size={"icon"}
            >
              <Plus />
            </Button>
          }
        />
      </div>

      {/* LISTADO */}
      <div className="mt-2">
        {isPromoLoading ? (
          <div className="p-2 flex justify-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <>
            {Array.isArray(promotionList) && promotionList.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {promotionList.map((item, i) => (
                  <PromotionItem
                    item={item}
                    key={i}
                    actions={
                      <div className="flex gap-1.5">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              className="rounded-full cursor-pointer active:scale-95"
                              variant="ghost"
                            >
                              Eliminar
                            </Button>
                          </AlertDialogTrigger>

                          <AlertDialogContent className="rounded-4xl">
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Eliminar promoción
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Una vez que elimines esta promoción, no podrás
                                recuperarla. ¿Estás seguro de que deseas
                                continuar?
                              </AlertDialogDescription>
                            </AlertDialogHeader>

                            {/* footer */}
                            <AlertDialogFooter>
                              <AlertDialogCancel className="rounded-full cursor-pointer active:scale-95">
                                Cancelar
                              </AlertDialogCancel>
                              <AlertDialogAction 
                                className="rounded-full cursor-pointer active:scale-95"
                                onClick={()=> onDeletePromotion(item.id)}
                              >
                                Sí, eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <PromotionDialog
                          service_id={itemInfo.id}
                          promotion={item}
                          trigger={
                            <Button className="rounded-full cursor-pointer active:scale-95">
                              <Edit2 /> Editar
                            </Button>
                          }
                        />
                      </div>
                    }
                  />
                ))}
              </ul>
            ) : (
             <div className="flex justify-center items-center">
               <span>Sin promociones</span>
             </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PromotionList;
