import Success from "@/internal/payments/pages/Success";
import { Navigate, Route, Routes } from "react-router-dom";

const PaymentRoutes = () => {
  return (
    <Routes>
      <Route path="/success/:token" element={
        <Success />
      } />
      < Route path="*" element={< Navigate to="/" replace />} />
    </Routes >
  );
};

export default PaymentRoutes;
