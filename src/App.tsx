import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./scenes/login/LoginPage";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import AdminRegister from "./scenes/form";
import FAQ from "./scenes/faq";
import DashboardLayout from "./DashboardLayout";
import { CssBaseline,ThemeProvider  } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { useAuthStore } from "./store/auth.store";
import SettingsLayout from "./scenes/settings/settings.scene";



interface ProtectedRouteProps {
  children: React.ReactNode; 
}

// Este guardia patea al usuario AFUERA del login si ya está logueado
const PublicRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />; // Lo manda al Dashboard
  }
  return children;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => { 
const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
if (!isAuthenticated) {
return <Navigate to="/login" replace />;
}
return children;
};

function App() {
    const [theme, colorMode] = useMode();

  return (
     <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
                <CssBaseline/>

    <Routes>
      <Route path="/login" element={
        <PublicRoute><LoginPage /></PublicRoute>} />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout /> 
          </ProtectedRoute>
        }
      >
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<SettingsLayout />} />
          <Route path="/team" element={<Team/>} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/form" element={<AdminRegister />} />
          <Route path="/faq" element={<FAQ />} />
      </Route>

    </Routes>
         </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;