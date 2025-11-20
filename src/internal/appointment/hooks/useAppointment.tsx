import { useContext, useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";

import { AppointmentContext } from "../context/AppointmentContext";
import { getUpcomingBookings } from "../services/upcoming_appts";
import { getCurrentDay } from "@/utils/getCurrentWeek";

export const useAppointment = () => {
  const { setUpcomingAppointments, upcomingAppointment, status, currentDate } =
    useContext(AppointmentContext)!;

  const { userInfo } = useUser();

  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Cargar historial inicial
  useEffect(() => {
    const fetchUserAppointment = async () => {
      if (!userInfo?.id || isLoading || !hasMore) return;

      const { day } = getCurrentDay(currentDate);

      try {
        setIsLoading(true);
        const res = await getUpcomingBookings(userInfo.id, day, status);
        console.info(res);
        if (res) {
          setUpcomingAppointments(res);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAppointment();
  }, [status, currentDate]);

  // Cargar mas citas al historial
  const SearchMoreAppts = async () => {
    if (!userInfo?.id || isLoading || !hasMore) return;

    try {
      setIsLoading(true);
      const nextPage = page + 5;
      // const response = await GetAppoinments(user.id, nextPage);

      // if (response?.length > 0) {
      //   setCustomerAppointment((prev) => [...prev, ...response]);
      //   setPage(nextPage);
      // } else {
      //   setHasMore(false);
      // }
    } catch (error) {
      console.warn("Error cargando más reseñas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    hasMore,
    upcomingAppointment,
  };
};
