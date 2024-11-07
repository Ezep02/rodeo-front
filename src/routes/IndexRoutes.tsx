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
  const { isUserAuthenticated, user } = useContext(AuthContext)!;

  return (
    <Routes>
      {/* Si el usuario está autenticado, redirigir desde las rutas de autenticación */}
      {isUserAuthenticated ? (
        <Route path="/auth/*" element={<Navigate to="/" replace />} />
      ) : (
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

      {/* Rutas privadas solo si el usuario es un admin */}
      
      {/* Rutas privadas para administradores */}
      {user?.is_admin === true && (
        <Route
          path="/panel-control/*"
          element={
            <AdminLayout>
              <PanelControlContextProvider>
                <PrivateRoutes />
              </PanelControlContextProvider>
            </AdminLayout>
          }
        />
      )}


      {/* Redirección de rutas no encontradas */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default IndexRoute;
