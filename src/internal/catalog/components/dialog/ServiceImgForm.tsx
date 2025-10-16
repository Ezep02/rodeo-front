import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import CloudUpdateImage from "./CloudUpdateImg";
import { Button } from "@/components/ui/button";
import useMediaAction from "../../hooks/useMediaAction";
import { CloudinaryImage } from "../../types/Cloudinary";
import useCloudinary from "../../hooks/useCloudinary";
import { useForm } from "react-hook-form";
import { Media } from "@/types/MediaFile";

type Props = {
  service_id: number;
  media?: Media;
  trigger?: React.ReactNode;
};

const ServiceImgForm: React.FC<Props> = ({ service_id, media, trigger }) => {
  const { handleSubmit, setValue } = useForm<Media>({
    defaultValues: {
      id: media?.id,
      service_id: service_id,
      url: media?.url,
    },
  });

  const {
    createMediaErr,
    isMediaFormOpen,
    onCreateMediaAction,
    toggleMediaFormStatus,
    onUpdateMediaAction,
    updateMediaErr,
  } = useMediaAction();

  // SELECCION DE IMAGENES
  const { cloudImgGallery, FetchMoreImg, cloudNextCursor } = useCloudinary();

  const [isImgSelectorOpen, setOpenImgSelector] = useState(false);
  const [selectedImg, setSelectedImg] = useState<CloudinaryImage | null>(null);

  // Cuando se selecciona nueva imagen
  const handleSelectImg = (image: CloudinaryImage | null) => {
    if (image) {
      setSelectedImg(image);
    }
    setOpenImgSelector(false);
  };

  const [isTransitioning, startTransition] = React.useTransition();

  const handleSubmitForm = async (data: Media) => {
    startTransition(async () => {
      switch (media) {
        case undefined:
          onCreateMediaAction({
            media: data,
            service_id: service_id,
          });
          break;
        default:
          onUpdateMediaAction(data);
      }
    });
  };

  return (
    <Dialog open={isMediaFormOpen} onOpenChange={toggleMediaFormStatus}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent
        className="
          2xl:max-h-[80vh] 2xl:min-h-[50vh] 2xl:max-w-3xl
          xl:max-h-[80vh] xl:min-h-[50vh] xl:max-w-3xl 
          lg:max-h-[80vh] lg:min-h-[50vh] lg:max-w-2xl
          md:max-h-[95vh] md:min-h-[50vh] md:max-w-2xl  
          max-w-full max-h-full
          w-full h-full 
          p-6 flex flex-col bg-zinc-50 z-50 md:rounded-3xl
          shadow-2xl overflow-hidden overflow-y-scroll scroll-hidden
        "
      >
        <DialogHeader>
          <div className="flex gap-4 mb-3 items-center">
            <button
              onClick={toggleMediaFormStatus}
              className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition cursor-pointer"
            >
              <MdOutlineKeyboardArrowLeft size={24} className="text-zinc-700" />
            </button>
          </div>
        </DialogHeader>

        <div className="p-5 md:px-10 flex-1">
          <div>
            <DialogTitle>Elegir</DialogTitle>
            <DialogDescription>
              Selecciona y guarda los cambios.
            </DialogDescription>
          </div>

          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="space-y-6 mt-4"
          >
            {/* Imagen */}
            <div>
              <Label>Imagen</Label>
              <div
                className="relative w-28 h-28 mt-2 cursor-pointer group"
                onClick={() => setOpenImgSelector(true)}
              >
                <img
                  src={selectedImg?.url || media?.url}
                  className="w-full h-full object-cover rounded-xl border shadow-sm"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white rounded-xl transition">
                  Cambiar
                </div>
              </div>

              {isImgSelectorOpen && (
                <CloudUpdateImage
                  img={cloudImgGallery}
                  onClose={() => setOpenImgSelector(false)}
                  onSelect={(image) => {
                    handleSelectImg(image);
                    setValue("url", image?.url || "");
                  }}
                  fetchMoreImg={FetchMoreImg}
                  nextCursor={cloudNextCursor}
                  selectedImg={selectedImg}
                />
              )}
            </div>

            {createMediaErr && media && (
              <p style={{ color: "red" }}>{createMediaErr}</p>
            )}

            {updateMediaErr && media && (
              <p style={{ color: "red" }}>{updateMediaErr}</p>
            )}

            {/* Botones */}
            <div className="sticky bottom-0 flex justify-end gap-2 p-4">
              <Button
                type="button"
                variant="ghost"
                className="rounded-full active:scale-95 cursor-pointer"
                onClick={toggleMediaFormStatus}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="rounded-full active:scale-95 cursor-pointer"
              >
                Guardar cambios
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceImgForm;
