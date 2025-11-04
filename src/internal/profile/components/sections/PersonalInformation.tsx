import React, { useContext, useState, startTransition } from "react";
import { useForm } from "react-hook-form";
import { useActionState } from "react";
import { Label } from "../../../../components/ui/label";
import { Button } from "../../../../components/ui/button";
import { Edit2 } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { User } from "@/models/AuthModels";
import { UpdateUser } from "@/service/user_info";
import ErrorAlert from "../../../../components/alerts/ErrorAlert";


const PersonalInformation: React.FC = () => {
  const { setUser, userInfo } = useContext(AuthContext)!;
  const [isEditing, setIsEditing] = useState(false);

  const [showErr, setShowErr] = useState<boolean>(false)

  const { register, handleSubmit, reset } = useForm<User>({
    defaultValues: userInfo,
  });

  const [updateErrMsg, submitAction, isPending] = useActionState(
    async (_: void | null, data: User) => {
      try {
        if (!userInfo?.id) return

        const updateResult = await UpdateUser(userInfo?.id, data);

        if (updateResult.user) {
          setUser((prev) => {
            if (!prev) return prev;

            return {
              ...prev, // Mantengo TODO lo que ya tenía
              name: updateResult.user.name || prev.name,
              surname: updateResult.user.surname || prev.surname,
              email: updateResult.user.email || prev.email,
              phone_number: updateResult.user.phone_number || prev.phone_number,
            };
          });
        }

        setIsEditing(false);
        reset(updateResult.user);
      } catch (err: any) {
        setShowErr(true)
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
    <div className="space-y-6">
      <div>
        {/* Encabezado */}
        <div className="flex justify-between items-start flex-col gap-3">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              Información Personal
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Actualiza tu información personal y de contacto.
            </p>
          </div>

          {!isEditing && (
            <Button
              type="button"
              variant="default"
              className="gap-2 rounded-full px-4 py-2 text-sm font-medium transition"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 size={16} />
              Editar
            </Button>
          )}
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit(startSubmitTransition)}
          className="space-y-6 mt-8"
        >
          {/* Nombre */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <Label
              htmlFor="name"
              className="text-sm font-medium text-gray-400 w-40"
            >
              Nombre
            </Label>
            {isEditing ? (
              <input
                {...register("name", { required: true })}
                className="w-full p-3 border border-zinc-300 rounded-2xl"
                defaultValue={userInfo?.name}
              />
            ) : (
              <span className="text-gray-500">{userInfo?.name}</span>
            )}
          </div>

          {/* Apellido */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <Label
              htmlFor="surname"
              className="text-sm font-medium text-gray-400 w-40"
            >
              Apellido
            </Label>
            {isEditing ? (
              <input
                {...register("surname", { required: true })}
                className="w-full p-3 border border-zinc-300 rounded-2xl"
                defaultValue={userInfo?.surname}
              />
            ) : (
              <span className="text-gray-500">{userInfo?.surname}</span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-400 w-40"
            >
              Email
            </Label>
            {isEditing ? (
              <input
                {...register("email", { required: true })}
                className="w-full p-3 border border-zinc-300 rounded-2xl"
                defaultValue={userInfo?.email}
              />
            ) : (
              <span className="text-gray-500">{userInfo?.email}</span>
            )}
          </div>

          {/* Teléfono */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <Label
              htmlFor="phone_number"
              className="text-sm font-medium text-gray-400 w-40"
            >
              Teléfono
            </Label>
            {isEditing ? (
              <input
                {...register("phone_number", { required: true })}
                className="w-full p-3 border border-zinc-300 rounded-2xl"
                defaultValue={userInfo?.phone_number}
              />
            ) : (
              <span className="text-gray-500">
                {userInfo?.phone_number || "No registrado"}
              </span>
            )}
          </div>

          <ErrorAlert 
            message={updateErrMsg}
            show={showErr}
            onClose={()=> setShowErr(false)}
          />

          {/* Botones */}
          {isEditing && (
            <div className="flex flex-wrap gap-3 pt-6">
              <Button
                type="submit"
                className="rounded-full"
                disabled={isPending}
              >
                {isPending ? "Guardando..." : "Guardar cambios"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className=""
                onClick={() => {
                  reset(userInfo);
                  setIsEditing(false);
                }}
                disabled={isPending}
              >
                Cancelar
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PersonalInformation;
