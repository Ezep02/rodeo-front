import React, {Suspense, useContext, useEffect } from "react";
import { DashboardContext } from "../../../context/DashboardContext";
import useWebSocket from "react-use-websocket";
import { Shift } from "../models/DashboardModels";
import MakeReservationLayout from "../components/layout/MakeReservationLayout";
import DashboardLayout from "../components/layout/DashboardLayout";
import ServicesLayout from "../components/layout/ServicesLayout";

const ServicesList = React.lazy(() => import("../components/common/ServicesList"));

// Lazy loading para componentes grandes
const Dashboard: React.FC = () => {
  const { makeReservation, setBarberSchedules } = useContext(DashboardContext)!;
  const { lastJsonMessage } = useWebSocket<Shift | Shift[]>(`${import.meta.env.VITE_BACKEND_WS_URL}/schedules/updates`);

  useEffect(() => {
    if (lastJsonMessage) {
      if (Array.isArray(lastJsonMessage)) {
        // Procesar múltiples turnos
        setBarberSchedules((prevSchedules) => {
          const updatedSchedules = [...prevSchedules];
          lastJsonMessage.forEach((shift) => {
            const shiftIndex = updatedSchedules.findIndex(
              (sch) => sch.ID === shift.ID
            );
            if (shiftIndex !== -1) {
              updatedSchedules[shiftIndex] = shift;
            } else {
              updatedSchedules.push(shift);
            }
          });
          return updatedSchedules;
        });
      } else {
        // Procesar un único turno
        setBarberSchedules((prevSchedules) => {
          const updatedSchedules = [...prevSchedules];
          const shiftIndex = updatedSchedules.findIndex(
            (sch) => sch.ID === lastJsonMessage.ID
          );
          if (shiftIndex !== -1) {
            updatedSchedules[shiftIndex] = lastJsonMessage;
          } else {
            updatedSchedules.push(lastJsonMessage);
          }
          return updatedSchedules;
        });
      }
    }
  }, [lastJsonMessage]);

  return (
    <DashboardLayout>


        <ServicesLayout>

          <Suspense fallback={
            <div className="h-full w-full flex justify-center items-center">
              <p className="loader"></p>
            </div>
          }>
            <ServicesList/>
          </Suspense>
        
        </ServicesLayout>
    
     
      {makeReservation && <MakeReservationLayout />}
    </DashboardLayout>
  );
};

export default Dashboard;
