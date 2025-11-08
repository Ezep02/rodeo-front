import React, {
  startTransition,
  useActionState,
  useContext,
  useState,
} from "react";
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
import { useForm } from "react-hook-form";
import { User } from "@/models/AuthModels";
import { UpdateUsername } from "@/service/user_info";
import { AuthContext } from "@/context/AuthContext";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Label } from "@/components/ui/label";
import ErrorAlert from "@/components/alerts/ErrorAlert";

type UpdateUserForm = {
  username: string;
};

type DialogProps = {
  initUserData: User;
  trigger: React.ReactElement
};

const ChangeUserName: React.FC<DialogProps> = ({ initUserData, trigger }) => {
  const { setUser } = useContext(AuthContext)!;
  const [showErr, setShowErr] = useState<boolean>(false);

  const { register, handleSubmit, reset } = useForm<UpdateUserForm>();

  const [usernameErrMsg, submitUsernameAction, isPending] = useActionState(
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
              username: updateResult,
              last_name_change: new Date(),
            };
          });
        }

        reset();
      } catch (err: any) {
        setShowErr(true);
        return (
          err?.response?.data?.error || "Error actualizando nombre de usuario"
        );
      }
    },
    undefined
  );

  // Iniciar transaccion de actualizacion
  const startSubmitTransition = (formData: UpdateUserForm) => {
    startTransition(() => {
      submitUsernameAction(formData);
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

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>

      <DialogContent className="md:max-w-md max-w-[90vw] p-6 rounded-4xl shadow-2xl bg-zinc-50">
        <DialogHeader>
          <div className="flex gap-4 mb-3 items-center">
            <button
              onClick={toggleOpen}
              className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition cursor-pointer"
            >
              <MdOutlineKeyboardArrowLeft size={24} className="text-zinc-700" />
            </button>
          </div>
        </DialogHeader>

        <div className="p-5 md:px-10 flex-1">
          <div>
            <DialogTitle className="text-lg font-semibold text-zinc-700">
              Personaliza tu identidad
            </DialogTitle>
            <DialogDescription className="text-sm text-zinc-500">
              Cambia tu nombre de usuario. Ten en cuenta que solo puedes hacerlo
              una vez cada <strong>14 días</strong>.
            </DialogDescription>
          </div>

          <form
            onSubmit={handleSubmit(startSubmitTransition)}
            className="space-y-6 mt-4"
          >
            {/* Nombre */}
            <div className="flex flex-col justify-between gap-1">
              <Label className="text-sm font-medium text-gray-400 w-40">
                Nombre
              </Label>

              <input
                {...register("username", { required: true })}
                className="w-full p-3 border border-zinc-300 rounded-2xl"
                defaultValue={initUserData.username}
              />
            </div>

            <ErrorAlert
              message={usernameErrMsg}
              show={showErr}
              onClose={() => setShowErr(false)}
            />

            <div className="flex justify-end gap-3 pt-4">
              <DialogTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="rounded-full active:scale-95 cursor-pointer"
                >
                  Cancelar
                </Button>
              </DialogTrigger>

              <Button
                type="submit"
                disabled={isPending || isLastNameChangeAfter()}
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

export default ChangeUserName;
