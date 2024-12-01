import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
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
  const { user } = useContext(AuthContext)!;

  return (
    <Routes>
      {/* Si el usuario está autenticado, redirigir desde las rutas de autenticación */}
      {!user && (
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
      <Route
        path="/*"
        element={
          <MainLayout>
            <DashboardContextProvider>
              <PublicRoutes />
            </DashboardContextProvider>
          </MainLayout>
        }
      />

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
