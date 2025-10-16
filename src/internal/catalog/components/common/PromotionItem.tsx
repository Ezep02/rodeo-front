import React from "react";
import { Promotion } from "../../../../types/Promotions";

type Props = {
  item: Promotion;
  actions?: React.ReactNode
};

const PromotionItem: React.FC<Props> = ({ item, actions }) => {
  function ParseDate(date: string): string {
    if (!date) return "--";
    return  new Date(date).toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <li className="p-4 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-2 hover:shadow-md transition-shadow">
      {/* Información principal */}
      <div className="flex flex-col">
        <span className="text-gray-800 font-semibold text-lg">
          {item.type === "percentage"
            ? `${item.discount}% OFF`
            : `$${item.discount} OFF`}
        </span>
        <span className="text-gray-500 text-sm">
          Desde: {ParseDate(item.start_date ?? "")} <br />
          Hasta: {ParseDate(item.end_date ?? "")}
        </span>
      </div>

      {/* ID u otro dato secundario */}
      <div>
        {actions}
      </div>
    </li>
  );
};

export default PromotionItem;
