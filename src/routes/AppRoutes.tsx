import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import Landing from "@/internal/landing/pages/Landing";

import CalendarPage from "@/pages/calendar/CalendarPage";

import { Loader2 } from "lucide-react";
import PrivateRoute from "./PrivateRoutes";
import { CalendarContextProvider } from "@/internal/calendar/context/CalendarContext";
import { DashboardContextProvider } from "@/context/DashboardContext";

import { CatalogContextProvider } from "@/context/CatalogContext";
import { ShopContextProvider } from "@/internal/shop/context/ShopContext";
import AppointmentPage from "@/pages/appointment/AppointmentPage";
import { AppointmentContextProvider } from "@/internal/appointment/context/AppointmentContext";
import PanelControl from "@/pages/panel-control/PanelControl";
import { PanelControlContextProvider } from "@/internal/panel-control/context/PanelControlContext";
import ProfilePage from "@/pages/profile/ProfilePage";

// Lazy load
const DashboardLayout = lazy(() => import("@/pages/dashboard/DashboardLayout"));
const DashboardOverview = lazy(() => import("@/pages/dashboard/Overview"));

// SHOPW

const ShopLayout = lazy(() => import("@/pages/shop/ShopLayout"));
const ShopPage = lazy(() => import("@/pages/shop/ShopPage"));
const ReservationPage = lazy(() => import("@/pages/shop/ReservationPage"));

// Admin
const CatalogPage = lazy(() => import("@/pages/catalog/CatalogPage"));

const PageLoader = () => {
  return (
    <div className="flex flex-1 justify-center items-center h-screen">
      <div>
        <Loader2 size={24} className="animate-spin" />
      </div>
    </div>
  );
};

export const AppRoutes = () => (
  <Router>
    <Routes>
      {/* Rutas públicas */}
      <Route
        path="/home"
        element={
          <MainLayout>
            <Landing />
          </MainLayout>
        }
      />

      {/* Rutas privadas (dashboard) */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashboardContextProvider>
              <DashboardLayout />
            </DashboardContextProvider>
          </PrivateRoute>
        }
      >
        <Route index element={<DashboardOverview />} />

        <Route
          path=":name"
          element={
            <Suspense fallback={<PageLoader />}>
              <ProfilePage/>
            </Suspense>
          }
        />

        <Route
          path="calendar"
          element={
            <Suspense fallback={<PageLoader />}>
              <CalendarContextProvider>
                <CalendarPage />
              </CalendarContextProvider>
            </Suspense>
          }
        />

        <Route
          path="appointment"
          element={
            <Suspense fallback={<PageLoader />}>
              <AppointmentContextProvider>
                <AppointmentPage />
              </AppointmentContextProvider>
            </Suspense>
          }
        />

        <Route
          path="admin"
          element={
            <Suspense fallback={<PageLoader />}>
              <PanelControlContextProvider>
                <PanelControl />
              </PanelControlContextProvider>
            </Suspense>
          }
        />

        <Route
          path="catalog"
          element={
            <Suspense fallback={<PageLoader />}>
              <CatalogContextProvider>
                <CatalogPage />
              </CatalogContextProvider>
            </Suspense>
          }
        />

        <Route
          path="shop"
          element={
            <Suspense fallback={<PageLoader />}>
              <CatalogContextProvider>
                <ShopLayout />
              </CatalogContextProvider>
            </Suspense>
          }
        >
          {/* Nested route: detalle de servicio */}
          <Route
            path=""
            element={
              <Suspense fallback={<PageLoader />}>
                <CatalogContextProvider>
                  <ShopPage />
                </CatalogContextProvider>
              </Suspense>
            }
          />

          <Route
            path=":id"
            element={
              <Suspense fallback={<PageLoader />}>
                <CatalogContextProvider>
                  <ShopContextProvider>
                    <ReservationPage />
                  </ShopContextProvider>
                </CatalogContextProvider>
              </Suspense>
            }
          />
        </Route>
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Router>
);
