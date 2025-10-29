import { MdCheck } from "react-icons/md";
import useBookingInbox from "../hooks/useBookingInbox";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ConfirmDialog from "./dialogs/ConfirmDialog";
import useInboxAction from "../hooks/useInboxAction";
import ErrorAlert from "@/components/alerts/ErrorAlert";

const BookingInbox = () => {
  const { inboxAppointment } = useBookingInbox();

  const { handleApprove, handleReject, error, isErrorOpen, setErrorOpen } = useInboxAction();

  return (
    <div className="pt-3">
      <ErrorAlert
        message={error}
        show={isErrorOpen}
        onClose={()=> setErrorOpen(false)}
      />

      <div>
        {Array.isArray(inboxAppointment) && inboxAppointment.length > 0 ? (
          <ul className="flex flex-col gap-1">
            {inboxAppointment.map((sch, i) => {
              const time = new Date(sch.slot.start).toLocaleTimeString(
                "es-AR",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                }
              );
              const date = new Date(sch.slot.start).toLocaleDateString(
                "es-AR",
                {
                  day: "numeric",
                  month: "long",
                }
              );

              return (
                <li
                  key={i}
                  className="flex flex-col gap-2 p-3 bg-gray-300/25 hover:bg-zinc-200/40 rounded-3xl border border-gray-100 transition"
                >
                  {/* --- Header con avatar y nombre --- */}
                  <div className="flex items-center gap-3">
                    <Avatar className="w-13 h-13 border-2 rounded-full overflow-hidden">
                      <AvatarImage
                        src={sch?.client?.avatar || undefined}
                        alt="Profile avatar"
                      />
                      <AvatarFallback className="uppercase bg-zinc-950 text-zinc-50 font-semibold">
                        {sch?.client?.name?.charAt(0)}
                        {sch?.client?.surname?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col leading-tight">
                      <span className="text-sm text-zinc-800 font-medium">
                        {sch.client.name} {sch.client.surname}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {date} — {time}
                      </span>
                    </div>
                  </div>

                  {/* --- Mensaje descriptivo --- */}
                  <p className="text-sm text-zinc-700 leading-relaxed px-1">
                    El cliente{" "}
                    <span className="font-medium text-zinc-900">
                      {sch.client.name} {sch.client.surname}
                    </span>{" "}
                    solicitó un turno para el{" "}
                    <span className="font-medium text-zinc-900">
                      {date} a las {time}
                    </span>
                    .
                  </p>

                  {/* --- Acciones --- */}
                  <div className="flex gap-1.5 pt-1">
                    <ConfirmDialog
                      action="accept"
                      onConfirm={() => handleApprove(sch.id)} // tu lógica para aceptar
                      trigger={
                        <Button
                          variant="default"
                          className="rounded-full active:scale-95 cursor-pointer"
                        >
                          <MdCheck size={20} />
                          Aceptar turno
                        </Button>
                      }
                    />
                    <ConfirmDialog
                      action="reject"
                      onConfirm={() => handleReject(sch.id)} // tu lógica para rechazar
                      trigger={
                        <button className="items-center rounded-full px-3 py-1.5 flex gap-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-300 transition cursor-pointer active:scale-95 font-semibold text-sm">
                          Rechazar solicitud
                        </button>
                      }
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="px-3 items-center flex-1 flex justify-center pt-10">
            <p>No hay solicitudes pendientes</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingInbox;
