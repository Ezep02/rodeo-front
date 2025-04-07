import { Navigate, Route, Routes } from "react-router-dom";

import PublicRoutes from "./PublicRoutes";

const IndexRoute = () => {
  return (
    <Routes>
      
      <Route
        path="/*"
        element={
          <PublicRoutes />
        }
      />
      {/* Redirección de rutas no encontradas */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default IndexRoute;
