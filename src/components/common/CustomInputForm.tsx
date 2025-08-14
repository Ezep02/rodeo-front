import { RegisterPaymentFieldProps } from "@/types/RegisterPaymentData";
import { LoginFormFieldProps } from "../../types/LoginAuthTypes";
import { RegisterFormFieldProps } from "../../types/RegisterAuthTypes";

export const FormField: React.FC<LoginFormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  // Se agrega una nueva prop opcional para la etiqueta

}) => {
  const inputId = `input-${name}`; // Genera un ID único para cada input

  return (
    <div className="flex flex-col gap-1">
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        {...register(name, { valueAsNumber })}
        className="w-full bg-zinc-200 border-zinc-300 rounded-xl px-3 py-3 text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        aria-invalid={error ? "true" : "false"}
      />
      {error && (
        <span role="alert" className="text-rose-600 text-sm">
          {error.message}
        </span>
      )}
    </div>
  );
};
export const FormRegisterField: React.FC<RegisterFormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <div className="flex flex-col gap-1 w-full">
    <input
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
      className="w-full bg-zinc-200 border-zinc-300 rounded-xl px-3 py-3 text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      aria-invalid={error ? "true" : "false"}
    />
    {error && (
      <span role="alert" className="text-rose-600 text-sm">
        {error.message}
      </span>
    )}
  </div>
);


export const FormRegisterPaymentField: React.FC<RegisterPaymentFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <div className="flex flex-col gap-1 w-full">
    <input
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
      className="p-2 rounded-md  border  placeholder-gray-400 text-sm"
    />
    {error && <span className="text-rose-600 text-pretty text-sm">{error.message}</span>}
  </div>
);
