import { FieldError, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod";

export type LoginFormData = {
  email: string;
  password: string;
};

export type LoginFormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<LoginFormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export type ValidFieldNames =
  | "email"
  | "password"


// ZOD TYPES
export const LoginUserSchema: ZodType<LoginFormData> = z.object({
  email: z.string().email({message: "Se debe ingresar un email"}),
  password: z
    .string()
    .min(7, {message: "La contraseña debe contener al menos 7 caracteres"})
    .max(20, {message: "La contraseña debe contener menos de 20 caracteres"})
})