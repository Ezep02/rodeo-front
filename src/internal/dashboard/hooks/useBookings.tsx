import { Booking } from "@/models/Appointment";
import { useContext, useEffect, useState } from "react";
import {
  getBookingPaymentInfo,
  getMyAppointment,
} from "../services/my_appointments";
import { AuthContext } from "@/context/AuthContext";
import { PaymentInfoResponse } from "../types/Booking";

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
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfoResponse>();

  useEffect(() => {
    async function fetchPaymentInfo() {
      if (!booking_id) return;

      let res = await getBookingPaymentInfo(booking_id);
      if (res) {
        setPaymentInfo(res);
      }
    }

    fetchPaymentInfo();
  }, [booking_id]);

  return {
    paymentInfo,
  };
};
