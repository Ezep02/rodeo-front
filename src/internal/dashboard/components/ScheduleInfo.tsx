import { DashboardContext } from "@/context/DashboardContext";
import { useContext } from "react";

const ScheduleInfo = () => {
  const { selectedBooking } = useContext(DashboardContext)!;

  return (
    <div className="flex flex-col gap-2.5">
      <div className="bg-white rounded-3xl p-5 shadow">
        <h3 className="font-semibold text-lg mb-3 text-zinc-900">
          Informacion:
        </h3>

        {selectedBooking ? (
          <ul className="text-gray-700 flex flex-col gap-2 text-sm">
            <li>
              • Fecha: {new Date(selectedBooking?.slot.start).toLocaleString()}
            </li>
            <li>
              • Duración:{" "}
              {Math.round(
                (new Date(selectedBooking?.slot.end).getTime() -
                  new Date(selectedBooking?.slot.start).getTime()) /
                  60000
              )}{" "}
              minutos
            </li>
            <li>• Total: ${selectedBooking?.total_amount}</li>
            {selectedBooking?.coupon_code && (
              <li>• Cupón aplicado: {selectedBooking?.coupon_code}</li>
            )}
            {selectedBooking?.discount_amount > 0 && (
              <li>• Descuento: ${selectedBooking?.discount_amount}</li>
            )}

            <li className="mt-2 font-medium text-zinc-900">Servicios:</li>
            {selectedBooking?.services.map((s) => (
              <li key={s.id} className="ml-3">
                • {s.service.name} — ${s.price} x {s.quantity}
              </li>
            ))}
          </ul>
        ) : (
          <p>
            Algo no fue bien recuperando la informacion de la cita seleccionada
          </p>
        )}
      </div>

      {/* About the job */}
      <div className="bg-white rounded-3xl p-5 shadow">
        <h3 className="font-semibold text-lg mb-3 text-zinc-900">
          Informacion extra:
        </h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          At Google, we put our users first. The world is always changing, so we
          need Product Managers who stay focused on delivering product solutions
          that make a meaningful impact.
        </p>
      </div>
    </div>
  );
};

export default ScheduleInfo;
