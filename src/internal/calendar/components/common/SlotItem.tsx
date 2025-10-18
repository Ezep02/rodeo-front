import React from "react";
import { SlotWithStatus } from "../../../../types/Slot";
import { Check } from "lucide-react";

type Props = {
  item: SlotWithStatus;
};

const SlotItem: React.FC<Props> = ({ item }) => {
  return (
    <li className="px-4 py-5 group bg-gray-300/25 hover:bg-zinc-200/40 rounded-3xl border border-gray-100 gap-2">
      {/* Info del evento */}
      <div className="flex ">
        <div className="px-2">
          <label className="relative flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={item?.is_booked}
              readOnly
              className="
              peer appearance-none w-6 h-6 border-2 border-gray-500 rounded-full
              checked:bg-zinc-900 checked:border-gray-900
              transition-colors duration-200
              focus:outline-none focus:ring-gray-900/50 
            "
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
        <span className="text-gray-800 font-medium uppercase">
          {new Date(item.start).toLocaleTimeString("es-AR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>    
    </li>
  );
};

export default SlotItem;
