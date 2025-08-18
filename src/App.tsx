import React from "react";
import { AuthContextProvider } from "./context/AuthContext";
import IndexRoute from "./routes/IndexRoutes";
import { DashboardContextProvider } from "./context/DashboardContext";

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <DashboardContextProvider>
        <IndexRoute />
      </DashboardContextProvider>
    </AuthContextProvider>
  );
};

export default App;
