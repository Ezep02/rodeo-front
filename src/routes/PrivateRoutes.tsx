import React, { Suspense, useContext } from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { AdminContextProvider } from "@/context/AdminContext";
import { PanelControlContextProvider } from "@/context/PanelControlContext";


const PanelControlPage = React.lazy(() => import("@/internal/panel-control/pages/PanelControlPage"));
const PrivatePage = React.lazy(() => import("@/internal/private/pages/PrivatePage"));


const PrivateRoutes: React.FC = () => {
  const { user } = useContext(AuthContext)!;

  return (
    <Routes>
      <Route path="/barber" element={
        <PanelControlContextProvider>
          <PanelControlPage />
        </PanelControlContextProvider>
      } />
      
      {user?.is_admin && (
        <>
          <Route path="/admin" element={
            <Suspense fallback={
              <div className="h-screen w-full flex justify-center items-center flex-col gap-1">
                <p className="loader"></p>
                <span>sincronizando datos</span>
              </div>
            }>
              <AdminContextProvider >
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
