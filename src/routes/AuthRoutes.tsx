import React, { Suspense } from "react";

import { Navigate, Route, Routes } from "react-router-dom";


const AuthRecoverPage = React.lazy(() => import("@/internal/auth/pages/AuthRecoverPage"));
const AuthResetPasswordPage = React.lazy(() => import("@/internal/auth/pages/AuthResetPassword"));


const AuthRoutes: React.FC = () => {

    return (
        <Routes>
            <Route path="/recover" element={
                <Suspense fallback={
                    <div className="h-screen w-full flex justify-center items-center flex-col gap-1">
                        <p className="loader"></p>
                        <span>sincronizando datos</span>
                    </div>
                }>
                    <AuthRecoverPage />
                </Suspense>
            } />

            <Route path="/recover/:token" element={
                <Suspense fallback={
                    <div className="h-screen w-full flex justify-center items-center flex-col gap-1">
                        <p className="loader"></p>
                        <span>sincronizando datos</span>
                    </div>
                }>
                    <AuthResetPasswordPage />
                </Suspense>
            } />


            <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
    );
};

export default AuthRoutes;
