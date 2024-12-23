import React from "react"
import { AuthContextProvider } from "./context/AuthContext"
import IndexRoute from "./routes/IndexRoutes"


const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <IndexRoute />
    </AuthContextProvider>
  )
}

export default App