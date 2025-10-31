import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./scenes/login/LoginPage";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
// import Contacts from "./scenes/contacts";
import Invoices from "./scenes/invoices";
import Form from "./scenes/form";
import FAQ from "./scenes/faq";
import DashboardLayout from "./DashboardLayout";
import { CssBaseline,ThemeProvider  } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";



interface AuthState {
  isAuthenticated: boolean;
}

const useAuth = (): AuthState => { // <-- 5. Añade el tipo de retorno
  const isAuthenticated = false;
  return { isAuthenticated };
};

interface ProtectedRouteProps {
  children: React.ReactNode; // <-- 'children' es un tipo estándar de React
}

// (Tu guardia de autenticación)
const ProtectedRoute = ({ children }: ProtectedRouteProps) => { // <-- 7. Aplica los tipos
  const { isAuthenticated } = useAuth();
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
      {/* 1. RUTA PÚBLICA (Sin marco) */}
      <Route path="/login" element={<LoginPage />} />

      {/* 2. RUTA "PADRE" (Define el marco) */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout /> {/* <-- Aquí le decís que use el marco */}
          </ProtectedRoute>
        }
      >
        {/* 👇 AQUÍ ESTÁN TUS RUTAS 👇 */}
        {/* Estas son las "rutas hijas" que se renderizarán 
            donde pusiste el <Outlet /> */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/team" element={<Team/>} />
          {/* <Route path="/contacts" element={<Contacts />} /> */}
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/form" element={<Form />} />
          <Route path="/faq" element={<FAQ />} />
      </Route>

    </Routes>
         </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;