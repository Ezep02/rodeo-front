import { Button } from "@/components/ui/button";
import { useMyAppointments } from "../../hooks/useBookings";
import { GoArrowUpRight } from "react-icons/go";
import { Ban } from "lucide-react";
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { LuCalendarCheck2, LuClock5 } from "react-icons/lu";
import ViewDetails from "../dialogs/ViewDetails";
import { useContext } from "react";
import { DashboardContext } from "@/context/DashboardContext";

const MyAppointment = () => {
  const { setSelectedBooking } = useContext(DashboardContext)!;
  const { myAppointment } = useMyAppointments();



  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmado":
        return (
          <span className="flex items-center gap-1 bg-green-400 text-zinc-50 p-2 rounded-full">
            <FaCheck size={15} />
          </span>
        );

      case "pendiente_pago":
        return (
          <span className="flex items-center gap-1 bg-yellow-400 text-zinc-50 p-2 rounded-full">
            <LuClock5 size={15} />
          </span>
        );

      case "rechazado":
      case "cancelado":
        return (
          <span className="flex items-center gap-1 bg-rose-400 text-zinc-50 p-2 rounded-full">
            <IoMdClose size={15} />
          </span>
        );

      case "completado":
        return (
          <span className="flex items-center gap-1 bg-blue-400 text-zinc-50 p-2 rounded-full">
            <LuCalendarCheck2 size={15} />
          </span>
        );

      default:
        return (
          <span className="flex items-center gap-1 bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded-md">
            <Ban size={14} />
          </span>
        );
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmado":
        return <span>su cita fue confirmada</span>;

      case "pendiente_pago":
        return <span>pendiente de pago</span>;

      case "rechazado":
      case "cancelado":
        return <span>su cita fue cancelada</span>;

      case "completado":
        return <span>su cita fue completada</span>;

      default:
        return <span>sin registro</span>;
    }
  };

  return (
    <section className="flex flex-col gap-5 pt-6 px-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 tracking-tight">
            Mis turnos
          </h2>
          <p className="text-sm text-zinc-500">
            {myAppointment.length} resultados
          </p>
        </div>

        <Button
          variant="outline"
          className="rounded-full border-zinc-200 text-zinc-700 hover:bg-zinc-100"
        >
          Filtrar por
        </Button>
      </div>

      <div>
        {Array.isArray(myAppointment) && myAppointment.length > 0 ? (
          <ul className="flex flex-col gap-1">
            {myAppointment.map((sch, i) => (
              <li
                className="flex justify-between flex-col md:flex-row gap-2 p-3 bg-zinc-200/25 hover:bg-zinc-200/35 rounded-2xl"
                key={i}
              >
                <div className="flex gap-3 items-center flex-1">
                  <div>
                    <div className="flex items-center">
                      {getStatusIcon(sch.status)}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm text-zinc-800">
                      {new Date(sch.slot.start).toLocaleDateString("es-AR", {
                        day: "numeric",
                        weekday: "long",
                        month: "long",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </span>
                    <span className="text-sm">{getStatusText(sch.status)}</span>
                  </div>
                </div>

                <div>
                  <ViewDetails
                    trigger={
                      <Button
                        variant={"ghost"}
                        className="rounded-full cursor-pointer active:scale-95"
                        onClick={() => setSelectedBooking(sch)}
                      >
                        <GoArrowUpRight size={16} />
                        Ver
                      </Button>
                    }
                    details={sch}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-3 items-center flex-1 flex justify-center pt-10">
            <p>Tu cronograma para el dia de hoy esta vacio</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAppointment;
