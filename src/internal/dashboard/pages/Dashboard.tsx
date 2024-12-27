import React, { useContext } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";

import ReserveLayout from "../components/layout/ReserveLayout";

import ShowUbication from "../components/common/ShowUbication";
import MakeReservationLayout from "../components/layout/MakeReservationLayout";
import { DashboardContext } from "../../../context/DashboardContext";

const Dashboard: React.FC = () => {
  const { makeReservation} = useContext(DashboardContext)!;

  return (
    <DashboardLayout>
      {/* <section
        className="
          xl:hidden
          col-start-1 col-end-13 row-start-1 row-end-3 
        "
      >
        <div className="h-full w-full flex items-center">
          <h2 className="flex items-center gap-2 text-zinc-200 font-semibold text-2xl">
            Bienvenido,{" "}
            <span className="text-amber-300 font-bold">{user?.name}</span>
          </h2>
        </div>
      </section> */}
      
      <ShowUbication />
    
      <ReserveLayout />
      {
        makeReservation && (
          <MakeReservationLayout/>
        )
      }

    </DashboardLayout>
  );
};

export default Dashboard;
