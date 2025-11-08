import { Label } from "@/components/ui/label";
import { AuthContext } from "@/context/AuthContext";
import {
  ChevronRight,
  Cog,
  Download,
  KeyRound,
  Play,
  Tv,
  Users,
  ListX as ListTv,
  Edit2,
} from "lucide-react";
import { useContext } from "react";
import UpdateUserInfo from "../dialogs/UpdateUserInfo";
import { Button } from "@/components/ui/button";

const AccountSummary = () => {
  const { userInfo } = useContext(AuthContext)!;

  const quickLinks = [
    {
      title: "Administrar acceso y dispositivos",
      description: "Gestiona quién accede a tu cuenta",
      icon: Tv,
    },
    {
      title: "Actualizar contraseña",
      description: "Cambia tu contraseña de forma segura",
      icon: KeyRound,
    },
    {
      title: "Editar configuración",
      description: "Idiomas, subtítulos, privacidad y más",
      icon: Cog,
    },
  ];

  //   const stats = [
  //     {
  //       label: "Perfiles activos",
  //       value: "4",
  //       icon: Users,
  //     },
  //     {
  //       label: "Descargas disponibles",
  //       value: "28",
  //       icon: Download,
  //     },
  //     {
  //       label: "Horas vistas este mes",
  //       value: "48.5",
  //       icon: Play,
  //     },
  //     {
  //       label: "En tu lista",
  //       value: "156",
  //       icon: ListTv,
  //     },
  //   ];
  return (
    <div className="space-y-8">
      {/* Account Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Cuenta</h1>
        <p className="text-muted-foreground">Resumen de tu actividad</p>
      </div>

      {/* Basic User Info Section */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold tracking-tight">
              Información personal
            </h2>
          </div>
          <UpdateUserInfo
            user={userInfo}
            trigger={
              <Button
                type="button"
                variant="default"
                className="rounded-full active:scale-95 cursor-pointer"
              >
                <Edit2 size={16} />
                Editar
              </Button>
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="border border-border rounded-sm p-4 bg-white">
            <Label
              htmlFor="name"
              className="text-sm font-medium text-gray-400 w-40"
            >
              Nombre
            </Label>
            <p className="text-sm font-medium text-foreground">
              {userInfo?.name}
            </p>
          </div>

          <div className="border border-border rounded-sm p-4 bg-white">
            <Label
              htmlFor="name"
              className="text-sm font-medium text-gray-400 w-40"
            >
              Apellido
            </Label>
            <p className="text-sm font-medium text-foreground">
              {userInfo?.surname}
            </p>
          </div>

          <div className="border border-border rounded-sm p-4 bg-white">
            <Label
              htmlFor="name"
              className="text-sm font-medium text-gray-400 w-40"
            >
              Email
            </Label>
            <p className="text-sm font-medium text-foreground">
              {userInfo?.email}
            </p>
          </div>

          <div className="border border-border rounded-sm p-4 bg-white">
            <Label
              htmlFor="name"
              className="text-sm font-medium text-gray-400 w-40"
            >
              Telefono
            </Label>
            <p className="text-sm font-medium text-foreground">
              {userInfo?.phone_number}
            </p>
          </div>
        </div>
      </div>

      {/* Account Summary Section */}
      {/* <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="border border-border rounded-sm p-5 bg-white"
            >
              <div className="flex items-start justify-between mb-3">
                <Icon size={20} className="text-foreground" />
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          );
        })}
      </div> */}

      {/* Quick Links Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold tracking-tight">Vínculos rápidos</h2>
        <div className="space-y-2">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <button
                key={index}
                className="w-full flex items-center justify-between p-4 border border-border hover:bg-secondary rounded-sm transition-colors group text-sm"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="p-2 border border-border rounded-sm">
                    <Icon size={18} className="text-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{link.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {link.description}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  size={18}
                  className="text-muted-foreground group-hover:translate-x-0.5 transition-transform"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AccountSummary;
