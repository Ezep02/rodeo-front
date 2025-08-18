import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { startTransition, useActionState, useEffect, useState } from "react";

import { Preference } from "@/internal/reservation/model/Preference_mp";
import { useUser } from "@/hooks/useUser";
import { Slot } from "@/internal/reservation/model/Slot";
import { CreatePreference } from "@/internal/reservation/services/mp_preference";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import AvailableSlot from "../common/AvailableSlot";
import { Button } from "@/components/ui/button";

import { Product } from "../../model/Product";
import { FaArrowLeft } from "react-icons/fa6";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ScheduleSlider from "@/components/common/ScheduleSlider";
import { useSlots } from "@/hooks/useSlots";
import useCoupon from "../../hooks/useCoupon";
import { Coupon } from "../../model/Coupon";
import SelectCoupon from "./SelectCoupon";
import ErrorAlert from "@/components/alerts/ErrorAlert";
import { c } from "node_modules/framer-motion/dist/types.d-Cjd591yU";

type ReservationStep = "date_time_selection" | "confirmation";

type MakeReservationProps = {
  isDialogOpen: boolean;
  closeBooking: () => void;
  selectedService: Product;
};

const MakeReservation: React.FC<MakeReservationProps> = ({
  isDialogOpen,
  closeBooking,
  selectedService,
}) => {
  const [step, setStep] = useState<ReservationStep>("date_time_selection");
  const { slotDate, filteredSlots, setSlotDate, MoveSlotOffset } = useSlots();
  const { user } = useUser();
  const { activeCoupon } = useCoupon();

  const [selectedTime, setSelectedTime] = useState<Slot | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [paymentPercentage, setPaymentPercentage] = useState("100");
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | undefined>();

  useEffect(() => {
    setSelectedTime(null);
  }, [slotDate]);

  const handleClose = () => {
    setStep("date_time_selection");
    closeBooking();
  };

  const HandlePaymentPercentage = (value: string) => {
    setPaymentPercentage(value);
  };

  const CalculatePaymentPercentage = (
    percentage: string,
    price: number
  ): number => {
    const percent = parseFloat(percentage);
    return isNaN(percent) ? price : (percent / 100) * price;
  };

  // 🔹 Calcula precio final y ahorro
  const getPriceDetails = () => {
    const originalPrice = selectedService.price;
    let finalPrice = originalPrice;
    let totalDiscountPercent = 0;

    if (
      selectedService.promotion_discount &&
      selectedService.promotion_discount > 0
    ) {
      finalPrice = finalPrice * (1 - selectedService.promotion_discount / 100);
      totalDiscountPercent += selectedService.promotion_discount;
    }

    if (
      selectedCoupon?.discount_percentage &&
      selectedCoupon.discount_percentage > 0
    ) {
      finalPrice = finalPrice * (1 - selectedCoupon.discount_percentage / 100);
      totalDiscountPercent += selectedCoupon.discount_percentage;
    }

    const totalSaved = originalPrice - finalPrice;

    return {
      originalPrice,
      finalPrice,
      totalDiscountPercent,
      totalSaved,
    };
  };

  // Manejo de pago y error
  const [showError, setShowError] = useState<boolean>(false);

  const [prefErr, createPrefAction, isPrefLoading] = useActionState(
    async (_state: void | null, req: Preference) => {
      try {
        setLoadingSlots(true);
        const response = await CreatePreference(req);
        window.location.href = response.init_point;
        
      } catch (error: any) {
        console.error("Error creating payment link:", error);
        setShowError(true)
        setLoadingSlots(false);
        return error?.response?.data?.error || "Error creando link de pago";
      }
    },
    null
  );

  const HandlePayment = () => {
    if (!selectedService || !user || !selectedTime) return;

    const slot = filteredSlots.find((s) => s.id === selectedTime.id);

    startTransition(() => {
        createPrefAction({
        customer_name: user.name,
        customer_surname: user.surname,
        date:
            selectedTime.date instanceof Date
            ? selectedTime.date.toISOString()
            : String(selectedTime.date),
        payment_percentage: Number(paymentPercentage),
        products: [selectedService.id],
        slotID: selectedTime.id,
        time: slot?.time ?? "",
        coupon_code: selectedCoupon?.code,
        })
    })
  }


  const isDisabled = (selectedService.promotion_discount && selectedService.promotion_discount > 0) || selectedCoupon;

  const renderStep = () => { const { originalPrice, finalPrice, totalDiscountPercent, totalSaved } = getPriceDetails();

    switch (step) {
      case "date_time_selection":
        return (
          <div className="flex flex-col gap-6">
            <DialogHeader className="pb-4 border-b">
              <div className="flex items-center gap-3 mt-4">
                <button
                  className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition"
                  onClick={handleClose}
                >
                  <FaArrowLeft size={18} className="text-zinc-700" />
                </button>
                <div>
                  <DialogTitle className="text-lg font-semibold text-zinc-700">
                    Selecciona fecha y hora
                  </DialogTitle>
                  <DialogDescription>
                    Elige el día y horario que mejor te convenga.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="grid grid-cols-1 gap-8">
              <div className="col-span-1">
                <ScheduleSlider
                  selectedDate={slotDate}
                  setSelectedDate={setSlotDate}
                  moveApptOffset={MoveSlotOffset}
                  title=""
                  description=""
                />
              </div>

              <div className="col-span-1 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-medium">
                    Horarios disponibles
                  </h4>
                  <Badge className="bg-orange-500 text-white rounded-md px-2 py-0.5 text-xs">
                    Obligatorio
                  </Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-3">
                  {loadingSlots ? (
                    <div className="col-span-full flex justify-center items-center py-6">
                      <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                      <span className="ml-2 text-gray-500 text-sm">
                        Cargando horarios...
                      </span>
                    </div>
                  ) : filteredSlots.length === 0 ? (
                    <p className="col-span-full text-center text-gray-400 text-sm py-6">
                      No hay horarios disponibles para este día.
                    </p>
                  ) : (
                    filteredSlots
                      .filter((slot) => typeof slot.id === "number")
                      .map((slot) => (
                        <AvailableSlot
                          key={slot.id as number}
                          slot={{ ...slot, id: slot.id as number }}
                          isSelected={selectedTime?.id === slot.id}
                          onSelect={setSelectedTime}
                        />
                      ))
                  )}
                </div>
              </div>
            </div>

            <DialogFooter className="mt-6 border-t pt-4">
              <Button variant="outline" onClick={handleClose}>
                Cancelar
              </Button>
              <Button
                onClick={() => setStep("confirmation")}
                disabled={!selectedTime}
              >
                Continuar
              </Button>
            </DialogFooter>
          </div>
        );

      case "confirmation":
        return (
          <div className="flex flex-col gap-6">
            <DialogHeader className="pb-4 border-b">
              <div className="flex items-center gap-3 mt-4">
                <button
                  className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition"
                  onClick={() => setStep("date_time_selection")}
                >
                  <FaArrowLeft size={18} className="text-zinc-700" />
                </button>
                <div>
                  <DialogTitle className="text-lg font-semibold text-zinc-700 text-start">
                    Confirma tu reserva
                  </DialogTitle>
                  <DialogDescription className="text-start">
                    Revisa los detalles y completa tu información.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="grid grid-cols-1 gap-8">
              <div className="p-6">
                <h2 className="text-base font-semibold mb-4">
                  Resumen de la reserva
                </h2>
                <br className="mb-4" />
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Servicio:</span>
                    <span className="font-medium">
                      {selectedService?.name ?? "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Fecha:</span>
                    <span className="font-medium">
                      {slotDate ? new Date(slotDate).toLocaleDateString() : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Hora:</span>
                    <span className="font-medium">
                      {selectedTime?.time ?? "-"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">¿Aplicar seña?</span>
                    <Select
                      value={paymentPercentage}
                      onValueChange={HandlePaymentPercentage}
                    >
                      <SelectTrigger className="w-[100px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent defaultValue={isDisabled && 100}>
                        <SelectItem value="100">No</SelectItem>
                        <SelectItem value="50" disabled={!!isDisabled}>
                          Sí
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    {Array.isArray(activeCoupon) && activeCoupon.length > 0 && (
                      <div className="space-y-2">
                        {selectedCoupon ? (
                          <div className="flex justify-between">
                            <span className="text-gray-500">
                              Código seleccionado:
                            </span>
                            <span className="font-medium text-zinc-800">
                              {selectedCoupon.code}
                            </span>
                          </div>
                        ) : (
                          <>
                            <span className="block text-zinc-700">
                              {user?.name}, al parecer tienes cupones
                              disponibles para usar.
                            </span>
                            <SelectCoupon
                              couponList={activeCoupon}
                              selectCoupon={setSelectedCoupon}
                            />
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <br className="my-4" />
                <div className="flex justify-between items-center text-base">
                  <span className="font-semibold">Total:</span>
                  <div className="text-right">
                    {paymentPercentage === "50" ? (
                      <>
                        <span className="line-through text-gray-400 text-sm block">
                          ${originalPrice.toFixed(2)}
                        </span>
                        <span className="text-green-600 font-semibold">
                          $
                          {CalculatePaymentPercentage(
                            paymentPercentage,
                            finalPrice
                          ).toFixed(2)}
                        </span>
                        {((selectedService.promotion_discount ?? 0) > 0 ||
                          selectedCoupon) && (
                          <p className="text-xs text-emerald-600 font-semibold mt-1">
                            Ahorra ${totalSaved.toFixed(2)} (
                            {totalDiscountPercent}%)
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        {((selectedService.promotion_discount ?? 0) > 0 ||
                          selectedCoupon) && (
                          <span className="text-gray-400 line-through block">
                            ${originalPrice.toFixed(2)}
                          </span>
                        )}
                        <span className="text-green-600 font-semibold text-lg">
                          ${finalPrice.toFixed(2)}
                        </span>
                        {((selectedService.promotion_discount ?? 0) > 0 ||
                          selectedCoupon) && (
                          <p className="text-xs text-emerald-600 font-semibold mt-1">
                            Ahorra ${totalSaved} ({totalDiscountPercent}%)
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="mt-6 border-t pt-4">
              <Button
                variant="outline"
                onClick={() => setStep("date_time_selection")}
              >
                Volver
              </Button>
              <Button
                onClick={HandlePayment}
                disabled={isPrefLoading || !selectedTime}
              >
                {isPrefLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-zinc-200 mr-2" />
                    <span className="text-zinc-50 text-sm">Procesando...</span>
                  </>
                ) : (
                  "Confirmar Reserva"
                )}
              </Button>
            </DialogFooter>
          </div>
        );
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleClose}>
      <DialogContent
        className="
                    xl:max-w-2xl xl:max-h-[90vh] xl:min-h-[90vh]
                    md:max-w-xl max-w-sm min-h-[80vh] p-6 rounded-3xl shadow-2xl bg-white
                    overflow-y-auto 
                    px-6 py-4
                "
      >
        <ErrorAlert message={prefErr} show={showError} onClose={() => setShowError(false)} />
        {renderStep()}
      </DialogContent>
    </Dialog>
  );
};

export default MakeReservation;
