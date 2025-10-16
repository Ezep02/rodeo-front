import { useEffect, useState } from "react";

import { Service } from "@/types/ServiceTypes";
import { GetServiceInfo } from "@/service/services";

const useServiceInfo = (serviceId: number) => {
  const [serviceInfo, setServiceInfo] = useState<Service>();

  // Recuperar la informacion del servicio
  useEffect(() => {
    const fetchServiceInfo = async () => {
      try {
        if (!serviceId)
          return "Algo no fue bien recuperando el ID del servicio";
        let info = await GetServiceInfo(serviceId);
        if (info) {
          setServiceInfo(info);
        }
      } catch (error) {
        console.warn("[DEBUG] error", error);
      }
    };

    fetchServiceInfo();
  }, [serviceId]);

  //

  return {
    serviceInfo,
  };
};

export default useServiceInfo;
