import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

const LoginPage = () => {
  // Aquí tendrías tu useState para email/password
  // y una función handleLogin
    const initialState = {
      email: "",
      password: "",
    };

    const [userData, setUserData] = useState (initialState);
    const [errors, setErrors] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí llamarías a tu servicio de auth
    // y si es exitoso, actualizas tu estado global
    console.log("Iniciando sesión...");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      // (Podés usar los colores de tu 'theme' aquí si querés)
      backgroundColor="#141b2d"
    >
      <form onSubmit={handleLogin}>
        <Box
          display="flex"
          flexDirection="column"
          gap="20px"
          padding="40px"
          borderRadius="8px"
          backgroundColor="#1F2A40"
        >
          <Typography variant="h4" color="white" textAlign="center">
            Iniciar Sesión
          </Typography>
          <TextField
            label="Email"
            variant="filled"
            type="email"
            // ... (props de valor y onChange)
          />
          <TextField
            label="Contraseña"
            variant="filled"
            type="password"
            // ... (props de valor y onChange)
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
          >
            Entrar
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default LoginPage;
