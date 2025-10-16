import { useContext, useEffect, useState } from "react";

import { getCategorieList } from "../internal/catalog/services/categories";
import { CatalogContext } from "@/context/CatalogContext";

const useCategories = () => {
  const { setCategorieList, categorieList } = useContext(CatalogContext)!;

  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isCategorieLoading, setCategorieIsLoading] = useState<boolean>(false);

  // Cargar listado de categorias inicial
  useEffect(() => {
    const fetchCategorieList = async () => {
      setPage(0);
      setHasMore(true);
      // Obtener nuevos datos desde la API
      const response = await getCategorieList();
      if (response.length > 0) {
        setCategorieList(response);
        setPage((prev) => prev + 1);
      }
    };
    fetchCategorieList();
  }, []);

  const SearchMoreCategories = async () => {
    if (isCategorieLoading || !hasMore) return;

    try {
      setCategorieIsLoading(true);
      const nextPage = page + 1;

      const res = await getCategorieList();

      if (res?.length > 0) {
        setCategorieList((prev) => [...prev, ...res]);
        setPage(nextPage);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.warn("Error cargando más journeys:", error);
    } finally {
      setCategorieIsLoading(false);
    }
  };

  return {
    categorieList,
    SearchMoreCategories
  };
};

export default useCategories;
