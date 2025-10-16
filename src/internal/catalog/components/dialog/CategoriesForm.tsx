import React, { startTransition, useState } from "react";
import { Categorie } from "../../../../types/Categorie";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import useCategoriesAction from "../../hooks/useCategoriesAction";
import { Loader2 } from "lucide-react";
import { CloudinaryImage } from "../../types/Cloudinary";
import CloudUpdateImage from "./CloudUpdateImg";
import { Label } from "@/components/ui/label";
import useCloudinary from "../../hooks/useCloudinary";

type Props = {
  categorie?: Categorie;
  trigger?: React.ReactNode;
};

const CategoriesForm: React.FC<Props> = ({ categorie, trigger }) => {
  // HOOKS
  const { cloudImgGallery, FetchMoreImg, cloudNextCursor } = useCloudinary();

  const { register, handleSubmit, setValue } = useForm<Categorie>({
    defaultValues: {
      id: categorie?.id,
      name: categorie?.name || "",
      preview_url: categorie?.preview_url,
    },
  });

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

  const {
    onCreatecategorieAction,
    onUpdateCategorieAction,
    isFormOpen,
    toggleFormStatus,
    createCategorieErr,
    updateCategorieErr,
    isCreatecategoriePending,
  } = useCategoriesAction();

  // Submit event
  const handleSubmitForm = async (data: Categorie) => {
    startTransition(async () => {
      if (!categorie) {
        onCreatecategorieAction(data);
      } else {
        onUpdateCategorieAction(data);
      }
    });
  };

  return (
    <Dialog open={isFormOpen} onOpenChange={toggleFormStatus}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent
        className="
          2xl:max-h-[60vh] 2xl:min-h-[60vh] 2xl:max-w-3xl
          xl:max-h-[60vh] xl:min-h-[50vh] xl:max-w-3xl 
          lg:max-h-[70vh] lg:min-h-[50vh] lg:max-w-2xl
          md:max-h-[79vh] md:min-h-[50vh] md:max-w-2xl  
          max-w-full max-h-full
          w-full h-full 
          p-6 flex flex-col bg-zinc-50 z-50 md:rounded-4xl
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

        <div className="p-2 md:p-5 md:px-10 flex-1">
          <div>
            <DialogTitle>
              {categorie ? "Editar categoría" : "Crear categoría"}
            </DialogTitle>
            <DialogDescription>
              Completa los campos y guarda los cambios.
            </DialogDescription>
          </div>

          {isCreatecategoriePending ? (
            <div className="p-6 flex justify-center items-center">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
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
                    src={selectedImg?.url || categorie?.preview_url}
                    alt={categorie?.name}
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

              {/* Input HTML normal */}
              <div className="flex gap-3">
                <input
                  id="name"
                  type="text"
                  {...register("name", {
                    required: "El nombre es obligatorio",
                  })}
                  placeholder="Nombre de categoría"
                  className="mt-1 rounded-xl border border-gray-300 p-2 flex-1"
                />
              </div>

              {/* Errores */}
              {createCategorieErr && !categorie && (
                <p style={{ color: "red" }}>{createCategorieErr}</p>
              )}
              {updateCategorieErr && categorie && (
                <p style={{ color: "red" }}>{updateCategorieErr}</p>
              )}

              {/* Botones */}
              <div className="sticky bottom-0 flex justify-end gap-2">
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
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CategoriesForm;
