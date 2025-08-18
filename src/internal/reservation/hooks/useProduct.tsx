import { useEffect, useState } from "react";
import { ProductList } from "../../reservation/services/shop_service";
import { Product } from "../model/Product";

export const useProductShop = () => {
  const [serviceList, setServiceList] = useState<Product[] | []>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Mover el offset de servicios creados por el barbero
  const [servicesOffset, setServicesOffset] = useState(0);

  const sumProductOffset = () => {
    setServicesOffset(servicesOffset + 5);
  };

  // Cargar inicial de productos
  useEffect(() => {
    const FetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await ProductList(servicesOffset);
        if (res.products) {
          setServiceList(res.products);
          sumProductOffset();
        }
      } catch (error) {
        console.warn("Product shop err", error);
      }

      setIsLoading(false);
    };
    FetchProducts();
  }, []);

  return {
    serviceList,
    isLoading,
  };
};
