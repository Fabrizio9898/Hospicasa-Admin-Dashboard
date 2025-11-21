import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Button, TextField, Typography, Paper, Alert, IconButton, InputAdornment } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { resetpassword } from "../../api/utils/sendPasswordReset.util";
import { isAxiosError } from "axios";

export const ResetPassword = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Para el ojito de ver password
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Validación inicial del token
  useEffect(() => {
    if (!token) {
      setError("Token inválido o inexistente.");
    }
  }, [token]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token) return;

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
     await resetpassword(token, password );
      setSuccess(true);

      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);

    } catch (err: unknown) {
     if (isAxiosError(err)) {
        const message = err.response?.data?.message || "Ocurrió un error al procesar la solicitud.";
        setError(message);
        console.error("Error de API:", err.response?.data);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Si no hay token, mostramos pantalla de error simple
  if (!token) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="100vh" 
        bgcolor={colors.primary[500]} // Fondo oscuro base
      >
        <Alert severity="error">Enlace inválido. Revisa tu correo.</Alert>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      // Usamos el 'default' background de tu tema (primary[500] en dark)
      bgcolor={theme.palette.background.default} 
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 450,
          // Usamos primary[400] que es tu color para "paper/tarjetas" en el tema
          backgroundColor: theme.palette.background.paper, 
          borderRadius: "12px",
          border: `1px solid ${theme.palette.mode === 'dark' ? colors.primary[400] : '#ccc'}`
        }}
      >
        <Typography 
          variant="h2" 
          color={colors.grey[100]} 
          fontWeight="bold" 
          mb={1} 
          textAlign="center"
        >
          Restablecer Password
        </Typography>
        
        <Typography 
          variant="h5" 
          color={colors.grey[300]} 
          mb={4} 
          textAlign="center"
        >
          Ingresa tu nueva contraseña
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
        )}

        {success ? (
          <Box textAlign="center">
            <Alert severity="success" sx={{ mb: 3 }}>
              ¡Contraseña actualizada! Redirigiendo...
            </Alert>
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Input Contraseña */}
            <TextField
              label="Nueva Contraseña"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
              // Estilos para el input y label usando tus colores
              InputLabelProps={{ 
                style: { color: colors.grey[100] } 
              }}
              InputProps={{
                style: { color: colors.grey[100] },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{ color: colors.grey[100] }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Input Confirmar */}
            <TextField
              label="Confirmar Contraseña"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ mb: 4 }}
              InputLabelProps={{ style: { color: colors.grey[100] } }}
              InputProps={{ style: { color: colors.grey[100] } }}
            />

            {/* Botón de Acción */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              color="secondary" // Usa tu 'greenAccent' definido en el tema
              disabled={loading}
              sx={{ 
                py: 1.5, 
                fontSize: "14px",
                fontWeight: "bold",
                color: theme.palette.mode === 'dark' ? colors.primary[500] : "#fff" 
                // En modo dark, el texto del botón verde se ve mejor oscuro
              }}
            >
              {loading ? "Guardando..." : "CAMBIAR CONTRASEÑA"}
            </Button>
          </form>
        )}
      </Paper>
    </Box>
  );
};