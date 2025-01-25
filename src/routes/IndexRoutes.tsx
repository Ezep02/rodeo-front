import { Navigate, Route, Routes } from "react-router-dom";

import PublicRoutes from "./PublicRoutes";
import { PanelControlContextProvider } from "../context/PanelControlContext";
import { DashboardContextProvider } from "../context/DashboardContext";
import { AdminContextProvider } from "@/context/AdminContext";

const IndexRoute = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route
        path="/*"
        element={
          <PanelControlContextProvider>
            <AdminContextProvider >
              <DashboardContextProvider>
                <PublicRoutes />
              </DashboardContextProvider>
            </AdminContextProvider>
          </PanelControlContextProvider>
        }
      />
      {/* Redirección de rutas no encontradas */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default IndexRoute;
