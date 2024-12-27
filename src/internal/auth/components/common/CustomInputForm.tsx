import { LoginFormFieldProps } from "../../types/LoginAuthTypes";
import { RegisterFormFieldProps } from "../../types/RegisterAuthTypes";

export const FormField: React.FC<LoginFormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <>
    <input
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
      className="p-2 rounded-md bg-zinc-50 border-2 text-zinc-800 w-full"
    />
    {error && <span className="error-message">{error.message}</span>}
  </>
);

export const FormRegisterField: React.FC<RegisterFormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <>
    <input
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
      className="p-2 rounded-md bg-zinc-50 border-2 text-zinc-800 w-full"
    />
    {error && <span className="error-message">{error.message}</span>}
  </>
);
