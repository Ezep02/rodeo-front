import React, { useState, useEffect } from "react";
import { CloudinaryImage } from "../../types/Cloudinary";
import { Button } from "@/components/ui/button";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { IoCheckmarkSharp } from "react-icons/io5";
import { Check } from "lucide-react";

type Props = {
  img: CloudinaryImage[];
  onSelect: (image: CloudinaryImage | null) => void;
  onClose: () => void;
  fetchMoreImg: () => void;
  nextCursor: string;
  selectedImg?: CloudinaryImage | null;
};

const CloudUpdateImage: React.FC<Props> = ({
  img,
  onSelect,
  onClose,
  fetchMoreImg,
  nextCursor,
  selectedImg,
}) => {
  const [localSelected, setLocalSelected] = useState<CloudinaryImage | null>(
    selectedImg || null
  );

  useEffect(() => {
    setLocalSelected(selectedImg || null);
  }, [selectedImg]);

  // quitar la extensión
  const removeExt = (display_name: string): string => {
    if (!display_name) return "";
    return display_name.slice(0, display_name.lastIndexOf(".")) || display_name;
  };

  // selección de UNA sola imagen
  const selectImg = (image: CloudinaryImage) => {
    if (localSelected?.public_id === image.public_id) {
      setLocalSelected(null); // deseleccionar si vuelven a hacer click
    } else {
      setLocalSelected(image); // reemplaza selección
    }
  };

  // determinar si la imagen está seleccionada
  const isSelected = (image: CloudinaryImage) =>
    localSelected?.public_id === image.public_id;

  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col overflow-hidden h-full overflow-y-scroll">
      <header className="mb-2 pt-6 px-6">
        <div className="flex gap-4 mb-3 items-center">
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition cursor-pointer"
          >
            <MdOutlineKeyboardArrowLeft size={24} className="text-zinc-700" />
          </button>
          <h2 className="text-xl font-semibold">Seleccionar imagen</h2>
        </div>
      </header>

      <div className="p-5 md:px-10 flex-1">
        <main className="p-6 overflow-y-auto flex-1">
          {img.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {img.map((image) => (
                  <div
                    key={image.public_id}
                    className={`relative group rounded-4xl overflow-hidden cursor-pointer border shadow-sm transition-all duration-200
                      ${
                        isSelected(image)
                          ? "shadow-2xl scale-[1.02]"
                          : "border-zinc-200"
                      }
                    `}
                    onClick={() => selectImg(image)}
                  >
                    <img
                      src={image.url}
                      alt={image.public_id}
                      className="w-full h-80 object-cover transition duration-300 group-hover:blur-sm"
                    />

                    <div
                      className={`absolute inset-0 flex flex-col px-4 text-white bg-black bg-opacity-40 backdrop-blur-sm opacity-0 group-hover:opacity-100  group-active:transition-opacity duration-300 ${
                        isSelected(image)
                          ? "opacity-100 group-hover:opacity-100"
                          : ""
                      }`}
                    >
                      <div className="flex flex-auto items-center">
                        <h2 className="text-2xl mb-2 text-start uppercase flex">
                          {removeExt(image.display_name || "Sin nombre")}
                        </h2>
                      </div>

                      <div className="py-5 flex justify-end">
                        {isSelected(image) && <Check size={20} />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Botones abajo */}
              <div className="flex justify-between mt-6">
                {nextCursor && (
                  <Button
                    size="sm"
                    onClick={fetchMoreImg}
                    type="button"
                    className="bg-zinc-800 text-white hover:bg-zinc-700 active:scale-95"
                  >
                    Ver más
                  </Button>
                )}
              </div>
            </>
          ) : (
            <p className="text-sm text-zinc-500 text-center mt-8">
              No hay imágenes disponibles
            </p>
          )}
        </main>
        
        <div className="sticky bottom-0 flex justify-end gap-2 p-4">
          <Button
            onClick={onClose}
            variant={"ghost"}
            className="rounded-full active:scale-95 cursor-pointer"
          >
            Cancelar
          </Button>
          <Button
            onClick={() => onSelect(localSelected)}
            disabled={!localSelected}
            className="rounded-full active:scale-95 cursor-pointer"
          >
            <IoCheckmarkSharp size={18} />
            {localSelected ? "Seleccionar 1 imagen" : "Selecciona una imagen"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CloudUpdateImage