import { useForm } from "react-hook-form";
import { LoginFormData, LoginUserSchema } from "../types/LoginAuthTypes";
import {FormField} from "../components/common/CustomInputForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

const UsersLogin = () => {
  const { UserSignIn, GoogleLogIn } = useContext(AuthContext)!;

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


  return (
    <main className="h-full w-full flex items-center justify-center bg-gradient-to-br from-slate-100 via-red-100 to-gray-50 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl flex flex-col gap-2 shadow-lg p-8 w-full max-w-md border border-gray-200"
      >
        <div className="flex justify-center mb-6">
          <img src="/logo.svg" alt="Logo" className="w-32" />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Forma parte del <span className="text-red-400">Rodeo</span>
        </h1>

        <div className="">
          <label htmlFor="email" className="text-gray-700">
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

        <div className="">
          <label htmlFor="password" className="text-gray-700">
            Contraseña
          </label>
          <FormField
            type="password"
            placeholder="*******"
            name="password"
            register={register}
            error={errors.password}
          />
        </div>

        <div>
          <button
            type="submit"
            className="px-4 py-3 w-full uppercase bg-zinc-800 text-white text-sm font-medium rounded-md shadow hover:bg-zinc-700 transition-all"
          >
            Iniciar Sesión
          </button>

        </div>

        <div className="flex justify-end py-1">
          <Link to="/" className="text-sm text-gray-600 font-semibold">
            Olvidaste tu contraseña
          </Link>
        </div>
        
        <div className="">
          <button type="button" onClick={GoogleLogIn} className="w-full flex gap-2 justify-center uppercase items-center px-4 py-2 border text-zinc-700  text-sm font-medium rounded-md hover:text-zinc-500 transition-all hover:shadow">
            <i><FaGoogle/></i>Iniciar Sesión con google
          </button>
        </div>

        <p className="mt-4 text-center text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link to="/auth/register" className="text-blue-500 hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </form>
      

    </main>
  );
};

export default UsersLogin;
