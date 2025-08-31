import React, { useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AuthContext } from "@/context/AuthContext";
import { Camera, Mail, Phone, ShieldCheck } from "lucide-react";
import ChangeUserName from "../dialogs/ChangeUserName";
import { Badge } from "../ui/badge";
import PersonalInformation from "./PersonalInformation";
import { UpdateAvatar } from "@/service/user_info";

const ProfileConfiguration: React.FC = () => {
  const { user, setUser } = useContext(AuthContext)!;
 
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
     
      const formData = new FormData();
      formData.append("file", file);
      // Aquí podrías disparar la subida de imagen a tu backend
      try {
        let updateAvatarRes = await UpdateAvatar(formData);
        if(updateAvatarRes){
          setUser((prev) => {
            if (!prev) return prev

            return {
              ...prev,
              avatar: updateAvatarRes.avatar
            }
          })
        }
      } catch (error:any) {
        console.warn("Algo no fue bien actualizando el avatar", error?.response?.data)
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Sección de perfil */}
      <div className="flex items-center gap-6 ">
        {/* Avatar */}
        <div className="relative group">
          <Avatar className="w-20 h-20 border-2 rounded-full overflow-hidden">
            <AvatarImage
              src={user?.avatar || undefined}
              alt="Profile avatar"
            />
            <AvatarFallback className="uppercase bg-zinc-950 text-zinc-50 font-semibold">
              {user?.name?.charAt(0)}
              {user?.surname?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          {/* Botón para cambiar avatar */}
          <label
            htmlFor="avatarUpload"
            className="absolute bottom-0 right-0 p-2 bg-gray-900 rounded-full shadow-md cursor-pointer hover:bg-gray-700 transition-opacity opacity-80 hover:opacity-100"
          >
            <Camera size={16} className="text-white" />
          </label>
          <input
            id="avatarUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        {/* Datos principales */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold text-gray-900">
              {user?.username}
            </span>
            {user && <ChangeUserName initUserData={user} />}
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Mail size={18} className="text-gray-400" />
            <span className="text-sm">{user?.email}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Phone size={18} className="text-gray-400" />
            <span className="text-sm">
              {user?.phone_number || "No registrado"}
            </span>
          </div>
        </div>
      </div>

      {/* Rol del usuario */}
      <div className="flex items-center gap-3">
        <Badge
          variant="secondary"
          className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm font-medium"
        >
          <ShieldCheck size={16} className="text-emerald-500" />
          {user?.is_admin
            ? "Administrador"
            : user?.is_barber
            ? "Barbero"
            : "Cliente"}
        </Badge>
      </div>

      {/* Información personal */}
      {user && <PersonalInformation initUserData={user} />}
    </div>
  );
};

export default ProfileConfiguration;
