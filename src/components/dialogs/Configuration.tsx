import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { FaArrowLeft } from "react-icons/fa6";
import { Button } from "../ui/button";

import { User, Shield, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import ProfileConfiguration from "../sections/ProfileConfiguration";
import SecurityConfiguracion from "../sections/SecurityConfiguracion";

const Configuration: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "Perfil" | "Seguridad" | "Notificaciones"
  >("Perfil");

  const menuItems: {
    id: "Perfil" | "Seguridad" | "Notificaciones";
    label: string;
    icon: React.ElementType;
  }[] = [
    { id: "Perfil", label: "Perfil", icon: User },
    { id: "Seguridad", label: "Seguridad", icon: Shield },
    { id: "Notificaciones", label: "Notificaciones", icon: Bell },
  ];

  // Funcion render de configuraciones
  function RenderConfiguration(): React.ReactNode {
    switch (activeTab) {
      case "Perfil":
        return <ProfileConfiguration />;
      case "Seguridad":
        return <SecurityConfiguracion />;
      default:
        return <p>Contenido de {activeTab} - En desarrollo</p>;
    }
  }

  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const onMouseLeave = () => setIsDragging(false);
  const onMouseUp = () => setIsDragging(false);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current?.offsetLeft || 0);
    const walk = x - startX;
    if (sliderRef.current) sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          Configuraciones
        </Button>
      </DialogTrigger>

      <DialogContent
        className="
          2xl:max-h-[90vh] 2xl:min-h-[80vh] 2xl:max-w-5xl
          xl:max-h-[90vh] xl:min-h-[80vh] xl:max-w-4xl 
          lg:max-h-[90vh] lg:min-h-[85vh] lg:max-w-3xl
          md:max-h-[95vh] md:min-h-[80vh] md:max-w-2xl  
          max-w-full max-h-full
          w-full h-full 
          p-6 flex flex-col bg-zinc-50 z-50 md:rounded-3xl
          shadow-2xl overflow-hidden overflow-y-scroll"
      >
        <DialogHeader>
          <div className="flex items-start flex-col gap-3">
            <div className="flex items-center gap-4 mb-6">
              <DialogTrigger asChild>
                <button className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition">
                  <FaArrowLeft size={18} className="text-zinc-700" />
                </button>
              </DialogTrigger>

              <div>
                <DialogTitle className="text-lg text-start font-semibold text-zinc-700">
                  Configuraciones
                </DialogTitle>
                <DialogDescription className="text-start">
                  Personaliza tu experiencia con opciones rápidas y fáciles de
                  usar.
                </DialogDescription>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="h-full grid grid-cols-1 lg:grid-cols-2">
          <div
            ref={sliderRef}
            className="flex overflow-x-hidden max-h-10 lg:flex-col md:overflow-visible space-x-4 md:space-x-0 md:space-y-2 scrollbar-hide"
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
          >
            {menuItems.map((item) => {
              const Icon = item.icon;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-full text-left flex-shrink-0 cursor-grab active:cursor-grabbing",
                    activeTab === item.id
                      ? "bg-zinc-900 shadow-md text-zinc-50 hover:bg-zinc-800"
                      : "text-gray-600 hover:bg-white/50"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            <div className="max-w-2xl">
              <h1 className="text-2xl font-semibold text-gray-900 mb-5">
                {activeTab}
              </h1>

              {RenderConfiguration()}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Configuration;
