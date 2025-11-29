import ErrorAlert from "@/components/alerts/ErrorAlert";
import { Button } from "@/components/ui/button";
import { DashboardContext } from "@/context/DashboardContext";
import { setReschedule } from "@/internal/dashboard/services/my_appointments";
import { RescheduleResponse } from "@/internal/dashboard/types/Booking";
import { Loader2 } from "lucide-react";
import { startTransition, useActionState, useContext, useState } from "react";

const RescheduleCard = () => {
  const { selectedSlot, selectedBooking } = useContext(DashboardContext)!;

  const [rescheduleInfo, setRescheduleInfo] = useState<RescheduleResponse>();
  const [redirecting, setRedirecting] = useState(false);

  // Error alert
  const [showErrAlert, setShowErrorAlert] = useState<boolean>(false)

  const [rescheduleErr, onRescheduleAction, isReschedulePending] =
    useActionState(async () => {
      if (!selectedBooking?.id || !selectedSlot?.id) {
        return "Faltan datos para reprogramar.";
      }

      try {
        const res = await setReschedule(selectedBooking.id, selectedSlot.id);
        setRescheduleInfo(res);
        return null;
      } catch (err: any) {
        setShowErrorAlert(true)
        return err?.response?.data?.error || "Error inesperado";
      }
    }, null);

  const handleRedirect = () => {
    if (!rescheduleInfo?.init_point) return;
    setRedirecting(true);
    window.location.href = rescheduleInfo.init_point;
  };

  const isFree = rescheduleInfo?.free;
  const requiresPayment = rescheduleInfo?.requires_payment;

  return (
    <div className="p-4 rounded-2xl bg-stone-200/45 space-y-4">
      <ErrorAlert
        message={rescheduleErr}
        show={showErrAlert}
        onClose={() => setShowErrorAlert(false)}
      />

      {rescheduleInfo ? (
        <>
          <div className="space-y-1">
            <h2 className="text-zinc-800 font-semibold text-lg">
              {rescheduleInfo.message}
            </h2>

            {isFree && (
              <p className="text-sm text-green-500">Gratis</p>
            )}
          </div>

          {requiresPayment && (
            <Button
              className="rounded-full w-full active:scale-95 transition"
              onClick={handleRedirect}
              disabled={redirecting}
            >
              {redirecting && <Loader2 className="animate-spin" />}
              Confirmar
            </Button>
          )}
        </>
      ) : (
        <>
          <div className="space-y-1">
            <h2 className="text-zinc-800 font-semibold text-lg">
              ¿Querés cambiar el horario?
            </h2>
            <p className="text-sm text-zinc-500">
              Elegí la opción que te resulte más cómoda.
            </p>
          </div>

          <Button
            className="rounded-full w-full active:scale-95 transition"
            onClick={() => startTransition(onRescheduleAction)}
            disabled={isReschedulePending}
          >
            {isReschedulePending && <Loader2 className="animate-spin" />}
            Seleccionar horario
          </Button>
        </>
      )}
    </div>
  );
};

export default RescheduleCard;
