import React, { useContext } from "react";
import { Badge } from "@/components/ui/badge";
import {
  getBookingStatus,
  getPaymentStatusByType,
} from "@/utils/getAppointmentStatus";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { DashboardContext } from "@/context/DashboardContext";
import { usePayment } from "@/internal/dashboard/hooks/useBookings";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CtaButton } from "../../common/DetailsDialogCta";

const BookDetails: React.FC = () => {
  const { selectedBooking, setActionOption } = useContext(DashboardContext)!;

  const { paymentInfo } = usePayment(selectedBooking?.id);

  // Calcular el precio final
  const finalPrice = selectedBooking?.services.reduce((accum, currVal) => {
    return accum + currVal.service.price;
  }, 0);

  const paymentStatus = paymentInfo
    ? getPaymentStatusByType(paymentInfo.type)
    : undefined;

  const bookingStatus = selectedBooking?.status
    ? getBookingStatus(selectedBooking?.status)
    : undefined;

  return (
    <>
      <div className="mt-3">
        <DialogTitle className="text-gray-800">Detalles del turno</DialogTitle>
        <DialogDescription>
          Revisá la información y realizá los cambios que necesites.
        </DialogDescription>
      </div>

      {/* Order Details Grid */}
      <div className="grid grid-cols-2 gap-8">
        <div>
          <p className="text-sm text-gray-600 mb-1">Servicio</p>
          <p className="text-gray-900 font-medium">
            {Array.isArray(selectedBooking?.services) &&
              selectedBooking?.services.length > 0 && (
                <>{selectedBooking.services[0].service.name}</>
              )}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">Estado</p>
          <Badge>{bookingStatus?.label}</Badge>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">Hora de inicio</p>
          <p className="text-gray-900 font-medium">
            {selectedBooking?.slot?.start
              ? `${new Date(selectedBooking.slot.start).toLocaleDateString(
                  "es-AR",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hourCycle: "h24",
                    hour12: false,
                  }
                )} HS`
              : "—"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-1">Dirección</p>
          <p className="text-gray-900 font-medium">
            --
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 py-6">
        <CtaButton
          is_payed={selectedBooking?.status === "confirmado"}
          expires_at={
            selectedBooking?.expires_at
              ? new Date(selectedBooking.expires_at)
              : undefined
          }
          payment_url={paymentInfo?.payment_url}
        />
        <Button
          variant="outline"
          className="text-gray-900 border-gray-300 bg-transparent rounded-full active:scale-95"
          onClick={() => setActionOption("reschedule")}
        >
          Reprogramar
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-gray-600">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="rounded-2xl" align="start">
            <DropdownMenuItem>
              <Button
                variant="ghost"
                size={"sm"}
                className="text-gray-900 border-gray-300 bg-transparent rounded-full active:scale-95"
                onClick={() => setActionOption("cancel")}
              >
                Cancelar
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Payment information */}
      <div className="space-y-4">
        <div className="">
          <h3 className="font-semibold text-base text-zinc-900 leading-tight">
            Informacion del pago
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-sm text-gray-600 mb-1">Tipo</p>
            <p className="text-gray-900 font-medium">{paymentStatus?.label}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Metodo</p>
            <p className="text-gray-900 font-medium">{paymentInfo?.method}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Estado</p>
            <p className="text-gray-900 font-medium">{paymentInfo?.status}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">Pagado el</p>
            <p className="text-gray-900 font-medium">
              {paymentInfo?.paid_at
                ? `${new Date(paymentInfo.paid_at).toLocaleDateString("es-AR", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hourCycle: "h24",
                    hour12: false,
                  })} HS`
                : "Aun no se registro"}
            </p>
          </div>
        </div>
      </div>

      {/* Selected services */}
      <div className="">
        <div className="space-y-4">
          <h3 className="font-semibold text-base text-zinc-900 leading-tight">
            Servicios seleccionados
          </h3>

          <ul className="flex flex-col gap-0.5 px-1.5">
            {selectedBooking?.services.map((product) => (
              <li
                key={product.id}
                className="flex items-center justify-between py-3 border-b border-zinc-200 last:border-b-0"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-zinc-800">
                    {product.service.name}
                  </p>
                </div>

                <p className="text-sm font-semibold text-zinc-800">
                  ${product.service.price}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="sticky bottom-0 bg-zinc-200/25 hover:bg-zinc-200/35 rounded-md">
          <div className="flex justify-between items-center py-3 px-1.5">
            <span className="font-semibold text-zinc-900 tracking-tight leading-none">
              Total <span className="text-gray-500">(ARS)</span>
            </span>
            <span className="text-base font-semibold text-zinc-900 leading-none">
              ${finalPrice}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetails;
