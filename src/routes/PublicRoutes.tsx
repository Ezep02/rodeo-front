import React, { Suspense } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import PrivateRoutes from "./PrivateRoutes";
import AuthRoutes from "./AuthRoutes";
import { DashboardContextProvider } from "@/context/DashboardContext";
import PaymentLayout from "@/layouts/PaymentLayout";
import { useSession } from "@/hooks/useSession";
import ClientRoutes from "./ClientRoutes";
const PaymentRoutes = React.lazy(() => import("./PaymentRoutes"));

const PublicRoutes = () => {

  const { user } = useSession()

  return (
    <Routes>
      <Route
        path="/*"
        element={
          <DashboardContextProvider>
            <MainLayout>
              <ClientRoutes />
            </MainLayout>
          </DashboardContextProvider>
        }
      />

      <Route
        path="/auth/*"
        element={
          <AuthRoutes />
        }
      />

      <Route
        path="/payment/*"
        element={
          <PaymentLayout>
            <Suspense fallback={
              <div className="h-full w-full flex justify-center items-center">
                <p className="loader"></p>
              </div>
            }>
              <PaymentRoutes />
            </Suspense>
          </PaymentLayout>
        }
      />

      <Route
        path={`/dashboard/panel-control/*`}
        element={
          user?.is_barber ? (
            <Suspense fallback={
              <div className="h-screen w-full flex justify-center items-center flex-col gap-1">
                <p className="loader"></p>
                <span>sincronizando datos</span>
              </div>
            }>
              <MainLayout>
                <PrivateRoutes />
              </MainLayout>
            </Suspense>
          ) : (
            <Outlet />
          )
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default PublicRoutes;
