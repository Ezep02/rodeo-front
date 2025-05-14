import React, { Suspense, useContext } from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import Profile from "@/internal/dashboard/pages/Profile";
import Appointments from "@/internal/dashboard/pages/Appointments";
import Dashboard from "@/internal/dashboard/pages/Dashboard";

const ClientRoutes: React.FC = () => {
    const { user } = useContext(AuthContext)!;

    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />

            {user?.ID ? (
                <>
                    <Route path="/profile" element={
                        <Suspense fallback={
                            <div className="h-screen w-full flex justify-center items-center flex-col gap-1">
                                <p className="loader"></p>
                                <span>sincronizando datos</span>
                            </div>
                        }>
                            <Profile />
                        </Suspense>
                    } />
                    <Route path="/appointment" element={
                        <Suspense fallback={
                            <div className="h-screen w-full flex justify-center items-center flex-col gap-1">
                                <p className="loader"></p>
                                <span>sincronizando datos</span>
                            </div>
                        }>
                            <Appointments />
                        </Suspense>
                    } />
                </>
            ) : (
                <Route path="*" element={<p>Algo salió mal. No hay usuario autenticado.</p>} />
            )}
        </Routes>
    );

};

export default ClientRoutes;
