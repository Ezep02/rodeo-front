import AmenitieSection from "@/internal/dashboard/components/sections/AmenitieSection";
import HeaderSection from "@/internal/dashboard/components/sections/HeaderSection";
import MyAppointment from "@/internal/dashboard/components/sections/MyAppointment";

const OverviewPage = () => {
  return (
    <div className="flex flex-col gap-2 h-full">
      <HeaderSection />

      <AmenitieSection />

      <MyAppointment />
    </div>
  );
};

export default OverviewPage;
