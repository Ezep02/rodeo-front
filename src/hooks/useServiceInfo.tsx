import { useContext, useEffect } from "react";

import { GetServiceInfo } from "@/service/services";
import { ShopContext } from "@/internal/shop/context/ShopContext";

const useServiceInfo = (serviceId?: number) => {

  const {
    setServiceInfo,
    serviceInfo
  } = useContext(ShopContext)!
 
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
