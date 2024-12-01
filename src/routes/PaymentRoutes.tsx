import { Navigate, Route, Routes } from "react-router-dom";
import SuccessPage from "../internal/dashboard/pages/SuccessPage";
import FailurePage from "../internal/dashboard/pages/FailurePage";
import PendingPage from "../internal/dashboard/pages/PendingPage";

const PaymentRoutes = () => {
  return (
    <Routes>
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/failure" element={<FailurePage />} />
      <Route path="/pending" element={<PendingPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default PaymentRoutes;
