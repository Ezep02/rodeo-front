import { useContext, useEffect, useState } from "react";


import { getList } from "../service/services";
import { CatalogContext } from "@/context/CatalogContext";

export const useService = () => {
  const { setServiceList, serviceList } = useContext(CatalogContext)!;

  const [page, setPage] = useState<number>(0);

  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Carga los servicios si es que no hay, pero deben no estar cacheados previamente
  useEffect(() => {
    const fetchServiceList = async () => {
      setPage(0);
      setHasMore(true);
      // Obtener nuevos datos desde la API
      const response = await getList(page);
      if (response.length > 0) {
        setServiceList(response);
        setPage((prev) => prev + 1);
      }
    };
    fetchServiceList();
  }, []);


  const SearchMoreServices = async () => {
    if (isLoading || !hasMore) return;

    try {
      setIsLoading(true);
      const nextPage = page + 1;

      const res = await getList(nextPage);

      if (res?.length > 0) {
        setServiceList((prev) => [...prev, ...res]);
        setPage(nextPage);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.warn("Error cargando más journeys:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    serviceList,
    SearchMoreServices,
    hasMore,
    isLoading,
  };
};
