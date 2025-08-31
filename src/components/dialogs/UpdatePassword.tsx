import React, { startTransition, useActionState, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Edit2 } from "lucide-react";
import { RiMailSendLine } from "react-icons/ri";
import { User } from "@/models/AuthModels";
import { SendResetInstruction } from "@/service/user_info";

type DialogProps = {
  initUserData: User;
};

const SendPasswordReminder: React.FC<DialogProps> = ({ initUserData }) => {
  const [open, setOpen] = useState(false);

  const [_, sendEmailAction, isPending] = useActionState(
    async (_: void | null) => {
      try {
        await SendResetInstruction(initUserData.id, initUserData.email);
        
        setOpen(false);
      } catch (err) {
        console.error("Error enviando email:", err);
      }
    },
    undefined
  );

  const handleSendEmail = () => {
    startTransition(() => {
      sendEmailAction();
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="rounded-full">
          <Edit2 size={24} />
        </Button>
      </DialogTrigger>

      <DialogContent className="md:max-w-md max-w-sm p-6 rounded-3xl shadow-2xl bg-zinc-50">
        <DialogHeader className="mb-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-zinc-900 rounded-xl text-white">
              <RiMailSendLine size={24} />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold text-zinc-700">
                Restablecer contraseña
              </DialogTitle>
              <DialogDescription className="text-zinc-600 text-start">
                Para actualizar tu contraseña, se enviará un email a{" "}
                <span className="font-semibold">{initUserData.email}</span> con
                los pasos para restablecerla.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex justify-end gap-3 pt-4">
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>

          <Button
            onClick={handleSendEmail}
            disabled={isPending}
            className="rounded-full"
          >
            Si, enviar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SendPasswordReminder;

