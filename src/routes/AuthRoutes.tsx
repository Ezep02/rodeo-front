import React, { Suspense } from "react";

import { Navigate, Route, Routes } from "react-router-dom";

const AuthLoginPage = React.lazy(() => import("@/internal/auth/pages/AuthLoginPage"));
const AuthRegisterPage = React.lazy(() => import("@/internal/auth/pages/AuthRegisterPage"));
const AuthRecoverPage = React.lazy(() => import("@/internal/auth/pages/AuthRecoverPage"));

const AuthResetPasswordPage = React.lazy(() => import("@/internal/auth/pages/AuthResetPassword"));


const AuthRoutes: React.FC = () => {

    return (
        <Routes>
            <Route path="/login" element={
                <Suspense fallback={
                    <div className="h-screen w-full flex justify-center items-center flex-col gap-1">
                        <p className="loader"></p>
                        <span>sincronizando datos</span>
                    </div>
                }>
                    <AuthLoginPage />
                </Suspense>
            } />

            <Route path="/register" element={
                <Suspense fallback={
                    <div className="h-screen w-full flex justify-center items-center flex-col gap-1">
                        <p className="loader"></p>
                        <span>sincronizando datos</span>
                    </div>
                }>
                    <AuthRegisterPage />
                </Suspense>
            } />


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
