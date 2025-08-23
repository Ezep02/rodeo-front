import React from "react";
import { Button } from "../ui/button";
import { Edit2 } from "lucide-react";

const GeneralConfiguration: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      {/* NOMBRE DE USUARIO */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-zinc-800 font-medium">Nombre de usuario</h3>
        </div>

        <div>
          <span className="text-zinc-700 font-medium ">Ezep02</span>
          <Button size={"icon"} variant={"ghost"} className="rounded-full">
            <Edit2 size={24} />
          </Button>
        </div>
      </div>

      {/* EMAIL */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-zinc-800 font-medium">Email</h3>
        </div>

        <div>
          <span>epereyra443@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default GeneralConfiguration;
