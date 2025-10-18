import { useContext } from "react";
import { AppointmentContext } from "../context/AppointmentContext";
import { Booking } from "../../../models/Appointment";

const useApptAction = () => {

  const {
    currentDate,
    setCurrentDate,
    setSelectedApp
  } = useContext(AppointmentContext)!


  const GoNextWeek = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);
    setCurrentDate(nextDay);
    
  };

  const GoPrevWeek = () => {
    const prevDay = new Date(currentDate);
    prevDay.setDate(currentDate.getDate() - 1);
    setCurrentDate(prevDay);
  };

  const SelectAppt = (appt: Booking) => {
    if (!appt) return
    setSelectedApp(appt)
  }

  return {
    GoNextWeek,
    GoPrevWeek,
    SelectAppt
  };
};

export default useApptAction;
