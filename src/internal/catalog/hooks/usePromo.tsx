import { useCallback, useContext, useEffect, useState } from "react";

import { getPromotionById } from "../services/promotions";
import { CatalogContext } from "@/context/CatalogContext";

const usePromo = (serviceId?: number) => {
  const {
    setPromotionList,
    promotionList,
  } = useContext(CatalogContext)!;

  const [page, setPage] = useState<number>(0);


  const [isPromoLoading, setPromoIsLoading] = useState<boolean>(false)

  const fetchPromotions = useCallback(async () => {
    if (!serviceId) return;
    setPromoIsLoading(true);
    setPage(0);

    try {
      const data = await getPromotionById(page, serviceId);
      data.length > 0 ? setPromotionList(data) : setPromotionList([])
    } catch (error) {
      console.error("Error fetching promotions", error);
    } finally {
      setPromoIsLoading(false);
    }
  }, [serviceId]);
  
  useEffect(() => {
    fetchPromotions();
  }, [fetchPromotions]);

  // Carga las promociones si es que no hay, pero deben no estar cacheados previamente
  //   useEffect(() => {
  //     const fetchPromoList = async () => {
  //       // Obtener nuevos datos desde la API
  //       const response = await getPromotionList(currentPromoOffset);
  //       if (response.length > 0) {
  //         console.info("Promo list", response);
  //         setPromotionList(response);

  //         sumPromoOffset();
  //       }
  //     };
  //     fetchPromoList();
  //   }, []);

  return {
    promotionList,
    isPromoLoading
  };
};

export default usePromo;
