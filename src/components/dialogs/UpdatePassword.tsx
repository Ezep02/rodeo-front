import React, {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
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
import { RiMailSendLine } from "react-icons/ri";
import { SendResetInstruction } from "@/service/user_info";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";

type DialogProps = {
  email?: string;
};

type FormValues = {
  email: string;
};

const SendPasswordReminder: React.FC<DialogProps> = ({ email }) => {
  const [open, setOpen] = useState(false);
  const [showError, setShowError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: email || "",
    },
  });

  const [submitErr, sendEmailAction, isPending] = useActionState(
    async (_state: void | undefined, payload: unknown) => {
      const formEmail = payload as string;
      try {
        await SendResetInstruction(formEmail);
        setOpen(false);
      } catch (err: any) {
        setShowError(true);
        return err?.response?.data?.error || "Error enviando email";
      }
    },
    undefined
  );

  const onSubmit = (data: FormValues) => {
    const finalEmail = email || data.email;

    if (!finalEmail) {
      alert("Por favor ingresa un email válido.");
      return;
    }

    startTransition(() => {
      sendEmailAction(finalEmail);
    });
  };

  // ocultar mensaje de error 
  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showError]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" className="rounded-full">
          Olvide mi contraseña
        </Button>
      </DialogTrigger>

      <DialogContent className="md:max-w-md max-w-sm p-6 rounded-3xl shadow-2xl bg-zinc-50">
        <form>
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
                  {!email
                    ? "Por favor ingresa tu correo electrónico para enviarte las instrucciones."
                    : `Se enviará un email a ${email} con los pasos para restablecer tu contraseña.`}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Input solo si no viene el email */}
          {!email && (
            <div className="mb-4">
              <Input
                type="email"
                placeholder="Ingresa tu email"
                {...register("email", {
                  required: "El email es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Formato de email inválido",
                  },
                })}
                className="mt-2"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}

              {/* Mensaje de error que desaparece */}
              {showError && submitErr && (
                <div className="flex bg-red-500 mt-2 p-2 rounded-md">
                  <span className="text-sm font-medium text-zinc-50">
                    {submitErr}
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <DialogClose asChild>
              <Button variant="ghost" type="button">
                Cancelar
              </Button>
            </DialogClose>

            <Button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isPending}
              className="rounded-full"
            >
              {isPending ? "Enviando..." : "Sí, enviar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SendPasswordReminder;
