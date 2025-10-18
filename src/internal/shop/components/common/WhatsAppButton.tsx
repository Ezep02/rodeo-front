import React from "react";

type Props = {
  name: string;
  orderNumber: number;
  barber_name: string;
  date: Date;
};

const WhatsAppButton: React.FC<Props> = ({
  name,
  barber_name,
  orderNumber,
  date,
}) => {
  const phoneNumber = `${import.meta.env.VITE_WPP_REDIRECT_NUMBER}`; // número de WhatsApp

  const formatedTime = new Date(date).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const message = `Hola, soy ${name}. Te envío el comprobante de pago por 1 turno. Número de pedido: ${orderNumber}. Barbero: ${barber_name} - ${formatedTime} HS.`;

  const whatsappHref = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappHref}
      target="_blank"
      className="inline-flex gap-2 items-center px-4 py-2 bg-gray-800 text-gray-50 rounded-full shadow-sm hover:bg-gray-700 transition-colors text-sm sm:text-base font-medium"
    >
      Enviar comprobante
    </a>
  );
};

export default WhatsAppButton;
