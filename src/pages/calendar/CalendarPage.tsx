import CalendarHeaderSection from "@/internal/calendar/components/sections/CalendarHeaderSection";
import CalendarSection from "@/internal/calendar/components/sections/CalendarSection";

const CalendarPage = () => {
  return (
    <div className="p-5 md:p-10">
      <CalendarHeaderSection />
      <CalendarSection />
    </div>
  );
};

export default CalendarPage;
