import { useUser } from "@/hooks/useUser";
import { useContext, useEffect } from "react";
import { statsByBarberID } from "../services/upcoming_appts";
import { AppointmentContext } from "../context/AppointmentContext";

const useAppStats = () => {
  const { setUpcomingStats, upcomingStats } = useContext(AppointmentContext)!;
  const { user } = useUser();

  useEffect(() => {
    if (!user?.id) return;

    const fetchStat = async () => {
      let res = await statsByBarberID(user?.id);
      if (res) {
        setUpcomingStats(res)
      }
    };

    fetchStat();
  }, []);

  return {
    upcomingStats
  };
};

export default useAppStats;
