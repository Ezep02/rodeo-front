import HeaderSection from "@/internal/dashboard/components/sections/HeaderSection";
import MyAppointment from "@/internal/dashboard/components/sections/MyAppointment";

const OverviewPage = () => {
  
 
  return (
    <div className="px-4 md:p-10 flex flex-col gap-2">
      <HeaderSection />


      <MyAppointment/>
    

      {/*
      <Suspense>
        <JourneyStatSection />
      </Suspense>

      <JourneySection/> */}
    </div>
  );
};

export default OverviewPage;
