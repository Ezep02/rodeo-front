import { useContext, useEffect } from "react";
import { barberList } from "../services/barbers_info";
import { CatalogContext } from "@/context/CatalogContext";

const useBarbers = () => {
  const { setAvailableBarbers, availableBarbers } = useContext(CatalogContext)!;

  useEffect(() => {
    const fetchBarberList = async () => {
      let res = await barberList();
      if (res) {
        setAvailableBarbers(res);
      }
    };

    fetchBarberList();
  }, []);

  return {
    availableBarbers,
  };
};

export default useBarbers;
