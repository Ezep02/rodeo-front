import { Booking } from "@/models/Appointment";
import { useContext, useEffect, useState } from "react";
import {
  getBookingPaymentInfo,
  getMyAppointment,
} from "../services/my_appointments";
import { AuthContext } from "@/context/AuthContext";
import { PaymentInfoResponse } from "../types/Booking";
import { DashboardContext } from "@/context/DashboardContext";

export const useMyAppointments = () => {
  const { user } = useContext(AuthContext)!;

  const [myAppointment, setMyAppointment] = useState<Booking[] | []>([]);

  // cargar el listado inicial de appointments
  useEffect(() => {
    const fetchApptList = async () => {
      if (!user?.id) return "no existe el id";

      try {
        let res = await getMyAppointment(user.id);
        if (res) {
         
          setMyAppointment(res);
        }
      } catch (error) {
        console.warn("Algo no fue bien recuperando los appts", error);
      }
    };

    fetchApptList();
  }, []);

  return {
    myAppointment,
  };
};

export const usePayment = (booking_id?: number) => {
  const { setPaymentInfoMap, paymentInfoMap } = useContext(DashboardContext)!;

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfoResponse>();

  useEffect(() => {
    async function fetchPaymentInfo() {
      if (!booking_id) return;

      // 1. Buscar en chache
      const cached = paymentInfoMap.get(booking_id);
      if (cached) {
        setPaymentInfo(cached);
        return;
      }

      const res = await getBookingPaymentInfo(booking_id);

      if (res) {
        // guardar en el estado local
        setPaymentInfo(res);

        // guardar en el cache
        setPaymentInfoMap((prev) => {
          const updated = new Map(prev);
          updated.set(booking_id, res);
          return updated;
        });
      }
    }

    fetchPaymentInfo();
  }, [booking_id, paymentInfoMap]);

  return {
    paymentInfo,
  };
};