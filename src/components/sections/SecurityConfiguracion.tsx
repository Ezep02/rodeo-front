import React, { useContext } from "react";
import { Label } from "../ui/label";
import { AuthContext } from "@/context/AuthContext";
import UpdatePassword from "../dialogs/UpdatePassword";

const SecurityConfiguracion: React.FC = () => {

  const { 
    user 
  } = useContext(AuthContext)!;

  return (
    <div className="space-y-6">
      {/* Nombre */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Label
          htmlFor="name"
          className="text-sm font-medium text-gray-700 w-40"
        >
          Contraseña
        </Label>

        <div className="flex items-center gap-1">
          <span className="text-gray-600">**************</span>
          {
            user && <UpdatePassword initUserData={user}/>
          }
        </div>
      </div>
    </div>
  );
};

export default SecurityConfiguracion;
