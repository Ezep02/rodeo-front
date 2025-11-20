import ErrorAlert from "@/components/alerts/ErrorAlert";
import { Button } from "@/components/ui/button";
import { DashboardContext } from "@/context/DashboardContext";
import { setReschedule } from "@/internal/dashboard/services/my_appointments";
import { Loader2 } from "lucide-react";
import { startTransition, useActionState, useContext, useState } from "react";

const RescheduleCard = () => {
  const { selectedSlot, selectedBooking } = useContext(DashboardContext)!;

  const [showError, setShowError] = useState(false);

  const [rescheduleErr, onRescheduleAction, isReschedulePending] =
    useActionState(async (_: string | null) => {
      // Guard: ensure we have numeric ids before calling the service
      if (!selectedBooking?.id || !selectedSlot?.id) {
        console.warn("Alguno de los ids son undefined");
        return;
      }
      try {
        let res = await setReschedule(selectedBooking.id, selectedSlot.id);
        if (res) {
        }
        return null;
      } catch (error: any) {
        setShowError(true);
        return error?.response?.data?.error || "Error de autenticación";
      }
    }, null);

  // Manejar login
  const handleReschedule = () => {
    startTransition(() => {
      onRescheduleAction();
    });
  };

  // const onRescheduleAction = async () => {
  //   // Guard: ensure we have numeric ids before calling the service
  //   if (!selectedBooking?.id || !selectedSlot?.id) {
  //     console.warn("Alguno de los ids son undefined");
  //     return;
  //   }

  //   try {
  //     let res = await setReschedule(selectedBooking.id, selectedSlot.id);
  //     if (res) {
  //       console.info("[Informacion para reprogramar]", res);
  //     }
  //   } catch (error: any) {
  //     console.warn(
  //       "Algo no fue bien intentando realizar la reprogramacion",
  //       error?.response?.data?.error
  //     );
  //   }
  // };

  return (
    <div className="p-4 rounded-2xl bg-stone-200/45 space-y-4">
      <ErrorAlert
        message={rescheduleErr}
        show={showError}
        onClose={() => setShowError(false)}
      />
      <div className="space-y-1">
        <h2 className="text-zinc-800 font-semibold text-lg">
          ¿Querés cambiar el horario?
        </h2>
        <p className="text-sm text-zinc-500">
          Elegí la opción que te resulte más cómoda y seguimos desde ahí.
        </p>
      </div>

      <Button
        className="rounded-full w-full active:scale-95 transition cursor-pointer"
        onClick={handleReschedule}
        disabled={isReschedulePending}
      >
        {
          isReschedulePending && <Loader2 className="animate-spin" />
        }
        Seleccionar horario
      </Button>
    </div>
  );
};

export default RescheduleCard;
