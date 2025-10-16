import { useEffect, useState } from "react";
import { getServiceStats } from "../../../service/services";
import { ServiceStats } from "../../../types/ServiceTypes";

const useServiceStats = () => {

  const [serviceStats, setServiceStats] = useState<ServiceStats>()

  useEffect(()=> {

    const fetchServiceStats = async () => {

      let res = await getServiceStats()
      if(res){
        setServiceStats(res)
      }
    } 

    fetchServiceStats()

  }, [])

  return {
    serviceStats
  };
};

export default useServiceStats;
