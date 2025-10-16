import React from "react";
import ServiceItem from "./common/ServiceItem";
import ViewDetail from "./dialog/ViewDetail";
import { useService } from "../../../hooks/useService";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const ServicesList: React.FC = () => {
  const { serviceList, hasMore, isLoading, SearchMoreServices } = useService();

  return (
    <div className="px-1">
      {Array.isArray(serviceList) && serviceList.length > 0 ? (
        <ul className="flex flex-col gap-1.5">
          {serviceList.map((item) => (
            <ServiceItem
              key={item.id}
              item={item}
              action={
                <div>
                  <ViewDetail item={item} />
                </div>
              }
            />
          ))}

          {/* Loader para infinite scroll */}
          {isLoading && (
            <div className="flex justify-center items-center py-4">
              <Loader2 className="animate-spin w-6 h-6 text-rose-500" />
            </div>
          )}

          {hasMore && (
            <div className="flex justify-center py-5">
              <Button
                onClick={SearchMoreServices}
                size={"sm"}
                variant={"ghost"}
                className="rounded-full cursor-pointer"
              >
                Ver mas
              </Button>
            </div>
          )}

          {/* Mensaje final cuando ya no hay más citas */}
          {!hasMore && !isLoading && (
            <p className="text-center text-gray-500 py-4">
              No hay más servicios   en tu historial
            </p>
          )}
        </ul>
      ) : (
        <div className="p-2">
          <div className="text-center py-8">
            <p className="text-gray-700">No tienes servicios disponibles</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesList;
