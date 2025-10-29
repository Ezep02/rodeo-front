import { useEffect, useState } from "react";
import { getClientRate, getRevenueRate } from "../services/performance_rate";
import { NewClientRate, RevenueRate } from "../models/Rates";

const usePerformanceRate = () => {
  const [clientRate, setClientRate] = useState<NewClientRate>()
  const [revenueRate, setRevenueRate] = useState<RevenueRate>()

  useEffect(() => {
    const fetchClientRate = async () => {
      let resRate = await getClientRate();
      if (resRate) {
        setClientRate(resRate)
      }
    };

    fetchClientRate();
  }, []);


   useEffect(() => {
    const fetchRevenueRate = async () => {
      let resRate = await getRevenueRate();
      if (resRate) {
        setRevenueRate(resRate)
      }
    };

    fetchRevenueRate();
  }, []);

  


  return {
    clientRate,
    revenueRate
  };
};

export default usePerformanceRate;
