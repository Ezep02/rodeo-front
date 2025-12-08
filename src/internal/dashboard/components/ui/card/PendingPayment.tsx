import { Button } from "@/components/ui/button";
import { DashboardContext } from "@/context/DashboardContext";
import { useCountdown } from "@/internal/dashboard/hooks/useCountdown";
import { PaymentInfoResponse } from "@/internal/dashboard/types/Booking";
import { Loader2 } from "lucide-react";
import { useContext, useState } from "react";

type Props = {
  paymentInfo: PaymentInfoResponse
}

const PendingPayment:React.FC<Props> = ({paymentInfo}) => {
  const { selectedBooking } = useContext(DashboardContext)!;

  const [redirecting, setRedirecting] = useState(false);
  const handleRedirect = () => {
    if (!paymentInfo?.payment_url) return;
    setRedirecting(true);
    window.location.href = paymentInfo.payment_url;
  };

  const { timeLeft, expired } = useCountdown(selectedBooking?.expires_at || "");

  return (
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
    </div>
  );
};

export default PendingPayment;
