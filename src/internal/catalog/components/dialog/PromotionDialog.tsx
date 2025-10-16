import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Promotion } from "../../../../types/Promotions";
import usePromoAction from "../../hooks/usePromoAction";
import { formatDateForInput } from "../../utils/dateParser";

type PromotionDialogProps = {
  promotion?: Promotion;
  trigger?: React.ReactNode;
  service_id: number;
};

const PromotionDialog: React.FC<PromotionDialogProps> = ({
  promotion,
  trigger,
  service_id,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Promotion>({
    defaultValues: {
      id: promotion?.id,
      discount: promotion?.discount ?? 0,
      type: promotion?.type ?? "percentage",
      start_date: formatDateForInput(promotion?.start_date) ?? "",
      end_date: formatDateForInput(promotion?.end_date) ?? "",
    },
  });

  const handleTypeChange = (val: string) => {
    setValue("type", val as "percentage" | "fixed");
  };

  const {
    onCreatePromoAction,
    createPromoErr,
    isCreatePromoPending,
    onUpdatePromoAction,
    updatePromoErr,
    isUpdatePromoPending,
    isFormOpen,
    toggleFormStatus,
  } = usePromoAction();

  const [isTransitioning, startTransition] = React.useTransition();

  const handleSubmitForm = async (data: Promotion) => {
    startTransition(async () => {
      switch (promotion) {
        case undefined:
          onCreatePromoAction({
            promo: data,
            service_id: service_id,
          });
          break;

        default:
          onUpdatePromoAction(data);
      }
    });
  };

  return (
    <Dialog open={isFormOpen} onOpenChange={toggleFormStatus}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent
        className="
        2xl:max-h-[70vh] 2xl:min-h-[60vh] 2xl:max-w-xl
        xl:max-h-[70vh] xl:min-h-[60vh] xl:max-w-xl 
        lg:max-h-[70vh] lg:min-h-[65vh] lg:max-w-xl
        md:max-h-[70vh] md:min-h-[50vh] md:max-w-xl  
        max-w-full max-h-full
        w-full h-full 
        p-6 flex flex-col bg-zinc-50 z-50 md:rounded-4xl
        shadow-2xl overflow-hidden overflow-y-scroll scroll-hidden
      "
      >
        <DialogHeader>
          <DialogTitle>
            {promotion ? "Editar promoción" : "Crear promoción"}
          </DialogTitle>
          <DialogDescription>
            Completa los campos y guarda los cambios.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="space-y-5 mt-4"
        >
          {/* Descuento */}
          <div>
            <Label htmlFor="discount">Descuento</Label>
            <Input
              id="discount"
              type="number"
              step="0.01"
              {...register("discount", {
                required: "El descuento es obligatorio",
                min: {
                  value: 0,
                  message: "El descuento no puede ser negativo",
                },
                max: {
                  value: 100,
                  message: "El descuento no puede superar 100%",
                },
                valueAsNumber: true,
              })}
              className="mt-1 rounded-xl"
            />
            {errors.discount && (
              <p className="text-sm text-red-500">El descuento es requerido</p>
            )}
          </div>

          {/* Tipo */}
          <div>
            <Label htmlFor="type">Tipo</Label>
            <Select
              defaultValue={promotion?.type ?? "percentage"}
              onValueChange={handleTypeChange}
            >
              <SelectTrigger className="mt-1 rounded-xl">
                <SelectValue placeholder="Selecciona tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Porcentaje</SelectItem>
                <SelectItem value="fixed">Monto fijo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Fecha de inicio */}
          <div>
            <Label htmlFor="start_date">Fecha de inicio</Label>
            <Input
              id="start_date"
              type="date"
              {...register("start_date")}
              className="mt-1 rounded-xl"
            />
          </div>

          {/* Fecha de fin */}
          <div>
            <Label htmlFor="end_date">Fecha de fin</Label>
            <Input
              id="end_date"
              type="date"
              {...register("end_date")}
              className="mt-1 rounded-xl"
            />
          </div>

          {createPromoErr && !promotion && (
            <p style={{ color: "red" }}>{createPromoErr}</p>
          )}
          {updatePromoErr && promotion && (
            <p style={{ color: "red" }}>{updatePromoErr}</p>
          )}

          {/* Botones */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="ghost"
              className="rounded-full active:scale-95 cursor-pointer"
              onClick={toggleFormStatus}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="rounded-full"
              disabled={
                isCreatePromoPending || isUpdatePromoPending || isTransitioning
              }
            >
              {promotion
                ? isUpdatePromoPending
                  ? "Guardando..."
                  : "Guardar cambios"
                : isCreatePromoPending
                ? "Creando..."
                : "Crear promoción"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PromotionDialog;
