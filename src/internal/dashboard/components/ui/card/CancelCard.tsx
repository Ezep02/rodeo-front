import { Button } from "@/components/ui/button";
import { useCancel } from "@/internal/dashboard/hooks/useCancel";
import { Loader2 } from "lucide-react";
import { startTransition } from "react";

const CancelCard = () => {
  const {
    isCancelPending,
    onCancelInfo,
    cancelErr,
    isCancelingPending,
    onCancelingAction,
  } = useCancel();

  return (
    <div className="p-4 rounded-2xl bg-stone-200/45 space-y-4">
      {onCancelInfo && (
        <>
          <div className="space-y-1">
            <h2 className="text-zinc-800 font-semibold text-lg">
              {onCancelInfo.message}
            </h2>

            {onCancelInfo.loses_deposit && (
              <p className="text-sm text-red-500">Se perderá la seña</p>
            )}
          </div>

          <Button
            onClick={()=> startTransition(onCancelingAction)}
            className="rounded-full w-full active:scale-95 transition"
            disabled={isCancelPending || onCancelInfo.canceled}
          >
            {isCancelingPending && <Loader2 className="animate-spin" />}
            {onCancelInfo.canceled ? "Cancelación completada" : "Confirmar"}
          </Button>
        </>
      )}
      {cancelErr && <p>{cancelErr}</p>}

      {isCancelPending && (
        <div className="flex flex-col items-center mt-4">
          <div className="w-8 h-8 border-3 border-gray-200 border-t-sky-500 rounded-full animate-spin" />
          <p className="text-xs text-gray-500 mt-2">
            Esto tomará solo un momento...
          </p>
        </div>
      )}
    </div>
  );
};

export default CancelCard;
