import { CatalogContext } from "@/context/CatalogContext";
import { Media } from "@/types/MediaFile";
import { useActionState, useContext, useState } from "react";
import { setServiceImg, updateServiceImg } from "../services/media";

const useMediaAction = () => {
  const { setServiceMedia } = useContext(CatalogContext)!;

  const [isMediaFormOpen, setMediaFormOpen] = useState<boolean>(false);
  const toggleMediaFormStatus = () => {
    setMediaFormOpen((prev) => !prev);
  };

  const [createMediaErr, onCreateMediaAction, isCreateMediaPending] =
    useActionState(
      async (_: string | null, data: { media: Media; service_id: number }) => {
        try {
          if (!data.service_id) return "id no encontrado";
          const res = await setServiceImg(data.media, data.service_id);
          if (res) {
            setServiceMedia((prev) => [...prev, res]);
            toggleMediaFormStatus();
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

  const [updateMediaErr, onUpdateMediaAction, isUpdateMediaPending] =
    useActionState(
      async (
        _: string | null,
        data: Media
      ) => {
        try {
          if (!data.id) return "Id no encontrado";
          const res = await updateServiceImg(data, data.id);

          if (res) {
            setServiceMedia((prev) =>
              prev.map((curr) => (curr.id === data.id ? res : curr))
            );
            toggleMediaFormStatus();
          }

          return res ? null : "No se pudo crear la promo";
        } catch (error: any) {
          return (
            error?.response?.data?.error ||
            error.message ||
            "Error actualizando promoción"
          );
        }
      },
      null
    );

  const onDeleteCategorie = async (id: number) => {
    if (!id) return;

    // let deleteResponse = await deletePromotion(id);
    // if (deleteResponse) {
    //   setPromotionList((prev) => prev.filter((curr) => curr.id !== id));
    // }
  };

  return {
    // Toggle del formulario
    isMediaFormOpen,
    toggleMediaFormStatus,
    // Create
    createMediaErr,
    onCreateMediaAction,
    isCreateMediaPending,
    // Delete

    // Update
    updateMediaErr,
    onUpdateMediaAction,
    isUpdateMediaPending,
  };
};

export default useMediaAction;
