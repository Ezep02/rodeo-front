import { useContext, useEffect } from "react";
import { barberList } from "../internal/shop/services/barbers_info";
import { DashboardContext } from "@/context/DashboardContext";

const useBarbers = () => {
  const { setAvailableBarbers, availableBarbers } = useContext(DashboardContext)!;

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
