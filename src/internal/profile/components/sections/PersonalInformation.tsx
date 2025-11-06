import React, { useContext } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Camera, Edit2 } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";

import UpdateUserInfo from "../dialogs/UpdateUserInfo";
import { GiBullHorns } from "react-icons/gi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UpdateAvatar from "../dialogs/UpdateAvatar";

const PersonalInformation: React.FC = () => {
  const { userInfo } = useContext(AuthContext)!;

  return (
    <section className="space-y-6 rounded-3xl bg-zinc-200/25">
      {/* PICTURE */}
      <div className="flex flex-1 bg-zinc-900 min-h-[25vh] relative rounded-t-3xl">
        <div className="flex items-center justify-center gap-2 w-full">
          <GiBullHorns size={34} className="text-zinc-100" />
        </div>

        {/* Avatar con icono de edición */}
        <div className="absolute -bottom-14 left-7">
          <div className="relative w-40 h-40">
            <Avatar className="w-40 h-40 border rounded-full overflow-hidden">
              <AvatarImage
                src={userInfo?.avatar || undefined}
                alt="Profile avatar"
              />
              <AvatarFallback className="uppercase bg-transparent text-zinc-50 text-sm">
                {userInfo?.name?.charAt(0)}
                {userInfo?.surname?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            {/* Botón de editar */}
            <div className="absolute bottom-2 right-2">
              <UpdateAvatar avatar={userInfo?.avatar ?? ""}/>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5 px-3 pb-3">
        <div className="flex justify-end">
          <UpdateUserInfo
            user={userInfo}
            trigger={
              <Button
                type="button"
                variant="default"
                size="icon"
                className="rounded-full active:scale-95 cursor-pointer"
              >
                <Edit2 size={16} />
              </Button>
            }
          />
        </div>

        {/* Encabezado */}
        <div className="flex justify-between items-start flex-col gap-3">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              Información Personal
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Actualiza tu información personal y de contacto.
            </p>
          </div>
        </div>

        {/* Formulario */}
        <div className="space-y-6 mt-8">
          {/* Nombre */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <Label
              htmlFor="name"
              className="text-sm font-medium text-gray-400 w-40"
            >
              Nombre
            </Label>

            <span className="text-gray-500">{userInfo?.name}</span>
          </div>

          {/* Apellido */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <Label
              htmlFor="surname"
              className="text-sm font-medium text-gray-400 w-40"
            >
              Apellido
            </Label>

            <span className="text-gray-500">{userInfo?.surname}</span>
          </div>

          {/* Email */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-400 w-40"
            >
              Email
            </Label>

            <span className="text-gray-500">{userInfo?.email}</span>
          </div>

          {/* Teléfono */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <Label
              htmlFor="phone_number"
              className="text-sm font-medium text-gray-400 w-40"
            >
              Teléfono
            </Label>

            <span className="text-gray-500">
              {userInfo?.phone_number || "No registrado"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalInformation;
