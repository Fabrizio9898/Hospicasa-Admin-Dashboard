import { useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Container, 
  Paper, 
  useTheme, 
  CircularProgress,
  Link as MuiLink 
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom'; // Asumo React Router
import { tokens } from '../../theme'; // Ajusta tu ruta de theme
import { swalNotifyError } from '../../swal/swal-notifyError';
import { ForgotPasswordFormValues, forgotPasswordSchema } from '../../types/email.type';
import { forgotPassword } from '../../api/utils/forgotPassword.util';



export const ForgotPassword = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  
  // Estado para simular carga
  const [isLoading, setIsLoading] = useState(false);

  // --- 2. CONFIGURACIÓN DEL FORMULARIO ---
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  // --- 3. FUNCIÓN DE ENVÍO (SIMULADA) ---
  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);

    try {
     
     const {message}:{message:string}= await forgotPassword(data.email)
      // --- ÉXITO ---
      Swal.fire({
        title: message,
        text: 'Revisa tu bandeja de entrada para restablecer tu contraseña.',
        icon: 'success',
        confirmButtonColor: colors.greenAccent[600],
        confirmButtonText: 'Ir al Login'
      }).then((result) => {
        // Redirigir al login cuando el usuario cierre la alerta
        if (result.isConfirmed || result.isDismissed) {
          navigate('/login');
        }
      });

    } catch (error) {
      // --- ERROR ---
      let message = 'Ocurrió un error inesperado.';
      if (error instanceof Error) {
        message = error.message;
      }
      swalNotifyError(message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box 
        display="flex" 
        flexDirection="column" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
      >
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            width: '100%', 
            backgroundColor: colors.primary[400],
            borderRadius: 2
          }}
        >
          {/* CABECERA */}
          <Box textAlign="center" mb={3}>
            <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" mb={1}>
              Recuperar Contraseña
            </Typography>
            <Typography variant="body1" color={colors.grey[300]}>
              Ingresa tu correo y te enviaremos un enlace para restablecer tu acceso.
            </Typography>
          </Box>

          {/* FORMULARIO */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              fullWidth
              variant="filled"
              type="email"
              label="Correo Electrónico"
              placeholder="ejemplo@correo.com"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={isLoading}
              sx={{ mb: 3 }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
              disabled={isLoading}
              sx={{ 
                fontWeight: 'bold', 
                py: 1.5,
                mb: 2,
                position: 'relative' // Para centrar el spinner
              }}
            >
              {isLoading ? (
                 <CircularProgress size={24} color="inherit" />
              ) : (
                 "Enviar Enlace"
              )}
            </Button>

            {/* VOLVER AL LOGIN */}
            <Box display="flex" justifyContent="center">
              <Typography variant="body2" color={colors.grey[100]}>
                ¿Ya tienes cuenta?{' '}
                <MuiLink 
                  component={Link} 
                  to="/login" 
                  sx={{ 
                    color: colors.greenAccent[500], 
                    fontWeight: "bold", 
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" }
                  }}
                >
                  Volver al Login
                </MuiLink>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};