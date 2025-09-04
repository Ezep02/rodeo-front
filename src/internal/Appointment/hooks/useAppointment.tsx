import { useContext, useEffect, useRef, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { GetAppoinments } from "../services/user_appointment_service";
import { DashboardContext } from "@/context/DashboardContext";

export const useAppointment = () => {
  const { user } = useUser();

  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const { setCustomerAppointment, customerAppointment } =
    useContext(DashboardContext)!;

  // Cargar historial inicial
  useEffect(() => {
    const fetchUserAppointment = async () => {
      if (!user?.id || isLoading || !hasMore) return;

      try {
        setIsLoading(true);
        const res = await GetAppoinments(user.id, page);
        if (res.length > 0) {
          setCustomerAppointment(res);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAppointment();
  }, []);

  // Cargar mas citas al historial
  const SearchMoreAppts = async () => {
    if (!user?.id || isLoading || !hasMore) return;

    try {
      setIsLoading(true);
      const nextPage = page + 5;
      const response = await GetAppoinments(user.id, nextPage);

      if (response?.length > 0) {
        setCustomerAppointment((prev) => [...prev, ...response]);
        setPage(nextPage);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.warn("Error cargando más reseñas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !isLoading) {
          SearchMoreAppts(); // Esto imprimirá "hay" en la consola
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.1 }
    );

    observer.observe(loader);

    return () => {
      if (loader) observer.unobserve(loader);
    };
  }, [loaderRef.current, hasMore, isLoading]);

  return {
    customerAppointment,
    isLoading,
    hasMore,
    loaderRef,
  };
};
