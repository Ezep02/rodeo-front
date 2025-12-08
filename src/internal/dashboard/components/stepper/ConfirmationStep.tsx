import { useContext } from "react";
import { DashboardContext } from "@/context/DashboardContext";
import RescheduleCard from "../ui/card/RescheduleCard";
import CancelCard from "../ui/card/CancelCard";

const ConfirmationStep: React.FC = () => {
  const { selectedAction } = useContext(DashboardContext)!;

  const Render = () => {
    switch (selectedAction) {
      case "reschedule":
        return <RescheduleCard />;

      case "cancel":
        return <CancelCard/>;
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 pt-6 px-2 sm:px-0">
      <div className="flex flex-col items-center justify-center space-y-4">
        {Render()}
      </div>
    </div>
  );
};

export default ConfirmationStep;
