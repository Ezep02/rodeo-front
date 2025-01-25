import { AuthContext } from "@/context/AuthContext";
import {
  LoginFormData,
  LoginUserSchema,
} from "@/internal/auth/types/LoginAuthTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FormField } from "./CustomInputForm";
import { FaGoogle } from "react-icons/fa";
import ShowErrorPopUp from "./ShowErrorPopUp";

const LogInForm: React.FC = () => {
  const {
    UserSignIn,
    GoogleLogIn,
    AuthFormChangeHandler,
    signInErrors,
    authIsLoading,
    setSignInErrors,
  } = useContext(AuthContext)!;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginUserSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    UserSignIn(data);
  };

  useEffect(() => {
    if (signInErrors.length > 0) {
      const timer = setTimeout(() => {
        setSignInErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [signInErrors]);

  return (
    <>
      {authIsLoading ? (
        <div className="flex h-full w-full  justify-center items-center bg-zinc-100 rounded-xl">
          <p className="loader"></p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gradient-to-r from-zinc-900 to-stone-900 rounded-xl flex flex-col gap-2 p-8 w-full h-full min-h-full shadow-lg flex-1"
        >
          {signInErrors.length > 0 && (
            <ShowErrorPopUp errorMessage={signInErrors[0]} />
          )}
          <div>
            <h1 className="text-2xl font-bold text-center text-zinc-50 mb-4">
              Inicia sesión en{" "}
              <span className="text-pretty text-rose-500">El Rodeo</span>
            </h1>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-rose-500 text-pretty font-semibold"
            >
              Email
            </label>
            <FormField
              type="email"
              placeholder="nombre@gmail.com"
              name="email"
              register={register}
              error={errors.email}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-rose-500 text-pretty font-semibold"
            >
              Contraseña
            </label>
            <FormField
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
              Iniciar Sesión
            </button>
          </div>

          <div className="flex justify-end py-1">
            <Link to="/" className="text-sm text-zinc-50 font-semibold">
              ¿Olvidaste la contraseña?
            </Link>
          </div>

          <div className="">
            <button
              type="button"
              onClick={GoogleLogIn}
              className="w-full flex gap-2 justify-center items-center px-4 py-2 border text-zinc-200 text-sm font-medium rounded-md hover:text-zinc-400 transition-all hover:shadow"
            >
              <i>
                <FaGoogle />
              </i>
              Continuar con Google
            </button>
          </div>

          <p className="mt-4 text-center text-gray-100">
            ¿No tienes cuenta?{" "}
            <button
              onClick={AuthFormChangeHandler}
              className="text-rose-500 font-semibold"
            >
              Registrarse
            </button>
          </p>
        </form>
      )}
    </>
  );
};

export default LogInForm;
