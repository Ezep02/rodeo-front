import { useEffect, useState } from "react";
import { getBarberList } from "../services/barbers";
import { Barber } from "../models/Barbers";

const useBarbers = () => {
  const [barberList, setBarberList] = useState<Barber[] | []>();

  useEffect(() => {
    const fetchBarberList = async () => {
      let res = await getBarberList();
      setBarberList(res);
    };

    fetchBarberList();
  }, []);

  return {
    barberList,
  };
};

export default useBarbers;
