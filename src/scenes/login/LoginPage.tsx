import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
  Link as MuiLink, // Importamos Link de MUI con alias
  useTheme
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom'; // Importamos Link de React Router
import { useLoginFunctions } from '../../helpers/auth/loginFunctions.helper'; 
import { tokens } from '../../theme'; // Importa tus tokens para usar colores consistentes

const LoginPage = () => {
  // Hook del tema para colores
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { 
    userData, 
    errors, 
    isSubmitting,
    showPassword, 
    setShowPassword, 
    handleChange, 
    handleSubmit 
  } = useLoginFunctions();

  const toggleShowPassword = () => {  setShowPassword((prev) =>!prev);};

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection:"column",
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: "url('/assets/admin-background.webp')", 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '25px', 
            padding: '50px', 
            borderRadius: '10px',
            backgroundColor: 'rgba(31, 42, 64, 0.9)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)', 
            minWidth: { xs: '320px', sm: '450px' }, 
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
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
            name="email" 
            value={userData.email}
            onChange={handleChange}
            error={!!errors?.email} 
            helperText={errors?.email?._errors[0]} 
            disabled={isSubmitting} 
            fullWidth
          />
          <TextField
            label="Contraseña"
            variant="filled"
            name="password" 
            type={showPassword ? 'text' : 'password'}
            value={userData.password}
            onChange={handleChange}
            error={!!errors?.password}
            helperText={errors?.password?._errors[0]}
            disabled={isSubmitting} 
            fullWidth
            InputProps={{
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
            sx={{ height: '56px', fontWeight: 'bold', fontSize: '16px' }} 
          >
            {isSubmitting ? (
              <CircularProgress size={26} color="inherit" />
            ) : (
              'Entrar'
            )}
          </Button>

          {/* --- SECCIÓN MEJORADA DE FORGOT PASSWORD --- */}
          <Box display="flex" justifyContent="center" mt={1}>
            <Typography 
              variant="body1" 
              sx={{ color: colors.grey[300] }} // Gris suave legible sobre fondo oscuro
            >
              ¿Olvidaste tu contraseña?{' '}
              <MuiLink 
                component={RouterLink} 
                to="/forgot-password"
                sx={{
                  color: '#6870fa', // Azul (puedes usar colors.blueAccent[500] si prefieres)
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  '&:hover': {
                    color: '#868dfb', // Azul más claro al pasar el mouse
                    textDecoration: 'underline'
                  }
                }}
              >
                Recupérala
              </MuiLink>
            </Typography>
          </Box>

        </Box>
      </form>
    </Box>
  );
};

export default LoginPage;