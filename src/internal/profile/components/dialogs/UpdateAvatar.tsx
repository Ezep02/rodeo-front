import { useState, ChangeEvent, useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Camera, Plus } from "lucide-react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { updateAvatar } from "../../services/user_information";
import { AuthContext } from "@/context/AuthContext";

type Props = {
  avatar: string;
};

const UpdateAvatar: React.FC<Props> = ({ avatar }) => {
  const {setUserInfo} = useContext(AuthContext)!

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(avatar || null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      handleAvatarUpdate(file);
    }
  };

  /**
   * Simula la actualización del avatar (conexión a API o base de datos)
   */
  const handleAvatarUpdate = async (file: File) => {
    try {
      setIsUpdating(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await updateAvatar(formData);
      if (response){
        setUserInfo((prev) => {
            if (!prev) return prev

            return {
                ...prev,
                avatar: response
            }
        })

        toggleOpen()
      }

    } catch (error) {
      console.error("Error actualizando el avatar:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"default"} className="rounded-full">
          <Camera />
        </Button>
      </DialogTrigger>

      <DialogContent className="md:max-w-md max-w-sm p-6 rounded-4xl shadow-2xl bg-zinc-50">
        <DialogHeader>
          <div className="flex gap-4 mb-2 items-center">
            <button
              onClick={toggleOpen}
              className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition cursor-pointer"
            >
              <MdOutlineKeyboardArrowLeft size={24} className="text-zinc-700" />
            </button>
          </div>
        </DialogHeader>

        <div className="md:px-10 flex-1">
          <div>
            <DialogTitle>Cambiar avatar</DialogTitle>
            <DialogDescription>
              Elegi avatar y guarda los cambios.
            </DialogDescription>
          </div>

          {/* Avatar + Input oculto */}
          <div className="relative flex justify-center mt-6">
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            <label
              htmlFor="avatar-upload"
              className="cursor-pointer group relative"
            >
              <Avatar className="w-40 h-40 border rounded-full overflow-hidden">
                <AvatarImage src={preview || undefined} alt="Profile avatar" />
                <AvatarFallback className="uppercase bg-zinc-200 text-zinc-700 text-3xl flex items-center justify-center">
                  {!preview ? <Plus size={36} /> : ""}
                </AvatarFallback>
              </Avatar>

              {/* Overlay con icono cámara al pasar el mouse */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition rounded-full">
                <Camera className="text-white w-8 h-8" />
              </div>
            </label>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="ghost"
            className="rounded-full active:scale-95 cursor-pointer"
            onClick={toggleOpen}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="rounded-full active:scale-95 cursor-pointer"
            disabled={isUpdating}
          >
            {isUpdating ? "Guardando..." : "Guardar cambios"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAvatar;
