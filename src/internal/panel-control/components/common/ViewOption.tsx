import React from "react";
import { motion } from "framer-motion";

type Props = {
  title: string;
  subtitle?: string;
  label: string;
  value: string | number;
};

const ViewOption: React.FC<Props> = ({ title, subtitle, label, value }) => {
  return (
    <motion.div
      className="flex flex-col justify-between gap-3 text-left transition-all duration-300 focus:outline-none w-full px-6"
    >
      {/* Encabezado */}
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-100">
          {title}{" "}
          {subtitle && (
            <span className="text-gray-400 font-normal">{subtitle}</span>
          )}
        </h2>
        <p className="text-zinc-400 text-sm mt-1">{label}</p>
      </div>

      {/* Valor */}
      <div className="flex flex-col mt-2">
        <h4 className="text-gray-400 text-sm">Total</h4>
        <motion.span
          key={value} // fuerza animación cuando cambia el valor
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-zinc-50 font-extrabold text-3xl tracking-tight"
        >
          {value}
        </motion.span>
      </div>
    </motion.div>
  );
};

export default ViewOption;
