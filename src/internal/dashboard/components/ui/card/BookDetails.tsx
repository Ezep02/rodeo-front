import React, { useContext, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  getBookingStatus,
  getPaymentStatusByType,
} from "@/utils/getAppointmentStatus";
import { Button } from "@/components/ui/button";
import { Loader2, MoreHorizontal } from "lucide-react";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { DashboardContext } from "@/context/DashboardContext";
import { usePayment } from "@/internal/dashboard/hooks/useBookings";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCountdown } from "@/internal/dashboard/hooks/useCountdown";

const TABS = ["Order History", "Item Details", "Courier", "Receiver"];

const TIMELINE_EVENTS = [
  {
    id: 1,
    title: "Product Shipped",
    timestamp: "13/09/2023 5:23 pm",
    details:
      "Courier Service: UPS, R. Gosling\nEstimated Delivery Date: 15/09/2023",
    hasLink: true,
  },
  {
    id: 2,
    title: "Product Packaging",
    timestamp: "13/09/2023 4:13 pm",
    details: "Tracking number: 3409-4934-4253\nWarehouse: Apple Spot 13b",
    hasLink: true,
  },
  {
    id: 3,
    title: "Order Confirmed",
    timestamp: "13/09/2023 3:53 pm",
    details: "",
  },
  {
    id: 4,
    title: "Order Placed",
    timestamp: "13/09/2023 3:43 pm",
    details: "",
  },
];

const BookDetails: React.FC = () => {
  const { selectedBooking, setActionOption } = useContext(DashboardContext)!;

  const { paymentInfo } = usePayment(selectedBooking?.id);

  const [activeTab, setActiveTab] = useState("Order History");

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


  // Redireccion para terminar de completar el pago
  const [redirecting, setRedirecting] = useState(false);
  const handleRedirect = () => {
    if (!paymentInfo?.payment_url) return;
    setRedirecting(true);
    window.location.href = paymentInfo.payment_url;
  };

  const { timeLeft, expired } = useCountdown(selectedBooking?.expires_at || "");

  const getCtaButton = (): React.ReactNode => {
    switch (expired) {
      case !expired:
        return (
          <Button
            className="rounded-xl w-full mt-4 active:scale-[0.97] transition font-medium shadow-sm disabled:opacity-60"
            variant="default"
            onClick={handleRedirect}
            disabled={redirecting || expired || timeLeft === ""}
          >
            {redirecting && <Loader2 className="animate-spin mr-2" />}
            {timeLeft && "Confirmar pago"}

            {timeLeft ? (
              <div className="inline-flex items-center rounded-full font-medium">
                {expired ? "Expirado" : timeLeft}
              </div>
            ) : (
              <div className="inline-flex items-center text-sm text-zinc-500 ml-2">
                <Loader2 size={16} className="animate-spin mr-1" />
                Calculando tiempo restante...
              </div>
            )}
          </Button>
        );

      default:
        return (
          <Button className="bg-gray-900 text-white hover:bg-gray-800 rounded-full active:scale-95">
            Como llegar
          </Button>
        );
    }
  };

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
        {getCtaButton()}
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

        {activeTab === "Order History" && (
          <div className="px-8 py-6">
            <div className="space-y-6">
              {TIMELINE_EVENTS.map((event, index) => (
                <div key={event.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-gray-400 relative z-10"></div>
                    {index !== TIMELINE_EVENTS.length - 1 && (
                      <div className="w-0.5 h-16 bg-gray-200 mt-2"></div>
                    )}
                  </div>

                  <div className="flex-1 pt-0.5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-gray-900 font-semibold">
                        {event.title}
                      </h3>
                      {event.hasLink && (
                        <a
                          href="#"
                          className="text-teal-600 text-sm font-medium hover:text-teal-700"
                        >
                          See Details
                        </a>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm mb-2">
                      {event.timestamp}
                    </p>
                    {event.details && (
                      <p className="text-gray-700 text-sm whitespace-pre-line">
                        {event.details}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Other Tab Content Placeholder */}
      {activeTab !== "Order History" && (
        <div className="px-8 py-6 text-gray-500">
          {activeTab} content goes here
        </div>
      )}
    </>
  );
};

export default BookDetails;
