import React, { useContext } from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import PanelControlPage from "../internal/panel-control/pages/PanelControlPage";
import ConfigControlPage from "../internal/panel-control/pages/ConfigControlPage";
import { AuthContext } from "@/context/AuthContext";
import PrivatePage from "@/internal/private/pages/PrivatePage";

const PrivateRoutes: React.FC = () => {
  const { user } = useContext(AuthContext)!;

  return (
    <Routes>
      <Route path="barber" element={<PanelControlPage />} />
      <Route path="config/:barberID" element={<ConfigControlPage />} />
      {user?.is_admin && (
        <>
          <Route path="config" element={<ConfigControlPage />} />
          <Route path="admin" element={<PrivatePage />} />
        </>
      )}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default PrivateRoutes;
