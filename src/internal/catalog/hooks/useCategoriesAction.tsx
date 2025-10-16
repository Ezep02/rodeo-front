import { useActionState, useContext, useState } from "react";
import { Categorie } from "../../../types/Categorie";

import { createCategorie, updateCategorie } from "../services/categories";
import { CatalogContext } from "@/context/CatalogContext";

const useCategoriesAction = () => {

  const {
    setCategorieList
  } = useContext(CatalogContext)! 

  const [isFormOpen, setFormOpen] = useState<boolean>(false);
  const toggleFormStatus = () => {
    setFormOpen((prev) => !prev);
  };

  const [createCategorieErr, onCreatecategorieAction, isCreatecategoriePending] =
    useActionState(
      async (
        _: string | null,
        data: Categorie
      ) => {
        try {
          const res = await createCategorie(data);
          if (res) {
            setCategorieList((prev) => [...prev, res]);
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

  const [updateCategorieErr, onUpdateCategorieAction, isUpdateCategoriePending] =
    useActionState(async (_: string | null, data: Categorie) => {
      try {
        if (!data.id) return "Id de la categoria no existe";
        const res = await updateCategorie(data, data.id);

        if (res) {
          setCategorieList((prev) =>
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

  const onDeleteCategorie = async (id: number) => {
    if (!id) return;

    // let deleteResponse = await deletePromotion(id);
    // if (deleteResponse) {
    //   setPromotionList((prev) => prev.filter((curr) => curr.id !== id));
    // }
  };

  

  return {
    // crear
    createCategorieErr,
    onCreatecategorieAction,
    isCreatecategoriePending,
    // update
    updateCategorieErr,
    onUpdateCategorieAction,
    isUpdateCategoriePending,
    // delete
    onDeleteCategorie,
    // formulario
    isFormOpen,
    toggleFormStatus,
  };
};

export default useCategoriesAction;
