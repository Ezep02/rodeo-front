import React, { lazy, Suspense, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";


import Dashboard from "@/internal/dashboard/pages/Dashboard";

import MainLayout from "@/layouts/MainLayout";
import AppointmentLayout from "@/layouts/AppointmentLayout";


const Profile = lazy(() => import("@/internal/dashboard/pages/Profile"))
const Appointments = lazy(() => import("@/internal/Appointment/page/Appointments"))
const ReservationPage = lazy(() => import("@/internal/reservation/pages/reservation"))

const ClientRoutes: React.FC = () => {
    const { user } = useContext(AuthContext)!;

    return (
        <Routes>
            <Route path="/" element={
                <MainLayout>
                    <Dashboard />
                </MainLayout>
            } />

            <Route path="/reservation" element={
                <Suspense fallback={
                    <div className="h-screen w-full flex justify-center items-center flex-col gap-1 bg-black">
                        <p className="loader"></p>
                    </div>
                }>
                    <ReservationPage />
                </Suspense>

            } />

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
                            </div>
                        }>
                            <AppointmentLayout>
                                <Appointments />
                            </AppointmentLayout>
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
