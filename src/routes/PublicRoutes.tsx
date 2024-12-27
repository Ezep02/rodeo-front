import { Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "../internal/dashboard/pages/Dashboard";
import HomePage from "../internal/home/pages/HomePage";
import { DashboardContextProvider } from "../context/DashboardContext";
import PaymentRoutes from "./PaymentRoutes";
import MainLayout from "../layouts/MainLayout";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DashboardContextProvider>
            <MainLayout>
              <HomePage />
            </MainLayout>          
          </DashboardContextProvider>
        }
      />
      <Route
        path="/dashboard"
        element={
          <DashboardContextProvider>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </DashboardContextProvider>
        }
      />

      <Route
        path="/payment/*"
        element={
          <DashboardContextProvider>
            <MainLayout>
              <PaymentRoutes />
            </MainLayout>
          </DashboardContextProvider>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default PublicRoutes;
