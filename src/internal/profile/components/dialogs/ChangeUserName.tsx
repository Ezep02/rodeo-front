import React, { startTransition, useActionState, useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";
import { Edit2 } from "lucide-react";
import { FaArrowLeft, FaRegUser } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { User } from "@/models/AuthModels";
import { UpdateUsername } from "@/service/user_info";
import { AuthContext } from "@/context/AuthContext";

type UpdateUserForm = {
  username: string
};

type DialogProps = {
  initUserData: User;
};

const ChangeUserName: React.FC<DialogProps> = ({ initUserData }) => {
  const { setUser } = useContext(AuthContext)!;

  const { register, handleSubmit, reset } = useForm<UpdateUserForm>();

  const [_, submitCategoryAction, isPending] = useActionState(
    async (_: void | null, data: UpdateUserForm) => {
      try {
        // recuperar nombre y apellido
        const { username } = data;

        // realizar consulta
        let updateResult = await UpdateUsername(initUserData.id, username);
        if (updateResult) {
          setUser((prev) => {
            if (!prev) return;

            return {
              ...prev,
              username: updateResult.username,
              last_name_change: new Date(),
            };
          });
          console.log(updateResult.username);
        }

        reset();
      } catch (err) {
        console.error("Error realizar actualizacion:", err);
      }
    },
    undefined
  );

  // Iniciar transaccion de actualizacion
  const startSubmitTransition = (formData: UpdateUserForm) => {
    startTransition(() => {
      submitCategoryAction(formData);
    });
  };

  // función para calcular si el usuario cambió el nombre hace menos de 14 días
  const isLastNameChangeAfter = (): boolean => {
    if (!initUserData.last_name_change) return false;

    const lastChangeDate = new Date(initUserData.last_name_change);
    const limitDate = new Date(lastChangeDate);
    limitDate.setDate(limitDate.getDate() + 14);

    // Si la fecha límite es mayor que hoy, significa que aún NO pasaron 14 días
    return limitDate > new Date();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"ghost"} className="rounded-full">
          <Edit2 size={24} />
        </Button>
      </DialogTrigger>

      <DialogContent className="md:max-w-md max-w-sm p-6 rounded-3xl shadow-2xl bg-zinc-50">
        <DialogHeader className="mb-6 pt-2">
          <div className="flex flex-col gap-4">
            {/* Botón de volver + Título principal */}
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition">
                <FaArrowLeft size={18} className="text-zinc-700" />{" "}
              </button>
              <h1 className="text-lg font-semibold text-zinc-700">
                Actualizar nombre de usuario
              </h1>
            </div>

            {/* Icono + Descripción */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-zinc-900 rounded-xl text-white">
                <FaRegUser size={20} />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold text-zinc-700">
                  Personaliza tu identidad
                </DialogTitle>
                <DialogDescription className="text-sm text-zinc-500">
                  Cambia tu nombre de usuario. Ten en cuenta que solo puedes
                  hacerlo una vez cada <strong>14 días</strong>.
                </DialogDescription>
              </div>
            </div>
          </div>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(startSubmitTransition)}
          className="space-y-6 px-1"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Nombre
              </label>
              <input
                {...register("username", { required: true })}
                className="w-full p-3 border border-zinc-300 rounded-2xl"
                defaultValue={initUserData.username}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <DialogTrigger asChild>
              <Button type="button" variant="ghost">
                Cancelar
              </Button>
            </DialogTrigger>

            <Button
              type="submit"
              disabled={isPending || isLastNameChangeAfter()}
              className="rounded-full"
            >
              Guardar cambios
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeUserName;
