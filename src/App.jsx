import { Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import LoginPage from "./scenes/login/LoginPage";
import DashboardLayout from "./DashboardLayout"; // El layout que creamos

// --- Lógica de Autenticación (Simple) ---
// En una app real, esto vendría de un Context o un store (Zustand/Redux)
const useAuth = () => {
  // Por ahora, simulamos que el usuario NO está logueado.
  // Cuando implementes el login, aquí leerías tu estado global.
  const isAuthenticated = false; // <-- CAMBIÁ ESTO A 'true' PARA PROBAR

  return { isAuthenticated };
};
// -----------------------------------------

/**
 * Componente "Guardia" para proteger rutas.
 * Si no estás logueado, te redirige al login.
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    // Redirige al login si no está autenticado
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/* Ruta Pública: El Login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Rutas Privadas: El Dashboard */}
          <Route
            path="/*" // '/*' significa "todas las demás rutas"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
