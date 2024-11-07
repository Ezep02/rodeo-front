import { Navigate, Route, Routes } from "react-router-dom";
import UsersLogin from "../internal/auth/pages/Login";
import UserRegister from "../internal/auth/pages/Register";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<UsersLogin />} />
      <Route path="/register" element={<UserRegister />} />
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
};