import { Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "../internal/dashboard/pages/Dashboard";
import HomePage from "../internal/home/pages/HomePage";
import { DashboardContextProvider } from "../context/DashboardContext";
import PaymentRoutes from "./PaymentRoutes";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<Dashboard />} />

      <Route
        path="/payment/*"
        element={
          <DashboardContextProvider>
            <PaymentRoutes />
          </DashboardContextProvider>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default PublicRoutes;
