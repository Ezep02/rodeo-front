import { FieldError, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod";

export type ExpenseFormData = {
  title: string;
  description: string;
  amount: number;
};

export type ExpenseFormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<ExpenseFormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export type ValidFieldNames = "title" | "description" | "amount";

// ZOD TYPES
export const ExpenseSchema: ZodType<ExpenseFormData> = z.object({
  title: z.string().min(1, { message: "Debes ingresar un titulo" }),
  description: z.string(),
  amount: z
    .number({ message: "Debes ingresar valores numericos" })
    .min(0, { message: "Debes ingresar un valor mayor a 0" }),
});
