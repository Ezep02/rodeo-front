import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";


const Success = React.lazy(() => import("@/internal/payments/pages/Success"))

const PaymentRoutes = () => {
  return (
    <Routes>
      <Route path="/success/:token" element={<Suspense fallback={
        <div className="h-screen w-full flex justify-center items-center flex-col gap-1">
          <p className="loader"></p>
          <span>Obteniendo pago</span>
        </div>
      }>
        <Success />
      </Suspense>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default PaymentRoutes;
