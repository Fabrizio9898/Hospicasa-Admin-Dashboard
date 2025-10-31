import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// --- 1. INTERFACES (Tipado) ---

// La "forma" de los datos de tu formulario
interface IFormData {
  email: string;
  password: string;
}

// La "forma" de los errores
interface IFormErrors {
  email?: string;
  password?: string;
}

const LoginPage = () => {
  // --- 2. ESTADO TIPADO ---
  const [userData, setUserData] = useState<IFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<IFormErrors | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // --- 3. HANDLERS TIPADOS ---

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Actualiza el estado del formulario
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // Limpia los errores al escribir
    if (errors) {
      setErrors(null);
    }
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors(null);

    // Aquí iría tu lógica de Zod (si la usás) o la llamada a la API
    console.log('Enviando datos:', userData);

    // Simulación de una llamada a la API
    setTimeout(() => {
      // Simular un error
      // setErrors({ email: "Email o contraseña incorrectos" });
      setIsSubmitting(false);
    }, 1500);
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    // --- 4. ESTILOS (Box exterior con Fondo) ---
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        // ¡Aquí está tu fondo! (Reemplazá la URL por la que quieras)
        backgroundImage:
          'url(https://images.unsplash.com/photo-1507643118633-f36de10d4f6c?q=80&w=1974&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <form onSubmit={handleLogin}>
        {/* --- 5. ESTILOS (Formulario más grande) --- */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '25px', // Más espacio
            padding: '50px', // Más padding
            borderRadius: '10px',
            // Fondo oscuro pero con transparencia
            backgroundColor: 'rgba(31, 42, 64, 0.9)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)', // Sombra para resaltar
            minWidth: { xs: '320px', sm: '450px' }, // Ancho mínimo
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* --- 6. ESTILOS (Título) --- */}
          <Typography
            variant="h3"
            color="white"
            textAlign="center"
            fontWeight="bold"
            mb={2}
          >
            Hospicasa Admin
          </Typography>

          <TextField
            label="Email"
            variant="filled"
            type="email"
            name="email" // Necesario para el handler
            value={userData.email}
            onChange={handleChange}
            error={!!errors?.email}
            helperText={errors?.email}
            disabled={isSubmitting}
            fullWidth
          />
          <TextField
            label="Contraseña"
            variant="filled"
            name="password" // Necesario para el handler
            type={showPassword ? 'text' : 'password'}
            value={userData.password}
            onChange={handleChange}
            error={!!errors?.password}
            helperText={errors?.password}
            disabled={isSubmitting}
            fullWidth
            InputProps={{
              // --- 7. (BONUS) Icono para ver/ocultar contraseña ---
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            disabled={isSubmitting}
            sx={{ height: '56px' }} // Botón más alto
          >
            {isSubmitting ? (
              <CircularProgress size={26} color="inherit" />
            ) : (
              'Entrar'
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default LoginPage;