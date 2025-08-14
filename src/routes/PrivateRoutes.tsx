import React, { Suspense, useContext } from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { AdminContextProvider } from "@/context/AdminContext";
import { PanelControlContextProvider } from "@/context/PanelControlContext";
import PanelControlPage from "@/internal/panel-control/pages/PanelControlPage";


const CronogramaPage = React.lazy(() => import("@/internal/barber/pages/CronogramaPage"));
const PrivatePage = React.lazy(() => import("@/internal/analytics/pages/PrivatePage"));


const PrivateRoutes: React.FC = () => {
  const { user } = useContext(AuthContext)!;

  return (
    <Routes>
      <Route path="/cronograma" element={
        <Suspense fallback={
          <div className="h-screen w-full flex justify-center items-center flex-col gap-1">
            <p className="loader"></p>
          </div>
        }>
          <PanelControlContextProvider>
            <CronogramaPage />
          </PanelControlContextProvider>
        </Suspense>
      } />

      <Route path="/panel-control" element={
        <Suspense fallback={
          <div className="h-screen w-full flex justify-center items-center flex-col gap-1">
            <p className="loader"></p>
          </div>
        }>
          <PanelControlContextProvider>
            <PanelControlPage />
          </PanelControlContextProvider>
        </Suspense>
      } />


      {user?.is_admin && (
        <>
          <Route path="/admin" element={
            <Suspense fallback={
              <div className="h-screen w-full flex justify-center items-center flex-col gap-1">
                <p className="loader"></p>
              </div>
            }>
              <AdminContextProvider>
                <PrivatePage />
              </AdminContextProvider>
            </Suspense>
          } />
        </>
      )}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default PrivateRoutes;
