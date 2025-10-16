import { Navigate } from "react-router-dom";
import useSession from "@/hooks/useSession";
import { Loader2 } from "lucide-react";

import { ReactNode } from "react";

const PageLoader = () => (
  <div className="flex flex-1 justify-center items-center h-screen">
    <Loader2 size={24} className="animate-spin" />
  </div>
);

// Rutas privadas → si NO hay usuario, redirige al landing
const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isUserAuthenticated, sessionIsLoading } = useSession();

  if (sessionIsLoading) return <PageLoader />;

  return isUserAuthenticated ? children : <Navigate to="/home" replace />;
};

export default PrivateRoute;
