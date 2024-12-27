import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "./AuthRoutes";
import AuthLayout from "../layouts/AuthLayout";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import PublicRoutes from "./PublicRoutes";
import AdminLayout from "../layouts/AdminLayout";
import PrivateRoutes from "./PrivateRoutes";
import { PanelControlContextProvider } from "../context/PanelControlContext";
import { DashboardContextProvider } from "../context/DashboardContext";

const IndexRoute = () => {
  const { user, isUserAuthenticated } = useContext(AuthContext)!;

  return (
    <Routes>
      {/* Si el usuario está autenticado, redirigir desde las rutas de autenticación */}
      {!isUserAuthenticated && (
        <Route
          path="/auth/*"
          element={
            <AuthLayout>
              <AuthRoutes />
            </AuthLayout>
          }
        />
      )}

      {/* Rutas publicas */}
      <Route path="/*" element={<PublicRoutes />} />

      {/* Rutas privadas para administradores */}
      {user?.is_admin === true && (
        <Route
          path="/panel-control/*"
          element={
            <DashboardContextProvider>
              <PanelControlContextProvider>
                <AdminLayout>
                  <PrivateRoutes />
                </AdminLayout>
              </PanelControlContextProvider>
            </DashboardContextProvider>
          }
        />
      )}

      {/* Redirección de rutas no encontradas */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default IndexRoute;
