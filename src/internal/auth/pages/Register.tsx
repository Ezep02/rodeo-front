import { useForm } from "react-hook-form";
import {
  RegisterFormData,
  RegisterUserSchema,
} from "../types/RegisterAuthTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { FormRegisterField } from "../components/common/CustomInputForm";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { User } from "../models/AuthModels";

const UserRegister = () => {
  const {UserSignUp} = useContext(AuthContext)!

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterUserSchema),
  });

  const onSubmit = (data: User) => {
    UserSignUp(data)
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
          Registrarse
        </h1>

        <div className="mb-4">
          <label htmlFor="name" className="text-gray-700">
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

        <div className="mb-4">
          <label htmlFor="surname" className="text-gray-700">
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

        <div className="mb-4">
          <label htmlFor="phone_number" className="text-gray-700">
            Numero telefonico 
          </label>
          <FormRegisterField
            type="text"
            placeholder="Ingresar numero telefonico"
            name="phone_number"
            register={register}
            error={errors.phone_number}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="text-gray-700">
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
          <label htmlFor="password" className="text-gray-700">
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

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-2xl transition duration-300"
        >
          Registrarse
        </button>

        <p className="mt-4 text-center text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/auth/login" className="text-blue-500 hover:underline">
            Iniciar sesion aquí
          </Link>
        </p>
      </form>
    </main>
  );
};

export default UserRegister;
