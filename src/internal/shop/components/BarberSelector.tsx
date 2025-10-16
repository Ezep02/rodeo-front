import useBarbers from "../hooks/useBarbers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BarberInfo } from "../types/BarberInfo";
import React from "react";

type Props = {
  onSelectBarber: (barber: BarberInfo) => void;
  selectedBarber?: BarberInfo | null;
};

const BarberSelector: React.FC<Props> = ({
  onSelectBarber,
  selectedBarber,
}) => {
  const { availableBarbers } = useBarbers();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Barberos disponibles</h2>

      {Array.isArray(availableBarbers) && availableBarbers.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {availableBarbers.map((barber) => {
            const fullName = `${barber?.user?.name || ""} ${
              barber?.user?.surname || ""
            }`.trim();
            const initials = `${barber?.user?.name?.charAt(0) || ""}${
              barber?.user?.surname?.charAt(0) || ""
            }`;
            const isSelected = selectedBarber?.id === barber.id;

            return (
              <div
                key={barber.id || barber.user?.id || fullName}
                onClick={() => onSelectBarber(barber)}
                className={`flex flex-col gap-1 items-center shadow px-4 py-6 rounded-3xl cursor-pointer transition-all duration-200
                  ${
                    isSelected
                      ? "bg-black text-white"
                      : "bg-zinc-300/40 hover:bg-zinc-200"
                  }
                `}
                aria-label={`Barbero ${fullName || "desconocido"}`}
              >
                <Avatar
                  className={`w-20 h-20 border-2 rounded-full overflow-hidden ${
                    isSelected ? "border-white" : ""
                  }`}
                >
                  {barber?.user?.avatar ? (
                    <AvatarImage
                      src={barber.user.avatar}
                      alt={fullName || "Avatar"}
                    />
                  ) : (
                    <AvatarFallback className="uppercase bg-zinc-950 text-zinc-50 font-semibold">
                      {initials || "?"}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="text-center">
                  <span>{barber?.user?.name || "Nombre"}</span>{" "}
                  <span>{barber?.user?.surname || ""}</span>
                </div>
                <Badge>Barbero</Badge>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No hay barberos disponibles</p>
      )}
    </div>
  );
};

export default BarberSelector;
