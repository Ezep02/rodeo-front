import ErrorAlert from "@/components/alerts/ErrorAlert";
import { FormRegisterField } from "@/components/common/CustomInputForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RegisterUserReq, User } from "@/models/AuthModels";
import { UserRegister } from "@/service/AuthService";
import {
  RegisterFormData,
  RegisterUserSchema,
} from "@/types/RegisterAuthTypes";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { startTransition, useActionState, useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa6";

import { GiBullHorns } from "react-icons/gi";

type Props = {
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  setIsUserAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const RegisterDialog: React.FC<Props> = ({
  setIsUserAuthenticated,
  setUser,
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const ToggleDialog = () => {
    setOpen((prev) => !prev);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterUserSchema),
  });

  const [showError, setShowError] = useState(false);

  const [registerErr, registerAction, isRegisterPending] = useActionState(
    async (_: string | null, data: RegisterUserReq) => {
      try {
        const user = await UserRegister(data);
        if (user) {
          setUser(user.user);
          setIsUserAuthenticated(true);
        }
        return null;
      } catch (error: any) {
        setShowError(true);
        return error?.response?.data?.error || "Error registrando usuario";
      }
    },

    null 
  );

  // Manejar el registro
  const handleRegister = (data: RegisterFormData) => {
    // Map RegisterFormData to RegisterUserReq if needed
    startTransition(() => {
      registerAction(data);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={ToggleDialog}>
      <DialogTrigger asChild>
        <Button onClick={() => ToggleDialog} variant={"default"} className="rounded-full active:scale-95">
          Comenzar ahora
        </Button>
      </DialogTrigger>

      <ErrorAlert
        message={registerErr}
        show={showError}
        onClose={() => setShowError(false)}
      />

      <DialogContent
        className="w-full h-full max-w-full max-h-full p-6 bg-zinc-50 flex flex-col
                overflow-y-auto scroll-abrir-editar-tarjeta shadow-2xl md:rounded-3xl
                2xl:max-h-[90vh] 2xl:min-h-[80vh] 2xl:max-w-5xl
                xl:max-h-[90vh] xl:min-h-[80vh] xl:max-w-4xl
                lg:max-h-[90vh] lg:min-h-[85vh] lg:max-w-3xl
                md:max-h-[95vh] md:min-h-[80vh] md:max-w-2xl"
      >
        <DialogHeader className="flex items-center justify-between">
          <div className="absolute top-4 left-4">
            <button className="p-2" onClick={ToggleDialog}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-zinc-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center flex-1 py-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-6">
              <div className="flex mb-2 gap-1">
                <GiBullHorns size={20} className="text-zinc-950" />
                <span className="text-sm font-semibold text-zinc-700">
                  El Rodeo
                </span>
              </div>
              <DialogTitle className="text-3xl font-bold text-zinc-900 text-start">
                Comenzar ahora
              </DialogTitle>
            </div>
            {isRegisterPending ? (
              <div className="w-full flex justify-center items-center flex-col gap-1">
                <p className="loader"></p>
                <span>verificando informacion</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(handleRegister)}
                className="flex flex-col gap-4"
              >
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Nombre
                  </label>

                  <FormRegisterField
                    type="text"
                    placeholder="Ingresar nombre"
                    name="name"
                    register={register}
                    error={errors.name}
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Apellido
                  </label>
                  <FormRegisterField
                    type="text"
                    placeholder="Ingresar apellido"
                    name="surname"
                    register={register}
                    error={errors.surname}
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Telefono
                  </label>
                  <FormRegisterField
                    type="text"
                    placeholder="Ingresar telefono"
                    name="phone_number"
                    register={register}
                    error={errors.phone_number}
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Correo
                  </label>
                  <div className="relative">
                    <FormRegisterField
                      type="email"
                      placeholder="nombre@gmail.com"
                      name="email"
                      register={register}
                      error={errors.email}
                    />
                    <a
                      href="#"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-blue-600 hover:underline"
                    >
                      ¿Olvidé mi contraseña?
                    </a>
                  </div>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Contraseña
                  </label>
                  <FormRegisterField
                    type="password"
                    placeholder="Ingresar contraseña"
                    name="password"
                    register={register}
                    error={errors.password}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-lg font-semibold"
                >
                  Crear cuenta
                </Button>

                <div className="flex flex-col gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      className="w-4 h-4 text-black border-zinc-300 rounded focus:ring-black"
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm font-normal text-zinc-600"
                    >
                      He leído y acepto la{" "}
                      <span className="underline">Política de Privacidad</span>{" "}
                      y los{" "}
                      <span className="underline">Términos y Condiciones</span>
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="remember"
                      className="w-4 h-4 text-black border-zinc-300 rounded focus:ring-black"
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm font-normal text-zinc-600"
                    >
                      Recordarme
                    </label>
                  </div>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 border-zinc-300 text-zinc-700 font-semibold"
                    type="button"
                  >
                    <FaGoogle />
                    Continuar con Google
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;
