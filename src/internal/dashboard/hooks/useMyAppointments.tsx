import { Booking } from "@/models/Appointment";
import React, { useContext, useEffect, useState } from "react";
import { getMyAppointment } from "../services/my_appointments";
import { AuthContext } from "@/context/AuthContext";

const useMyAppointments = () => {
  const { user } = useContext(AuthContext)!;

  const [myAppointment, setMyAppointment] = useState<Booking[] | []>([]);
    
  // cargar el listado inicial de appointments
  useEffect(() => {
    const fetchApptList = async () => {
      if (!user?.id) return "no existe el id";

      try {
        let res = await getMyAppointment(user.id);
        if (res) {
          console.info("[MY APPT RES]:", res);
          setMyAppointment(res)
        }
      } catch (error) {
        console.warn("Algo no fue bien recuperando los appts", error)
      }
    };

    fetchApptList();
  }, []);

  return {
    myAppointment,
  };
};

export default useMyAppointments;
