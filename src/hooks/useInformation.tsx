import { Stats } from "@/internal/landing/models/Information";
import { GetInformation } from "@/internal/landing/services/information_service";
import { useEffect, useState } from "react";

const useInformation = () => {
  const [info, setInfo] = useState<Stats>();

  useEffect(() => {
    const fetchInformation = async () => {
      try {
        let res = await GetInformation();
        if (res) {
          setInfo(res);
        }
      } catch (error) {
        console.warn("ERROR recuperando informacion");
      }
    };

    fetchInformation();
  }, []);

  return {
    info,
  };
};

export default useInformation;
