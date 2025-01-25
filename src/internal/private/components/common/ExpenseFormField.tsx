import { ExpenseFormFieldProps } from "../../types/ExpensesTypes";



export const ExpenseFormField: React.FC<ExpenseFormFieldProps> = ({
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
      
      className="p-2 rounded-md bg-zinc-200 border-1 text-zinc-800 placeholder-gray-500  outline-zinc-300"
    />
    {error && <span className="text-rose-500 text-pretty">{error.message}</span>}
  </div>
);
