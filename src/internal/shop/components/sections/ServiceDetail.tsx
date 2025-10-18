import OpenStepper from "../dialogs/OpenStepper";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";


const ServiceDetail = () => {
  const { selectedSlot, serviceInfo } = useContext(ShopContext)!;


  return (
    <div>
      <div className="flex justify-between flex-col gap-3 bg-zinc-900 p-7 shadow-lg rounded-4xl">
        <div className="flex justify-between">
          {/* Saludo y fecha */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold text-gray-200 tracking-tight">
              ¡Excelente elección!
            </h2>
            <p className="text-zinc-300">
              {selectedSlot ? (
                <>
                  {new Date(selectedSlot.start).toLocaleDateString("es-AR", {
                    day: "numeric",
                    month: "long",
                    weekday: "short",
                    hour: "2-digit",
                    minute: "numeric",
                  })}
                </>
              ) : (
                <>Aún no elegiste una fecha.</>
              )}
            </p>
          </div>
          <div>
            <OpenStepper />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          {/* Cantidad de citas */}
          <div className="flex flex-col">
            <h4 className="text-gray-300 text-sm">Detalles del servicio</h4>
            <span className="text-gray-200 font-semibold">
              {serviceInfo?.name}
            </span>
          </div>

          {/* Precio */}
          <div className="flex flex-col">
            <h4 className="text-gray-300 text-sm">Total</h4>
            <span className="text-gray-200 font-semibold">
              ${serviceInfo?.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
