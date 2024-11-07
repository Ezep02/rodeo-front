import React from "react";

import {Navigate, Route, Routes } from "react-router-dom";
import PanelControlPage from "../internal/panel-control/pages/PanelControlPage";


const PrivateRoutes: React.FC = () => { 
  return (
    <Routes>
       <Route path="/admin" element={<PanelControlPage />} />
       <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default PrivateRoutes