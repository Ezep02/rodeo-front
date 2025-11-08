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
import PersonalInfoBox from "../common/PersonalInfoBox";

const AccountSummary = () => {
  const { userInfo } = useContext(AuthContext)!;

  const quickLinks = [
    
    {
      title: "Actualizar contraseña",
      description: "Cambia tu contraseña de forma segura",
      icon: KeyRound,
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
    <div className="space-y-8 min-h-[70vh]">
      {/* Account Header */}

      {/* Basic User Info Section */}
      <div className="space-y-2">
        <div>
          <h2 className="font-semibold text-gray-800 tracking-tight">Información personal</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <PersonalInfoBox label={"Nombre"} info_text={userInfo?.name ?? ""} />

          <PersonalInfoBox
            label={"Apellido"}
            info_text={userInfo?.surname ?? ""}
          />

          <PersonalInfoBox label={"Email"} info_text={userInfo?.email ?? ""} />

          <PersonalInfoBox
            label={"Telefono"}
            info_text={userInfo?.phone_number ?? ""}
          />
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
        <h2 className="font-semibold text-gray-800 tracking-tight">Vínculos rápidos</h2>
        <div className="space-y-2">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <button
                key={index}
                className="w-full flex items-center justify-between p-4 border border-border hover:bg-secondary rounded-2xl transition-colors group text-sm"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="p-2 ">
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
