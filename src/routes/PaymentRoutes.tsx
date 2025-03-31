import { Navigate, Route, Routes } from "react-router-dom";
import SuccessPage from "../internal/dashboard/pages/SuccessPage";

const PaymentRoutes = () => {
  return (
    <Routes>
      <Route path="/success" element={<SuccessPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default PaymentRoutes;
