import { DashboardContext } from "@/context/DashboardContext";
import { useContext, useState } from "react";
import { usePayment } from "../hooks/useBookings";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useCountdown } from "../hooks/useCountdown";

const ScheduleInfo = () => {
  const { selectedBooking } = useContext(DashboardContext)!;

  const { paymentInfo } = usePayment(selectedBooking?.id);

  const [redirecting, setRedirecting] = useState(false);
  const handleRedirect = () => {
    if (!paymentInfo?.payment_url) return;
    setRedirecting(true);
    window.location.href = paymentInfo.payment_url;
  };

  const { timeLeft, expired } = useCountdown(selectedBooking?.expires_at || "");

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

      {/* Pending Payment Card */}
      <div className="bg-white rounded-3xl shadow-lg p-6 border border-zinc-100">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-zinc-900 font-semibold text-lg">
            Confirmar tu reserva
          </h2>
          <p className="text-sm text-zinc-600 mt-2">
            <span className="font-medium text-zinc-900">
              {selectedBooking?.client.name}
            </span>
            , completa el pago para finalizar la reserva.
          </p>
        </div>

        {paymentInfo ? (
          <>
            {/* Countdown */}
            <div className="mb-4">
              {!expired && (
                <p className="text-xs text-zinc-500">
                  Esta reserva se liberará si no completas el pago a tiempo.
                </p>
              )}

              {expired && (
                <p className="text-xs text-red-600 font-medium">
                  El tiempo ha expirado. Deberás iniciar una nueva reserva.
                </p>
              )}
            </div>

            {/* CTA Button */}
            <Button
              className="rounded-xl w-full mt-4 active:scale-[0.97] transition font-medium shadow-sm disabled:opacity-60"
              variant="default"
              onClick={handleRedirect}
              disabled={redirecting || expired || timeLeft === ""}
            >
              {redirecting && <Loader2 className="animate-spin mr-2" />}
              {timeLeft && "Confirmar pago"}

              {timeLeft ? (
                <div className="inline-flex items-center rounded-full font-medium">
                  {expired ? "Expirado" : timeLeft}
                </div>
              ) : (
                <div className="inline-flex items-center text-sm text-zinc-500 ml-2">
                  <Loader2 size={16} className="animate-spin mr-1" />
                  Calculando tiempo restante...
                </div>
              )}
            </Button>
          </>
        ) : (
          <p className="text-red-600 text-sm mt-4">
            No se pudo cargar la información del pago.
          </p>
        )}
      </div>
    </div>
  );
};

export default ScheduleInfo;
