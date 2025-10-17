import React from "react";
import { Check } from "lucide-react";
import { Slot } from "../../../../types/Slot";

type Props = {
  slot: Slot;
  isSelected: boolean;
  onToggle: (id: number, action: "selected" | "unselected") => void;
};

const EventListItem: React.FC<Props> = ({ slot, isSelected, onToggle }) => {
  const handleToggle = () => {
    if (!slot.id) return;
    onToggle(slot.id, isSelected ? "unselected" : "selected");
  };


  return (
    <li
      className="px-4 py-5 group bg-zinc-200/50 hover:bg-zinc-200/40 rounded-3xl border border-gray-100 flex items-center gap-2 active:scale-[1.01]"
      onClick={handleToggle}
    >
      {/* Checkbox */}
      <div className="px-2">
        <label className="relative flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleToggle}
            className="
              peer appearance-none w-6 h-6 border-2 border-gray-500 rounded-full cursor-pointer 
              checked:bg-zinc-900 checked:border-gray-900
              transition-colors duration-200
              focus:outline-none focus:ring-gray-900/50 
              hover:ring-1 group-hover:ring-1"
          />
          <Check
            size={17}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
              text-white transform opacity-0 scale-50 
              transition-all duration-200 ease-out
              peer-checked:opacity-100 peer-checked:scale-100"
          />
        </label>
      </div>

      {/* Info del slot */}
      <div className="flex flex-col">
        
        <span className="text-gray-800 font-medium uppercase">
          {slot.start.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })} - {" "}
          {slot.end.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}
        </span>
        
      </div>
    </li>
  );
};

export default EventListItem;
