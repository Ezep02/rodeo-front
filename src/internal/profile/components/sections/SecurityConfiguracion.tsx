import React, { useContext } from "react";
import { Label } from "../../../../components/ui/label";
import { AuthContext } from "@/context/AuthContext";
import UpdatePassword from "../dialogs/UpdatePassword";

const SecurityConfiguracion: React.FC = () => {
  const { user } = useContext(AuthContext)!;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 p-4 border rounded-2xl shadow-sm">
        <div className="flex sm:flex-row sm:items-center justify-between gap-3">
          <Label
            htmlFor="password"
            className="text-sm font-semibold text-gray-800"
          >
            Contraseña
          </Label>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-widest">
              **************
            </span>
          </div>
        </div>

        {user?.email ? (
          <div className="flex justify-end">
            <UpdatePassword email={user.email} />
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">
            No se detectó un email asociado. Por favor, verifica tu perfil.
          </p>
        )}
      </div>
    </div>
  );
};

export default SecurityConfiguracion;
