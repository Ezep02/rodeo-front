import { LoginFormFieldProps } from "../../internal/auth/types/LoginAuthTypes";
import { RegisterFormFieldProps } from "../../internal/auth/types/RegisterAuthTypes";

export const FormField: React.FC<LoginFormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <div className="flex flex-col gap-1">
    <input
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
      autoFocus
      className="p-2 rounded-md bg-zinc-800 border-1 text-zinc-50 placeholder-gray-400 shadow-md"
    />
    {error && <span className="text-zinc-100 text-pretty">{error.message}</span>}
  </div>
);

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
      className="p-2 rounded-md bg-zinc-800 border-1 text-zinc-50 placeholder-gray-400 shadow-md"
    />
    {error && <span className="text-zinc-100 text-pretty">{error.message}</span>}
  </div>
);
