import { useForm } from "react-hook-form";
import { LoginFormData, LoginUserSchema } from "../types/LoginAuthTypes";
import {FormField} from "../components/common/CustomInputForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

const UsersLogin = () => {
  const { UserSignIn } = useContext(AuthContext)!;

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
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border border-gray-200"
      >
        <div className="flex justify-center mb-6">
          <img src="/logo.svg" alt="Logo" className="w-32" />
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Iniciar Sesión
        </h1>

        <div className="mb-4">
          <label htmlFor="email" className="text-gray-700">
            Email
          </label>
          <FormField
            type="email"
            placeholder="Ingresar email"
            name="email"
            register={register}
            error={errors.email}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="text-gray-700">
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

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-2xl transition duration-300"
        >
          Iniciar Sesión
        </button>

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
