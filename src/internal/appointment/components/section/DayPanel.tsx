import { Button } from "@/components/ui/button";
import { Check, CheckCircle2, Clock, DollarSign } from "lucide-react";
import React, { useContext } from "react";
import { AppointmentContext } from "../../context/AppointmentContext";

const DayPanel = () => {
  const { upcomingAppointment } = useContext(AppointmentContext)!;

 
  return (
    <section className="rounded-4xl border p-6 bg-zinc-200/50 text-gray-500 flex flex-col min-h-[50vh]">
        Próximamente
    </section>
  );
};

export default DayPanel;
