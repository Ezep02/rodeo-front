import { FieldError, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod";

export type RegisterFormData = {
  email: string;
  password: string;
  name: string;
  phone_number: string;
  surname: string;
};

export type RegisterFormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<RegisterFormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export type ValidFieldNames =
  | "email"
  | "password"
  | "name"
  | "phone_number"
  | "surname";

// ZOD TYPES
export const RegisterUserSchema: ZodType<RegisterFormData> = z.object({
  email: z.string().email({ message: "Se debe ingresar un email" }),
  password: z
    .string()
    .min(7, { message: "La contraseña debe contener al menos 7 caracteres" })
    .max(20, { message: "La contraseña debe contener menos de 20 caracteres" }),
  name: z
    .string()
    .min(1, { message: "Ingrese un numbre valido" })
    .max(45, { message: "Debe contener menos de 45 caracteres" }),
  phone_number: z
    .string()
    .min(6, { message: "El numero debe contener un minimo de 6 caracteres"})
    .max(20, { message: "Debes ingresar un numero valido"}),
  surname: z
    .string()
    .min(1, { message: "Ingrese al menos mas de un caracter" })
    .max(45, { message: "Debe contener menos de 45 caracteres" }),
});
