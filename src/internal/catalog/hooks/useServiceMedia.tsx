import { CatalogContext } from "@/context/CatalogContext";
import { useCallback, useContext, useEffect, useState } from "react";
import { getMediaByServiceId } from "../services/media";

const useServiceMedia = (serviceId: number) => {
  const { setServiceMedia, serviceMedia } = useContext(CatalogContext)!;

  const [isMediaLoading, setMediaIsLoading] = useState<boolean>(false);

  const fetchPromotions = useCallback(async () => {
    if (!serviceId) return;
    setMediaIsLoading(true);

    try {
      const data = await getMediaByServiceId(serviceId);
      data.length > 0 ? setServiceMedia(data) : setServiceMedia([]);
    } catch (error) {
      console.error("Error fetching services", error);
    } finally {
      setMediaIsLoading(false);
    }
  }, [serviceId]);

  useEffect(() => {
    fetchPromotions();
  }, [fetchPromotions]);

  return {
    isMediaLoading,
    serviceMedia,
  };
};

export default useServiceMedia;
