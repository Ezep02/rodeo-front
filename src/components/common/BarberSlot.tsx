import React from "react";
import { SlotWithStatus } from "@/types/Slot";
import { Check, Lock } from "lucide-react";

type Props = {
  item: SlotWithStatus;
  onClickAction: () => void;
  isSelected: boolean;
};

const BarberSlot: React.FC<Props> = ({ item, onClickAction, isSelected }) => {
  const isBooked = item.is_booked;
  
  return (
    <li
      onClick={() => {
        if (!isBooked) onClickAction();
      }}
      className={`px-3 py-2.5 flex items-center justify-between gap-2 rounded-3xl border transition-all duration-200
        ${
          isBooked
            ? "bg-zinc-200 text-zinc-800 border-zinc-400 cursor-not-allowed"
            : isSelected
            ? "bg-zinc-100 text-zinc-900 border-zinc-700 cursor-pointer"
            : "bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border-zinc-700 cursor-pointer"
        }`}
      aria-disabled={isBooked}
    >
      {/* Check o candado */}
      <label className="relative flex items-center cursor-pointer">
        {isBooked ? (
          <Lock size={16} className="text-zinc-700" />
        ) : (
          <>
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
          </>
        )}
      </label>

      {/* Hora */}
      <span className="font-medium uppercase">
        {new Date(item.start).toLocaleTimeString("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </li>
  );
};

export default BarberSlot;
