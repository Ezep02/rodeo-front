import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import { DashboardContext } from "@/context/DashboardContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PaymentTypes } from "../../../../types/Payment";
import DiscountCoupons from "../DiscountCoupons";

const BookingConfirmation = () => {
  const { serviceInfo } = useContext(ShopContext)!;
  const {
    selectedSlot,
    selectedBarber,
    appliedCoupon,
    setPaymentType,
    paymentType,
  } = useContext(DashboardContext)!;

  let basePrice = serviceInfo?.price ?? 0;

  // Calcular descuento del cupón
  const couponDiscount = appliedCoupon ? appliedCoupon.remaining_amount : 0;

  // Calcular el porcentaje de pago
  const paymentPercentage = paymentType === "total" ? 1 : 0.5;

  // Calcular precio final
  const priceAfterPaymentType = basePrice * paymentPercentage;

  const [finalPrice, setFinalPrice] = useState<number>(priceAfterPaymentType)
  const [priceAfterCoupon, setPriceAfterCoupon] = useState<number>(0)
  const [remainingAmount, setRemaininAmount] = useState<number>(0)

  useEffect(() => {
    const onAppliedCuponChange = () => {

      setFinalPrice(priceAfterPaymentType)

      // 1. Si el cupon es mayor que el precio total
      if(couponDiscount >= priceAfterPaymentType && appliedCoupon?.remaining_amount){
        let remaining_amount = appliedCoupon?.remaining_amount - priceAfterPaymentType
        
        setPriceAfterCoupon(priceAfterPaymentType)
        setRemaininAmount(remaining_amount)

        setFinalPrice(0)
        return
      }


      // 2. Si el cupon es menor que el precio total
       if(couponDiscount < priceAfterPaymentType && appliedCoupon?.remaining_amount){
        let remaining_amount = priceAfterPaymentType - appliedCoupon?.remaining_amount
        
        setPriceAfterCoupon(couponDiscount)
        setRemaininAmount(0)

        setFinalPrice(remaining_amount)
        return
      }
    };

    onAppliedCuponChange();
  }, [appliedCoupon, priceAfterPaymentType]);

  return (
    <div className="">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
          ¡Gracias por elegir nuestros servicios! 🙌
        </h2>
      </div>

      {/* Detalles de la cita */}
      <div className="mb-8 space-y-4">
        <h3 className="text-lg font-semibold">Detalles de tu cita</h3>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Servicio:</span>
          <span className="font-medium"> {serviceInfo?.name}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Fecha y hora:</span>
          <span className="font-medium">
            {selectedSlot?.start
              ? new Date(selectedSlot.start).toLocaleDateString("es", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "No disponible"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Profesional:</span>
          <span className="font-medium">
            {" "}
            {selectedBarber?.name} {selectedBarber?.surname}
          </span>
        </div>
      </div>

      {/* Opciones de pago */}
      <div className="mb-8 space-y-4">
        <h3 className="text-lg font-semibold">Tipo de pago</h3>
        <RadioGroup
          value={paymentType}
          onValueChange={(value) => setPaymentType(value as PaymentTypes)}
          className="space-y-3"
        >
          <div className="flex items-center space-x-3 rounded-2xl border p-4 transition-colors hover:bg-muted/50">
            <RadioGroupItem value="total" id="total" />
            <Label htmlFor="total" className="flex-1 cursor-pointer">
              <div className="font-medium">Pago total (100%)</div>
              <div className="text-sm text-muted-foreground">
                Pagar el monto completo ahora
              </div>
            </Label>
            <div className="text-lg font-bold">
              ${basePrice?.toLocaleString()}
            </div>
          </div>

          <div className="flex items-center space-x-3 rounded-2xl border p-4 transition-colors hover:bg-muted/50">
            <RadioGroupItem value="parcial" id="parcial" />
            <Label htmlFor="parcial" className="flex-1 cursor-pointer">
              <div className="font-medium">Pago parcial (50%)</div>
              <div className="text-sm text-muted-foreground">
                Pagar el 50% ahora, el resto después
              </div>
            </Label>
            <div className="text-lg font-bold">
              ${(basePrice * 0.5).toLocaleString()}
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Cupones de descuento */}
      <DiscountCoupons />

      {/* Resumen de precio */}
      <div className="mb-8 space-y-3 rounded-lg bg-muted/80 p-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Precio base:</span>
          <span>${basePrice.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Tipo de pago ({paymentType === "total" ? "100%" : "50%"}):
          </span>
          <span>${priceAfterPaymentType.toLocaleString()}</span>
        </div>

        {appliedCoupon && (
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-green-600">
              <span>Descuento:</span>
              <span>-${priceAfterCoupon.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-sm text-green-600">
              <span>Saldo restante:</span>
              <span>${remainingAmount.toLocaleString()}</span>
            </div>
          </div>
        )}

        <div className="border-t pt-3">
          <div className="flex justify-between">
            <span className="font-semibold">Precio final:</span>
            <span className="text-2xl font-bold text-green-600">
              ${Math.round(finalPrice).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
