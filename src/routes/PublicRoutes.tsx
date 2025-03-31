import React, { Suspense } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "@/internal/dashboard/pages/Dashboard";
import MainLayout from "@/layouts/MainLayout";


const PaymentRoutes = React.lazy(() => import("./PaymentRoutes"));
import PrivateRoutes from "./PrivateRoutes";
import { useUser } from "@/hooks/useUser";
import AuthRoutes from "./AuthRoutes";

const PublicRoutes = () => {

  const { user } = useUser()

  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
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
          <MainLayout>
            <Suspense fallback={
              <div className="h-full w-full flex justify-center items-center">
                <p className="loader"></p>
              </div>
            }>
              <PaymentRoutes />
            </Suspense>
          </MainLayout>
        }
      />
      <Route
        path={`/dashboard/panel-control/*`}
        element={
          user?.is_barber ? (
            <MainLayout>
              <PrivateRoutes />
            </MainLayout>
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
