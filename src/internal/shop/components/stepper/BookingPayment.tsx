import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import WhatsAppButton from "../common/WhatsAppButton";
import { AuthContext } from "@/context/AuthContext";
import { DashboardContext } from "@/context/DashboardContext";

const BookingPayment = () => {
  const {
    transactionErr,
    selectedPaymentMethod,
    serviceInfo,
    prefWithAliasPayment,
  } = useContext(ShopContext)!;

  const { selectedBarber, selectedSlot } = useContext(DashboardContext)!;

  const { user } = useContext(AuthContext)!;

  const BookingPaymentRender = () => {
    switch (selectedPaymentMethod) {
      case "transferencia":
        return (
          <div className="flex flex-col gap-4">
            {/* --- Encabezado --- */}
            <div className="flex items-start sm:items-center gap-2">
              <p className="font-semibold text-gray-800 text-base sm:text-lg">
                ¡Estupendo! Solo unos pasos más y tu turno estará confirmado
              </p>
            </div>

            {/* --- Lista de pasos --- */}
            <div className="flex flex-col gap-3">
              <div className="p-3 bg-gray-100 rounded-2xl flex flex-col gap-4">
                {/* --- Instrucciones numeradas --- */}
                <div className="flex flex-col gap-3">
                  {/* Paso 1 */}
                  <div className="flex items-start gap-2">
                    <p className="text-gray-700 text-sm sm:text-base">
                      <span className="font-medium">
                        1. Realizá la transferencia
                      </span>{" "}
                      de{" "}
                      <span className="font-semibold text-gray-900">
                        ${serviceInfo?.price}
                      </span>{" "}
                      al alias{" "}
                      <span className="font-semibold text-gray-900">
                        rodeo.barber
                      </span>
                      .
                    </p>
                  </div>

                  {/* Paso 2 */}
                  <div className="flex items-start gap-2">
                    <p className="text-gray-700 text-sm sm:text-base">
                      2. Luego,{" "}
                      <span className="font-medium">
                        enviá el comprobante por WhatsApp
                      </span>{" "}
                      haciendo click en el botón de abajo. ¡Así confirmamos tu
                      reserva rápidamente!
                    </p>
                  </div>
                </div>

                {/* --- CTA --- */}
                <div className="flex justify-start mt-2">
                  {serviceInfo &&
                  selectedBarber &&
                  selectedSlot &&
                  user &&
                  prefWithAliasPayment ? (
                    <WhatsAppButton
                      barber_name={selectedBarber.name}
                      date={selectedSlot.start}
                      name={`${user.name} ${user.surname}`}
                      orderNumber={prefWithAliasPayment.id}
                    />
                  ) : (
                    <p className="text-red-500 text-sm sm:text-base">
                      No se pudo generar el enlace de WhatsApp porque falta
                      información de la reserva.
                    </p>
                  )}
                </div>
              </div>

              {/* Paso 2 */}
              <div className="flex items-start p-3">
                <p className="text-gray-700 text-sm sm:text-base">
                  Una vez verificado el pago, recibirás la{" "}
                  <span className="font-semibold text-gray-900">
                    confirmación
                  </span>{" "}
                  directamente por WhatsApp. Si el pago no se realiza dentro de{" "}
                  <span className="font-semibold text-red-500">12 horas</span>,
                  el turno se liberará para otra persona.
                </p>
              </div>
            </div>
          </div>
        );

      case "mercado_pago":
        return (
          <div className="flex flex-col items-center gap-3 text-center">
            {/* --- Encabezado --- */}
            <div className="flex flex-col gap-1">
              <p className="font-medium text-gray-800 text-base">
                ¡Estupendo! Solo unos pasos más
              </p>
              <p className="text-gray-600 text-sm">
                Estamos redirigiéndote a{" "}
                <span className="font-medium text-sky-600">Mercado Pago</span>
                ...
              </p>
            </div>

            {/* --- Loader --- */}
            <div className="flex flex-col items-center mt-2">
              <div className="w-8 h-8 border-3 border-gray-200 border-t-sky-500 rounded-full animate-spin" />
              <p className="text-xs text-gray-500 mt-2">
                Esto tomará solo un momento
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 pt-6 px-2 sm:px-0">
      {/* --- Estado general de la transacción --- */}
      {transactionErr ? (
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <img
            src="/undraw_warning.svg"
            alt="Error illustration"
            className="w-40 sm:w-60 mx-auto mb-4"
          />

          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            ¡Ups! Algo no salió como esperábamos 😕
          </h2>

          <p className="text-gray-600 text-sm sm:text-base">
            Tuvimos un problema al generar tu preferencia de pago. <br />
            No te preocupes, podés intentar nuevamente o contactarnos si el
            problema persiste.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4">
          <img
            src="/undraw_confirmed.svg"
            alt="Confirm illustration"
            className="w-40 sm:w-52 mx-auto mb-4"
          />

          {/* --- Render dinámico del método de pago --- */}
          {BookingPaymentRender()}
        </div>
      )}
    </div>
  );
};

export default BookingPayment;
