import React, { useContext, useEffect } from "react";
import { FormRegisterField } from "./CustomInputForm";
import { AuthContext } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import {
  RegisterFormData,
  RegisterUserSchema,
} from "@/internal/auth/types/RegisterAuthTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/internal/auth/models/AuthModels";
import ShowErrorPopUp from "./ShowErrorPopUp";

const RegisterForm: React.FC = () => {
  const {
    UserSignUp,
    AuthFormChangeHandler,
    authSignUpErrors,
    setAuthSignUpErrors,
    authIsLoading,
  } = useContext(AuthContext)!;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterUserSchema),
  });

  const onSubmit = (data: User) => {
    UserSignUp(data);
  };

  useEffect(() => {
    if (authSignUpErrors.length > 0) {
      const timer = setTimeout(() => {
        setAuthSignUpErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [authSignUpErrors]);

  return (
    <>
      {authIsLoading ? (
        <div className="flex h-full w-full  justify-center items-center bg-zinc-100 rounded-xl">
          <p className="loader"></p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gradient-to-r from-zinc-900 to-stone-900 rounded-xl shadow-lg p-8 w-full h-full flex flex-col gap-3 flex-1"
        >
          {authSignUpErrors.length > 0 && (
            <ShowErrorPopUp errorMessage={authSignUpErrors[0]} />
          )}

          <div>
            <h1 className="text-2xl font-bold text-center text-zinc-50 mb-4">
              Registrate en{" "}
              <span className="text-pretty text-rose-500">El Rodeo</span>
            </h1>
          </div>

          <div className="flex gap-2">
            <div className="w-full">
              <label
                htmlFor="password"
                className="text-rose-500 text-pretty font-semibold"
              >
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

            <div className="w-full">
              <label
                htmlFor="password"
                className="text-rose-500 text-pretty font-semibold"
              >
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
          </div>

          <div className="">
            <label
              htmlFor="phone_number"
              className="text-rose-500 text-pretty font-semibold"
            >
              Telefono
            </label>
            <FormRegisterField
              type="text"
              placeholder="Ingresar numero telefonico"
              name="phone_number"
              register={register}
              error={errors.phone_number}
            />
          </div>

          <div className="">
            <label
              htmlFor="email"
              className="text-rose-500 text-pretty font-semibold"
            >
              Email
            </label>
            <FormRegisterField
              type="email"
              placeholder="Ingresar email"
              name="email"
              register={register}
              error={errors.email}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="text-rose-500 text-pretty font-semibold"
            >
              Contraseña
            </label>
            <FormRegisterField
              type="password"
              placeholder="Contraseña"
              name="password"
              register={register}
              error={errors.password}
            />
          </div>

          <div>
            <button
              type="submit"
              className="px-4 py-3 w-full uppercase bg-rose-600 text-white text-sm font-medium rounded-md shadow hover:bg-rose-500"
            >
              Registrarse
            </button>
          </div>

          <p className="mt-4 text-center text-gray-100">
            ¿Ya tienes una cuenta?{" "}
            <button
              onClick={AuthFormChangeHandler}
              className="text-rose-500 font-semibold"
            >
              Iniciar sesion
            </button>
          </p>
        </form>
      )}
    </>
  );
};

export default RegisterForm;
