import React from "react";

const ActiveCoupons = () => {
  return (
    <div className="flex justify-between flex-col gap-3 p-7 shadow-sm rounded-4xl">
      {/* Saludo y fecha */}
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold text-gray-200 tracking-tight">
          {} <span className="">{},</span>
        </h2>
        <p className="text-zinc-300">{}</p>
      </div>
      {/* Cantidad de citas */}
      <div className="flex flex-col ">
        <h4 className="text-gray-600 text-sm">Tus cupones activos</h4>
        <span className="text-zinc-600 font-extrabold text-3xl">
          6
        </span>
      </div>
    </div>
  );
};

export default ActiveCoupons;
