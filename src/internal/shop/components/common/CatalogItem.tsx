import { Badge } from "@/components/ui/badge";
import { Service } from "@/types/ServiceTypes";
import { useNavigate } from "react-router-dom";

type CatalogItemProps = {
  item: Service;
};

const CatalogItem: React.FC<CatalogItemProps> = ({ item }) => {
  const hasPreview = Boolean(item.preview_url);
  const navigate = useNavigate();
  
  return (
    <div
      className={`relative rounded-3xl hover:shadow-lg hover:cursor-pointer transition overflow-hidden h-80 ${
        hasPreview ? "" : "bg-white flex flex-col"
      }`}
      onClick={() => navigate(`/shop/${item.id}`)}
    >
      {/* Contenedor que usa imagen de fondo si existe, o fondo neutro si no */}
      <div
        className={`relative w-full h-full group`}
        style={
          hasPreview
            ? {
                backgroundImage: `url(${item.preview_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
        aria-label={item.name}
      >
        {/* Imagen accesible para lectores de pantalla */}
        {hasPreview && (
          <img src={item.preview_url!} alt={item.name} className="sr-only" />
        )}

        {/* Overlay oscuro SENCILLO (sin blur) — solo si hay preview */}
        <div
          className={`absolute inset-0 transition-colors duration-200 ${
            hasPreview ? "bg-black/20 group-hover:bg-black/35" : ""
          }`}
        />

        <div className="absolute left-4 right-4 bottom-4 flex flex-col gap-1">
          <h3
            className={`text-2xl font-bold ${
              hasPreview ? "text-white" : "text-zinc-800"
            }`}
          >
            {item.name}
          </h3>

          <div className="">
            <Badge>${item.price}</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogItem;
