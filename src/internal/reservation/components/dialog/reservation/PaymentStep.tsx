import { Button } from "@/components/ui/button";
import { CreatePreference } from "@/internal/dashboard/services/mp_preference";
import { Preference } from "@/internal/reservation/types/Preference";
import SelectCoupon from "@/internal/reservation/components/dialog/SelectCoupon";
import { Loader2 } from "lucide-react";
import React, { useActionState, useState } from "react";

const PaymentStep: React.FC = () => {
  const [showError, setShowError] = useState<boolean>(false);

    const [paymentPercentage, setPaymentPercentage] = useState("100");
    
  const [prefErr, createPrefAction, isPrefLoading] = useActionState(
    async (_state: void | null, req: Preference) => {
      try {
        const response = await CreatePreference(req);
        window.location.href = response.init_point;
      } catch (error: any) {
        console.error("Error creating payment link:", error);
        setShowError(true);

        return error?.response?.data?.error || "Error creando link de pago";
      }
    },
    null
  );

  const HandlePayment = () => {
    // if (!selectedService || !user || !selectedTime) return;
    // const slot = filteredSlots.find((s) => s.id === selectedTime.id);
    // startTransition(() => {
    //   createPrefAction({
    //     customer_name: user.name,
    //     customer_surname: user.surname,
    //     date:
    //       selectedTime.date instanceof Date
    //         ? selectedTime.date.toISOString()
    //         : String(selectedTime.date),
    //     payment_percentage: Number(paymentPercentage), // seña
    //     products: [selectedService.id],
    //     slotID: selectedTime.id,
    //     time: slot?.time ?? "",
    //     coupon_code: selectedCoupon?.code, // cupón
    //   });
    // });
  };

    // Calcula precio final y ahorro
  const getPriceDetails = () => {
    // const originalPrice = selectedService.price;
    // let finalPrice = originalPrice;
    // let totalDiscountPercent = 0;

    // if (
    //   selectedService.promotion_discount &&
    //   selectedService.promotion_discount > 0
    // ) {
    //   finalPrice = finalPrice * (1 - selectedService.promotion_discount / 100);
    //   totalDiscountPercent += selectedService.promotion_discount;
    // }

    // if (
    //   selectedCoupon?.discount_percentage &&
    //   selectedCoupon.discount_percentage > 0
    // ) {
    //   finalPrice = finalPrice * (1 - selectedCoupon.discount_percentage / 100);
    //   totalDiscountPercent += selectedCoupon.discount_percentage;
    // }

    // const totalSaved = originalPrice - finalPrice;

    // return {
    //   originalPrice,
    //   finalPrice,
    //   totalDiscountPercent,
    //   totalSaved,
    // };
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

  return (
    <div>
      <div className="flex flex-col gap-6">
        {/* <DialogHeader className="pb-4 border-b">
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
        </DialogHeader> */}

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
                  {/* {selectedService?.name ?? "-"} */}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Fecha:</span>
                <span className="font-medium">
                  {/* {slotDate ? new Date(slotDate).toLocaleDateString() : "-"} */}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Hora:</span>
                {/* <span className="font-medium">{selectedTime?.time ?? "-"}</span> */}
              </div>
              {/* <div className="flex justify-between items-center">
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
              </div> */}
              <div>
                {/* {Array.isArray(activeCoupon) && activeCoupon.length > 0 && (
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
                          {user?.name}, al parecer tienes cupones disponibles
                          para usar.
                        </span>
                        <SelectCoupon
                          couponList={activeCoupon}
                          selectCoupon={setSelectedCoupon}
                        />
                      </>
                    )}
                  </div>
                )} */}
              </div>
            </div>
            <br className="my-4" />
            <div className="flex justify-between items-center text-base">
              <span className="font-semibold">Total:</span>
              {/* <div className="text-right">
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
                  </div> */}
            </div>
          </div>
        </div>

   
          <Button
            variant="outline"
            
          >
            Volver
          </Button>
          <Button
            onClick={HandlePayment}
            disabled={isPrefLoading}
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
    
      </div>
    </div>
  );
};

export default PaymentStep;
