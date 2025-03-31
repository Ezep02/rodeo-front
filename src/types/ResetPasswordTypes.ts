import { FieldError, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod";

export type ResetPasswordFormData = {
    password: string;
    repeted_password: string
};

export type ResetPasswordFormFieldProps = {
    type: string;
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<ResetPasswordFormData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
};

export type ValidFieldNames =
    | "password"
    | "repeted_password"


// ZOD TYPES
export const ResetUserPasswordSchema = z.object({
    password: z
        .string()
        .min(7, { message: "La contraseña debe contener al menos 7 caracteres" })
        .max(20, { message: "La contraseña debe contener menos de 20 caracteres" }),

    repeted_password: z
        .string()
        .min(7, { message: "La contraseña debe contener al menos 7 caracteres" })
        .max(20, { message: "La contraseña debe contener menos de 20 caracteres" })
})
    .refine(data => data.password === data.repeted_password, {
        message: "Las contraseñas deben coincidir",
        path: ["repeted_password"],
    });