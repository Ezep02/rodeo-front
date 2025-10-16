import { useActionState, useContext, useState } from "react";
import {
  createPromotion,
  deletePromotion,
  updatePromotion,
} from "../services/promotions";
import { Promotion } from "../../../types/Promotions";
import { CatalogContext } from "@/context/CatalogContext";


const usePromoAction = () => {
  const { setPromotionList } = useContext(CatalogContext)!;

  const [isFormOpen, setFormOpen] = useState<boolean>(false);
  const toggleFormStatus = () => {
    setFormOpen((prev) => !prev);
  };

  const [createPromoErr, onCreatePromoAction, isCreatePromoPending] =
    useActionState(
      async (
        _: string | null,
        data: { promo: Promotion; service_id: number }
      ) => {
        try {
          const res = await createPromotion(data.service_id, data.promo);
          if (res) {
            setPromotionList((prev) => [...prev, res]);
            toggleFormStatus();
          }
          return res ? null : "No se pudo crear la promo";
        } catch (error: any) {
          return (
            error?.response?.data?.error ||
            error.message ||
            "Error creando promoción"
          );
        }
      },
      null
    );

  const [updatePromoErr, onUpdatePromoAction, isUpdatePromoPending] =
    useActionState(async (_: string | null, data: Promotion) => {
      try {
        if (!data.id) return "Id de la promocion no existe";
        const res = await updatePromotion(data, data.id);

        if (res) {
          setPromotionList((prev) =>
            prev.map((curr) => (curr.id === data.id ? res : curr))
          );
          toggleFormStatus();
        }

        return res ? null : "No se pudo crear la promo";
      } catch (error: any) {
        return (
          error?.response?.data?.error ||
          error.message ||
          "Error actualizando promoción"
        );
      }
    }, null);

  const onDeletePromotion = async (id: number) => {

    if (!id) return;

    let deleteResponse = await deletePromotion(id);
    if (deleteResponse) {
      setPromotionList((prev) =>
        prev.filter((curr) => (curr.id !== id))
      );
    }
  };

  return {
    // crear
    createPromoErr,
    onCreatePromoAction,
    isCreatePromoPending,
    // update
    updatePromoErr,
    onUpdatePromoAction,
    isUpdatePromoPending,
    // delete
    onDeletePromotion,
    // formulario
    isFormOpen,
    toggleFormStatus,
  };
};

export default usePromoAction;
