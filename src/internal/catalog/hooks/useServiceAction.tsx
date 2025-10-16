import { useActionState, useContext, useState } from "react";


import { Service } from "../../../types/ServiceTypes";
import {
  addCategorie,
  createService,
  deleteService,
  removeCategorie,
  updateService,
} from "../../../service/services";
import { CatalogContext } from "@/context/CatalogContext";

export const useServiceAction = () => {
  const { setServiceList, categorieList } = useContext(CatalogContext)!;

  const [isFormOpen, setFormOpen] = useState<boolean>(false);
  const toggleFormStatus = () => {
    setFormOpen((prev) => !prev);
  };

  const [createSvcErr, onCreateSvcAction, isCreateSvcPending] = useActionState(
    async (_: string | null, data: Service) => {
      try {
        const res = await createService(data);
        if (res) {
          setServiceList((prev) => [...prev, res]);
          toggleFormStatus();
        }
        return res ? null : "No se pudo crear el servicio";
      } catch (error: any) {
        return (
          error?.response?.data?.error ||
          error.message ||
          "Error creando servicio"
        );
      }
    },
    null
  );

  const [updateSvcErr, onUpdateSvcAction, isUpdateSvcPending] = useActionState(
    async (_: string | null, data: Service) => {
      try {
        if (!data.id) return "Id del servicio no existe";
        const res = await updateService(data, data.id);

        if (res) {
          setServiceList((prev) =>
            prev.map((curr) =>
              curr.id === res.id ? { ...curr, ...res } : curr
            )
          );

          toggleFormStatus();
        }

        return res ? null : "No se pudo crear el servicio";
      } catch (error: any) {
        return (
          error?.response?.data?.error ||
          error.message ||
          "Error actualizando el servicio"
        );
      }
    },
    null
  );

  const onDeleteService = async (id: number) => {
    if (!id) return;

    try {
      const res = await deleteService(id);
      if (res) {
        setServiceList((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (error) {
      console.error("Error al eliminar el servicio:", error);
    }
  };

  const updateServiceCategories = async (
    id: number,
    changes: { toAdd: number[]; toRemove: number[] }
  ) => {
    try {
      if (changes.toAdd && changes.toAdd.length > 0) {
        let addRes = await addCategorie(id, changes.toAdd);
        if (addRes) {
          // Filtrar la info completa de las categorias agregadas
          const newCategories = categorieList.filter((cat) =>
            changes.toAdd.includes(cat.id)
          );

          // Actualizar serviceList reemplazando solo el servicio afectado
          setServiceList((prev) =>
            prev.map((service) =>
              service.id === id
                ? {
                    ...service,
                    categories: [
                      ...(service.categories ?? []),
                      ...newCategories,
                    ],
                  }
                : service
            )
          );
        }
      }

      // Eliminar categorías si existen
      if (changes.toRemove && changes.toRemove.length > 0) {
        let removeRes = await removeCategorie(id, changes.toRemove);
        if (removeRes) {
          // Actualizar serviceList reemplazando solo el servicio afectado
          setServiceList((prev) =>
            prev.map((service) =>
              service.id === id
                ? {
                    ...service,
                    categories: (service.categories ?? []).filter(
                      (cat:any) => !changes.toRemove.includes(cat.id)
                    ),
                  }
                : service
            )
          );
        }
      }
    } catch (err) {
      return { success: false, error: err };
    }
  };

  return {
    // create
    createSvcErr,
    onCreateSvcAction,
    isCreateSvcPending,

    // update
    updateSvcErr,
    onUpdateSvcAction,
    isUpdateSvcPending,
    // delete
    onDeleteService,
    // formulario
    isFormOpen,
    toggleFormStatus,
    // actualizacion de categorias
    updateServiceCategories,
  };
};
