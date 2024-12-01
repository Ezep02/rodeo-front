import React, { useContext } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import ShowServicesList from "../components/common/ShowServicesList";
import { DashboardContext } from "../../../context/DashboardContext";

const Dashboard: React.FC = () => {
  const { services } = useContext(DashboardContext)!;

  return (
    <DashboardLayout>
     
      <ShowServicesList srv={services}/>

        



    </DashboardLayout>
  );
};

export default Dashboard;
