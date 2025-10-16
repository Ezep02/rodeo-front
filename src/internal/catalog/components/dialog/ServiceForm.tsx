import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import React, { startTransition, useState } from "react";
import { useServiceAction } from "../../hooks/useServiceAction";
import { CloudinaryImage } from "../../types/Cloudinary";
import useCloudinary from "../../hooks/useCloudinary";
import { Service } from "../../../../types/ServiceTypes";
import CloudUpdateImage from "./CloudUpdateImg";
import { useForm } from "react-hook-form";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

type Props = {
  service?: Service;
  trigger?: React.ReactNode;
};

const ServiceForm: React.FC<Props> = ({ service, trigger }) => {
  // HOOKS
  const { cloudImgGallery, FetchMoreImg, cloudNextCursor } = useCloudinary();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Service>({
    defaultValues: {
      id: service?.id,
      description: service?.description,
      is_active: service?.is_active,
      preview_url: service?.preview_url,
      name: service?.name,
      price: service?.price ?? 0,
    },
  });

  const isActive = watch("is_active");

  const {
    onUpdateSvcAction,
    onCreateSvcAction,
    isFormOpen,
    toggleFormStatus,
    createSvcErr,
    updateSvcErr,
  } = useServiceAction();

  // SELECCION DE IMAGENES
  const [isImgSelectorOpen, setOpenImgSelector] = useState(false);
  const [selectedImg, setSelectedImg] = useState<CloudinaryImage | null>(null);

  // Cuando se selecciona nueva imagen
  const handleSelectImg = (image: CloudinaryImage | null) => {
    if (image) {
      setSelectedImg(image);
    }
    setOpenImgSelector(false);
  };

  // Submit event
  const handleSubmitForm = async (data: Service) => {
    startTransition(async () => {
      switch (service) {
        case undefined:
          onCreateSvcAction(data);
          break;
        default:
          onUpdateSvcAction(data);
      }
    });
  };

  return (
    <Dialog open={isFormOpen} onOpenChange={toggleFormStatus}>
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
              onClick={toggleFormStatus}
              className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition cursor-pointer"
            >
              <MdOutlineKeyboardArrowLeft size={24} className="text-zinc-700" />
            </button>
          </div>
        </DialogHeader>

        <div className="p-5 md:px-10 flex-1">
          <div>
            <DialogTitle>
              {service ? "Editar servicio" : "Crear servicio"}
            </DialogTitle>
            <DialogDescription>
              Completa los campos y guarda los cambios.
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
                  src={selectedImg?.url || service?.preview_url}
                  alt={service?.name}
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
                    setValue("preview_url", image?.url || "");
                  }}
                  fetchMoreImg={FetchMoreImg}
                  nextCursor={cloudNextCursor}
                  selectedImg={selectedImg}
                />
              )}
            </div>

            {/* Nombre */}
            <div>
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                {...register("name", { required: "El nombre es obligatorio" })}
                placeholder="Ingresar nombre"
                className="mt-1 rounded-xl"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Descripción */}
            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Algo asi como una buena descripcion"
                className="mt-1 rounded-xl"
              />
            </div>

            {/* Activo */}
            {service && (
              <div className="flex flex-col gap-0.5">
                <Label htmlFor="is_active">Activo</Label>
                <Switch
                  id="is_active"
                  checked={isActive}
                  onCheckedChange={(checked) => setValue("is_active", checked)}
                />
              </div>
            )}

            {/* Precio */}
            <div>
              <Label htmlFor="price">Precio</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...register("price", {
                  required: "El precio es obligatorio",
                  min: { value: 0, message: "El precio no puede ser negativo" },
                  valueAsNumber: true,
                })}
                className="mt-1 rounded-xl"
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price.message}</p>
              )}
            </div>

            {createSvcErr && !service && (
              <p style={{ color: "red" }}>{createSvcErr}</p>
            )}
            {updateSvcErr && service && (
              <p style={{ color: "red" }}>{updateSvcErr}</p>
            )}

            {/* Botones */}
            <div className="sticky bottom-0 flex justify-end gap-2 p-4">
              <Button
                type="button"
                variant="ghost"
                className="rounded-full active:scale-95 cursor-pointer"
                onClick={toggleFormStatus}
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

export default ServiceForm;
