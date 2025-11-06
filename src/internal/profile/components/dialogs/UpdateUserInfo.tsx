import ErrorAlert from "@/components/alerts/ErrorAlert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/context/AuthContext";
import { User } from "@/models/AuthModels";
import { UpdateUser } from "@/service/user_info";
import React, {
  startTransition,
  useActionState,
  useContext,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

type Props = {
  user?: User;
  trigger?: React.ReactNode;
};

const UpdateUserInfo: React.FC<Props> = ({ user, trigger }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showErr, setShowErr] = useState<boolean>(false);

  const { setUserInfo, userInfo } = useContext(AuthContext)!;

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const { register, handleSubmit, reset } = useForm<User>({
    defaultValues: {
      id: user?.id,
    },
  });

  // Iniciar transaccion
  const [updateErrMsg, submitAction, isPending] = useActionState(
    async (_: void | null, data: User) => {
      try {
        if (!userInfo?.id) return;

        const updateResult = await UpdateUser(userInfo?.id, data);

        if (updateResult) {
          setUserInfo((prev) => {
            if (!prev) return prev;

            return {
              ...prev, // Mantengo TODO lo que ya tenía
              name: updateResult.name || prev.name,
              surname: updateResult.surname || prev.surname,
              email: updateResult.email || prev.email,
              phone_number: updateResult.phone_number || prev.phone_number,
            };
          });
          toggleOpen();
        }

        reset(updateResult);
      } catch (err: any) {
        setShowErr(true);
        console.warn("Error al actualizar:", err?.response?.data);
        return err?.response?.data?.error || "Error creando el post";
      }
    },
    undefined
  );

  const startSubmitTransition = (formData: User) => {
    startTransition(() => {
      submitAction(formData);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
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
              onClick={toggleOpen}
              className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition cursor-pointer"
            >
              <MdOutlineKeyboardArrowLeft size={24} className="text-zinc-700" />
            </button>
          </div>
        </DialogHeader>

        <div className="p-5 md:px-10 flex-1">
          <div>
            <DialogTitle>Editar perfil</DialogTitle>
            <DialogDescription>
              Actualiza los campos y guarda los cambios.
            </DialogDescription>
          </div>

          <form
            onSubmit={handleSubmit(startSubmitTransition)}
            className="space-y-6 mt-4"
          >
            {/* Nombre */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-400 w-40"
              >
                Nombre
              </Label>

              <input
                {...register("name", { required: true })}
                className="w-full p-3 border border-zinc-300 rounded-2xl"
                defaultValue={userInfo?.name}
              />
            </div>

            {/* Apellido */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <Label
                htmlFor="surname"
                className="text-sm font-medium text-gray-400 w-40"
              >
                Apellido
              </Label>

              <input
                {...register("surname", { required: true })}
                className="w-full p-3 border border-zinc-300 rounded-2xl"
                defaultValue={userInfo?.surname}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-400 w-40"
              >
                Email
              </Label>

              <input
                {...register("email", { required: true })}
                className="w-full p-3 border border-zinc-300 rounded-2xl"
                defaultValue={userInfo?.email}
              />
            </div>

            {/* Teléfono */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <Label
                htmlFor="phone_number"
                className="text-sm font-medium text-gray-400 w-40"
              >
                Teléfono
              </Label>

              <input
                {...register("phone_number", { required: true })}
                className="w-full p-3 border border-zinc-300 rounded-2xl"
                defaultValue={userInfo?.phone_number}
              />
            </div>

            <ErrorAlert
              message={updateErrMsg}
              show={showErr}
              onClose={() => setShowErr(false)}
            />

            {/* Botones */}
            <div className="sticky bottom-0 flex justify-end gap-2 p-4">
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
                disabled={isPending}
              >
                {isPending ? "Guardando..." : "Guardar cambios"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserInfo;
