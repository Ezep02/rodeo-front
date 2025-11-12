import React from "react";

type Props = {
  userName: string;
};

const GreetingCard: React.FC<Props> = ({ userName }) => {
  const hours = new Date().getHours();
  const greeting =
    hours < 12
      ? "¡Buen día!"
      : hours < 18
      ? "¡Buenas tardes!"
      : "¡Buenas noches!";

  const today = new Date().toLocaleDateString("es-AR", {
    day: "numeric",
    weekday: "long",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex justify-between flex-col gap-3 bg-zinc-900 p-7 shadow-lg rounded-4xl">
      {/* Saludo y fecha */}
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold text-gray-200 tracking-tight">
          {greeting} <span className="">{userName},</span>
        </h2>
        <p className="text-zinc-300">{today}</p>
      </div>

      {/* Cantidad de citas */}
      <div className="flex flex-col ">
        <h4 className="text-gray-300 text-sm">Hoy tienes</h4>
        <span className="text-zinc-50 font-extrabold text-2xl">
          No tienes citas
        </span>
      </div>
    </div>
  );
};

export default GreetingCard;
