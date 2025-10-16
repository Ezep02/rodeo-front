import React from "react";
import clsx from "clsx"; // opcional, pero útil para combinar clases condicionales

type Props = {
  text?: string;
  stat_content?: number | string;
  inherited_action?: React.ReactElement;
  className?: string; 
};

const InsightCard: React.FC<Props> = ({
  text,
  stat_content,
  inherited_action,
  className,
}) => {
  return (
    <div
      className={clsx(
        "md:p-10 rounded-3xl p-6 md:rounded-4xl bg-zinc-900 flex flex-col gap-1.5 text-start transition-transform duration-300 border-zinc-400",
        className 
      )}
    >
      {/* Etiqueta */}
      <h2 className="text-sm font-medium text-gray-300">{text}</h2>

      {inherited_action ? (
        <div className="flex justify-center items-center">{inherited_action}</div>
      ) : (
        <div className="flex justify-between flex-wrap">
          <p className="text-4xl font-bold text-zinc-50">{stat_content}</p>
        </div>
      )}
    </div>
  );
};

export default InsightCard;
