import { DashboardContext } from "@/context/DashboardContext";
import {
  startTransition,
  useActionState,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  getCancelationPreview,
  startCancelation,
} from "../services/my_appointments";
import { CancelResponse } from "../types/Booking";

export const useCancel = () => {
  const { selectedBooking } = useContext(DashboardContext)!;

  const [onCancelInfo, setOnCancelInfo] = useState<CancelResponse>();

  const [cancelErr, onCancelAction, isCancelPending] = useActionState(
    async () => {
      if (!selectedBooking?.id) {
        return "Faltan datos para reprogramar.";
      }

      try {
        const res = await getCancelationPreview(selectedBooking.id);
        if (res) {
          setOnCancelInfo(res);
        }
        return null;
      } catch (err: any) {
        return err?.response?.data?.error || "Error inesperado";
      }
    },
    null
  );

  useEffect(() => {
    function lookingForInfo() {
      startTransition(() => {
        onCancelAction();
      });
    }

    lookingForInfo();
  }, [selectedBooking?.id]);

  const [cancelingErr, onCancelingAction, isCancelingPending] = useActionState(
    async () => {
      if (!selectedBooking?.id) {
        return "Faltan datos para reprogramar.";
      }

      try {
        const res = await startCancelation(selectedBooking.id);
        if (res) {
          setOnCancelInfo(res);
        }
        return null;
      } catch (err: any) {
        return err?.response?.data?.error || "Error inesperado";
      }
    },
    null
  );

  return {
    cancelErr,
    isCancelPending,
    onCancelInfo,
    cancelingErr,
    onCancelingAction,
    isCancelingPending,
  };
};
