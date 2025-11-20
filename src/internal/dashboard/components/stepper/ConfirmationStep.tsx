import { useContext } from "react";
import { DashboardContext } from "@/context/DashboardContext";
import RescheduleCard from "../ui/card/RescheduleCard";

const ConfirmationStep = () => {
  const { selectedAction } = useContext(DashboardContext)!;

  const Render = () => {
    switch (selectedAction) {
      case "reprogramar":
        return <RescheduleCard />;

      case "cancelar":
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
      {false ? (
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
          {/* --- Render dinámico del método de pago --- */}
          {Render()}
        </div>
      )}
    </div>
  );
};

export default ConfirmationStep;
