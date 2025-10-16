import React from "react";
import { Service } from "../../../../types/ServiceTypes";
import { Badge } from "@/components/ui/badge";
import { PiEmptyLight } from "react-icons/pi";

type Props = {
  item: Service;
  action: React.ReactNode;
};

const ServiceItem: React.FC<Props> = ({ item, action }) => {
  return (
    <li
      className="
        group
        px-5 py-4 
        rounded-4xl bg-gray-300/30 
        hover:border-gray-300
        transition-all duration-300
        grid grid-cols-1 md:grid-cols-[auto_auto_auto_2fr] gap-4 md:gap-6 
        items-center
    "
    >
      <div className="flex -space-x-2">
        {Array.isArray(item.medias) && item.medias.length > 0 ? (
          <>
            {item.medias.slice(0, 3).map((m, idx) => (
              <img
                key={idx}
                src={m.url}
                alt={`media-${idx}`}
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md hover:scale-110 transition-transform duration-200"
              />
            ))}
            {item.medias.length > 3 && (
              <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xs font-semibold text-gray-700 shadow-md">
                +{item.medias.length - 3}
              </div>
            )}
          </>
        ) : (
          <>
            {item.preview_url ? (
              <img
                key={item.id}
                src={item?.preview_url ?? ""}
                alt={`sin foto`}
                className="w-18 h-18 object-cover rounded-3xl"
              />
            ) : (
              <div className="w-18 h-18 flex justify-center items-center">
                <PiEmptyLight size={20} />
              </div>
            )}
          </>
        )}
      </div>

      {/* Precio + nombre */}
      <div className="flex flex-col">
        <span className="text-gray-900 font-semibold text-base leading-tight">
          {item.name}
        </span>
        <span className="font-bold text-green-500">
          ${item.price.toLocaleString()}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {Array.isArray(item.categories) && item.categories.length > 0 ? (
          item.categories.map((cat) => (
            <Badge
              key={cat.id}
            >
              {cat.name}
            </Badge>
          ))
        ) : (
          <Badge variant="default" className="rounded-lg text-xs font-normal">
            Sin categoría
          </Badge>
        )}
      </div>

      {/* Acción */}
      <div className="flex justify-end items-center">{action}</div>
    </li>
  );
};

export default ServiceItem;
