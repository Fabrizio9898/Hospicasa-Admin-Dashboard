import { 
  Box, Typography, TextField, Button, Grid, Paper, Divider 
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '@mui/material';
import { Save, Email, Lock } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { useAuthStore } from '../store/auth.store';

import { useMemo, useEffect } from 'react'; // <--- IMPORTAMOS useMemo y useEffect
import { UpdateEmailDTO, UpdateEmailSchema } from '../types/updateEmail.type';
import { useUpdateEmail } from '../hooks/useUpdateUser.hook';

export const UpdateProfileComponent = () => {
  const theme = useTheme();
  const user = useAuthStore(state => state.user);
  const defaultValues = useMemo(() => ({
    email: user?.email || '',
  }), [user?.email]); 
  const { mutate, isPending } = useUpdateEmail();
  const { control, handleSubmit, reset, formState: { errors } } = useForm<UpdateEmailDTO>({
    resolver: zodResolver(UpdateEmailSchema),
    defaultValues: defaultValues, // <-- Usamos la referencia estable
    mode: 'onBlur',
  });
  
  // 3. EFECTO PARA RELLENAR CUANDO EL USUARIO CARGA
  // Esto es necesario porque el valor inicial de 'user' es 'null' (el store tarda en hidratar)
  useEffect(() => {
    if (user?.email) {
      // Usamos reset para llenar el formulario con los datos reales una vez que estén disponibles
      reset({ email: user.email });
    }
  }, [user?.email, reset]); 


  const onSubmit = (data: UpdateEmailDTO) => {
    console.log("Datos a enviar:", data);
    
    // Aquí se llama a la mutación para enviar al backend
    mutate(data, {
        onSuccess: () => {
            Swal.fire({
                title: '¡Email Actualizado!',
                text: `El nuevo email se ha guardado correctamente.`,
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
            });
        },
        onError: (e) => {
            Swal.fire({
                title: 'Error de Actualización',
                text: (e as Error).message || "Ocurrió un error en el servidor.",
                icon: 'error',
            });
        }
    });
  };

  if (!user) return <Typography variant="h5" color="text.secondary">Cargando usuario...</Typography>;

  return (
    <Paper 
      elevation={3} 
      component="form" 
      onSubmit={handleSubmit(onSubmit)} 
      sx={{ 
        p: 4, 
        bgcolor: 'background.paper', 
        borderRadius: '12px' 
      }}
    >
      <Grid container spacing={4}>
        
        {/* --- COLUMNA IZQUIERDA: INFORMACIÓN --- */}
        <Grid size={{xs:12, md:5}} >
          <Box mb={2}>
            <Typography variant="h5" fontWeight="bold" color="text.primary" mb={1}>
              Detalles del Usuario
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Actualiza tu información de contacto principal. El email es necesario para notificaciones y recuperación de cuenta.
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" gap={1}>
            <Lock fontSize="small"/> 
            Para cambiar la contraseña, usa la pestaña Contraseña.
          </Typography>
          <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" gap={1} mt={1}>
            <Email fontSize="small"/> 
            Rol: {user.role}
          </Typography>
        </Grid>
        
        {/* --- COLUMNA DERECHA: FORMULARIO --- */}
        <Grid size={{xs:12, md:7}} >
          
          {/* Campo Email */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                placeholder="ejemplo@dominio.com"
                fullWidth
                variant="filled"
                InputProps={{
                  startAdornment: (
                    <Email color="action" sx={{ mr: 1 }}/>
                  ),
                }}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{ mb: 3 }}
              />
            )}
          />

          {/* Campo Nombre (Solo lectura, para contexto) */}
          <TextField
            label="Nombre Completo"
            value={user.fullname || ''}
            fullWidth
            variant="filled"
            disabled
            sx={{ mb: 3 }}
          />

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              startIcon={<Save />}
              disabled={isPending}
            >
              {isPending ? 'Guardando...' : 'Actualizar Email'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};