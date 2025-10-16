import { useContext, useEffect, useState } from "react";
import { GetGoogleCalendarStatus } from "../services/calendar_service";
import { CalendarContext } from "../context/CalendarContext";
import { GetBarberInfo } from "../services/barber_service";
import { AuthContext } from "@/context/AuthContext";

const useCalendarStatus = () => {
  const [isCalendarConnected, setCalendarConnected] = useState<boolean>(false);

  const {
    setBarberInfo,
    barberInfo
  } = useContext(CalendarContext)!

  const {
    user
  } = useContext(AuthContext)!
  // Verificar si el barbero tiene su google calendar conectado correctamente
  useEffect(() => {
    const fetchCalendarSession = async () => {
      let verifySession = await GetGoogleCalendarStatus();
      if (verifySession.calendar_is_active) {
        setCalendarConnected(verifySession.calendar_is_active);
      }
    };

    fetchCalendarSession();
  }, []);

  // Verificar si el barbero tiene un calendario de turnos creado
  useEffect(()=> {
    
    const fetchBarberInfo = async () => {
      if(!user?.id) return

      let barberInfo = await GetBarberInfo(user?.id)
      if(barberInfo){
        setBarberInfo(barberInfo)
      }
    }

    fetchBarberInfo()
  }, [])

  

  return {  
    isCalendarConnected,
    barberInfo
  };
};

export default useCalendarStatus;
