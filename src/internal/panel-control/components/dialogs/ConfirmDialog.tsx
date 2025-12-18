import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  action: "accept" | "reject";
  onConfirm: () => void;
  trigger: React.ReactNode;
};

const ConfirmDialog: React.FC<Props> = ({ action, onConfirm, trigger }) => {
  const [open, setOpen] = useState(false);


  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent
        className="
        sm:max-h-[20vh] sm:max-w-sm
        max-w-[90vw] min-h-[22vh]
        p-6 flex flex-col bg-zinc-50 rounded-4xl
        shadow-2xl overflow-hidden
      "
      >
        <DialogHeader>
          <DialogTitle className="text-lg text-zinc-800 font-semibold text-start">
            {action === "accept"
              ? "¿Confirmar este turno?"
              : "¿Rechazar esta solicitud?"}
          </DialogTitle>

          <DialogDescription className="text-sm text-zinc-600 leading-relaxed text-start">
            {action === "accept"
              ? "Al confirmar, el turno quedará reservado para el cliente. Podrás gestionarlo desde la agenda."
              : "Si rechazás la solicitud, el cliente será notificado y el turno se cancelará de forma definitiva."}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-end pt-5 flex-row gap-1">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="rounded-full active:scale-95 cursor-pointer"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            className="rounded-full active:scale-95 cursor-pointer"
          >
            {action === "accept" ? "Sí, confirmar turno" : "Sí, rechazar turno"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
