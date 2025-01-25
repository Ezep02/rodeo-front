import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "@/internal/dashboard/pages/Dashboard";
import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/internal/home/pages/HomePage";
import PaymentRoutes from "./PaymentRoutes";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import PrivateRoutes from "./PrivateRoutes";

const PublicRoutes = () => {
  const { user } = useContext(AuthContext)!;

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/dashboard"
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        }
      />

      <Route
        path="/payment/*"
        element={
          <MainLayout>
            <PaymentRoutes />
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
