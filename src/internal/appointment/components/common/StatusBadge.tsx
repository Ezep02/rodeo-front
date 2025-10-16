import React from "react";
import { AppointmentStatus } from "../../types/ApptFilter";
import { FaCheck } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa";

type Props = {
  status: AppointmentStatus;
};

const StatusBadge: React.FC<Props> = ({ status }) => {
  function GetApptStatus() {
    switch (status) {
      case "confirmado":
        return (
          <div className="inline-flex gap-1 items-center py-1.5 px-3 border bg-zinc-50 rounded-3xl text-zinc-800 text-sm">
            <span className="rounded-full p-0.5">
              <FaRegCircle size={12} />
            </span>
            Pendiente
          </div>
        );

      case "completado":
        return (
          <div className="inline-flex gap-1 items-center py-1.5 px-3 border rounded-3xl text-zinc-800 text-sm">
            <span className="bg-zinc-900 rounded-full p-0.5">
              <FaCheck size={11} className="text-zinc-50" />
            </span>
            Completada
          </div>
        );

      case "cancelado":
        break;

      default:
        break;
    }
  }

  return <>{GetApptStatus()}</>;
};

export default StatusBadge;
