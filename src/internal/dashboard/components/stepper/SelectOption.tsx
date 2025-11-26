import { DashboardContext } from "@/context/DashboardContext";
import { Check } from "lucide-react";
import { useContext } from "react";
import { BsBank } from "react-icons/bs";
import { SiMercadopago } from "react-icons/si";
import { selectedOption } from "../../types/Stepper";

const SelectOption:React.FC = () => {
  const { setActionOption, selectedAction } = useContext(DashboardContext)!;

  const handleSelect = (method: selectedOption) => setActionOption(method);

  const getOptionData = (method: selectedOption) => {
    switch (method) {
      case "reschedule":
        return {
          label: "Reprogramar",
          description: "Pago inmediato con tarjeta o saldo",
          icon: <SiMercadopago size={20} />,
        };
      case "cancel":
        return {
          label: "Cancelar",
          description: "Paga con alias o CBU y envía comprobante",
          icon: <BsBank size={20} />,
        };
    }
  };

  const renderOption = (method: selectedOption) => {
    const data = getOptionData(method)!;
    const isSelected = selectedAction === method;

    return (
      <li
        key={method}
        onClick={() => handleSelect(method)}
        className={`px-4 py-5 flex items-center gap-4 rounded-4xl border transition-all duration-200
          ${
            isSelected
              ? "bg-zinc-100 text-zinc-900 border-zinc-700 cursor-pointer"
              : "bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border-zinc-700 cursor-pointer"
          }`}
      >
        {/* Check */}
        <label className="relative flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isSelected}
            readOnly
            className="
              peer appearance-none w-6 h-6 border-2 border-zinc-500 rounded-full
              checked:bg-zinc-900 checked:border-zinc-900
              transition-colors duration-200
              focus:outline-none
            "
          />
          <Check
            size={16}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
              text-white transform opacity-0 scale-50
              transition-all duration-200 ease-out
              peer-checked:opacity-100 peer-checked:scale-100"
          />
        </label>

        {/* Icono y textos */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="font-medium">{data.label}</span>
            <span className="text-sm">{data.description}</span>
          </div>
        </div>
      </li>
    );
  };

  return (
    <ul className="flex flex-col gap-3 flex-1">
      {(["reschedule", "cancel"] as selectedOption[]).map(renderOption)}
    </ul>
  );
};

export default SelectOption;
