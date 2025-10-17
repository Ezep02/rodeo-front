import React, { useContext } from "react";
import { CheckCircle2, CreditCard, Banknote } from "lucide-react";
import { PaymentOption } from "../../types/Preference";
import { ShopContext } from "../../context/ShopContext";

// Tipado de los métodos de pago disponibles

interface PaymentOptionData {
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const PaymentMethod: React.FC = () => {
  const { selectedPaymentMethod, setPaymentMethod } = useContext(ShopContext)!;

  const handleSelect = (method: PaymentOption) => {
    setPaymentMethod(method)
  }

  // Datos de cada opción
  const getOptionData = (method: PaymentOption): PaymentOptionData => {
    switch (method) {
      case "mercado_pago":
        return {
          label: "Mercado Pago",
          description: "Pago inmediato con tarjeta o saldo",
          icon: (
            <div className="bg-blue-500 text-white p-2 rounded-lg">
              <CreditCard size={20} />
            </div>
          ),
          color: "blue",
        };
      case "transferencia":
        return {
          label: "Transferencia bancaria",
          description: "Paga con alias o CBU y envía comprobante",
          icon: (
            <div className="bg-green-500 text-white p-2 rounded-lg">
              <Banknote size={20} />
            </div>
          ),
          color: "green",
        };
    }
  };

  // Renderizado de una tarjeta de método de pago
  const renderOption = (method: PaymentOption) => {
    const data = getOptionData(method);
    const isSelected = selectedPaymentMethod === method;

    return (
      <div
        key={method}
        onClick={() => handleSelect(method)}
        className={`flex items-center justify-between border rounded-xl p-4 cursor-pointer transition
          ${
            isSelected
              ? `border-${data.color}-500 bg-${data.color}-50`
              : "border-gray-200 hover:border-blue-300"
          }`}
      >
        <div className="flex items-center gap-3">
          {data.icon}
          <div>
            <p className="text-gray-800 font-medium">{data.label}</p>
            <p className="text-sm text-gray-500">{data.description}</p>
          </div>
        </div>
        {isSelected && (
          <CheckCircle2 className={`text-${data.color}-500`} size={22} />
        )}
      </div>
    );
  };

  return (
    <div className="">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Métodos de pago
      </h2>

      <div className="flex flex-col gap-4">
        {(["mercado_pago", "transferencia"] as PaymentOption[]).map(
          renderOption
        )}
      </div>
    </div>
  );
};

export default PaymentMethod;
