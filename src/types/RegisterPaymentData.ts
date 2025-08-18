import { FieldError, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod";

export type RegisterFormData = {
  email: string;
  name: string;
  phone_number: string;
  surname: string;
};

export type RegisterPaymentFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<RegisterFormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export type ValidFieldNames =
  | "email"
  | "name"
  | "phone_number"
  | "surname";

// ZOD TYPES
export const RegisterPaymentSchema: ZodType<RegisterFormData> = z.object({
  email: z.string().email({ message: "Se debe ingresar un email" }),
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
