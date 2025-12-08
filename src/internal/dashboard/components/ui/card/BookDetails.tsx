import React, { useContext, useState } from "react";
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

const TABS = ["Item Details"];

const BookDetails: React.FC = () => {
  const { selectedBooking, setActionOption } = useContext(DashboardContext)!;

  const { paymentInfo } = usePayment(selectedBooking?.id);

  const [activeTab, setActiveTab] = useState("Item Details");

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
      <div className="grid grid-cols-2 gap-8 mb-6">
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
            4517 Washington Ave. Manchester, Kentuc...
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
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

      <div className="border-t border-gray-200">
        {/* Tabs */}
        <div className="px-8 pt-0">
          <div className="flex gap-6 border-b border-gray-200">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-teal-600 text-teal-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Content */}

        {activeTab === "Item " && (
          <div className="px-8 py-6">
            <div className="space-y-6">
              {selectedBooking?.services.map((event, index) => (
                <div key={event.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-gray-400 relative z-10"></div>
                  </div>

                  <div className="flex-1 pt-0.5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-gray-900 font-semibold">
                        {event.service.name}
                      </h3>
                    </div>
                    <p className="text-gray-500 text-sm mb-2">
                      {event.service.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookDetails;
