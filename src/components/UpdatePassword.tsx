import { useState } from 'react';
import { 
  Box, Typography, TextField, Button, InputAdornment, IconButton 
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff, Key } from '@mui/icons-material';
import Swal from 'sweetalert2';

import { useUpdatePassword } from '../hooks/useUpdatePassword.hook';
import { UpdatePasswordDTO, UpdatePasswordSchema } from '../types/updatePassword.type';

export const UpdatePasswordComponent = () => {
  const { mutate, isPending } = useUpdatePassword();
  
  // Estados para mostrar/ocultar contraseñas
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<UpdatePasswordDTO>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      actual_password: '',
      newPassword: '',
      confirm_password: ''
    },
    mode: 'onBlur',
  });

  const onSubmit = (data: UpdatePasswordDTO) => {
    mutate(data, {
      onSuccess: () => {
        Swal.fire({
          title: 'Contraseña Actualizada',
          text: 'Tu clave de acceso ha sido modificada correctamente.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
        reset(); // Limpiamos el formulario por seguridad
      }
    });
  };

  // Helper para generar el botón de "Ojo"
  const getEndAdornment = (show: boolean, setShow: (val: boolean) => void) => (
    <InputAdornment position="end">
      <IconButton onClick={() => setShow(!show)} edge="end">
        {show ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <Box 
      component="section"
      sx={{ 
        margin:"auto",
        maxWidth: '600px', 
        bgcolor: 'background.paper', 
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: (theme) => theme.palette.mode === 'light' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
      }}
    >
      {/* HEADER */}
      <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h5" component="h2" fontWeight="bold" color="text.primary">
          Seguridad
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          Cambia tu contraseña periódicamente para mantener tu cuenta segura.
        </Typography>
      </Box>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
          
          {/* 1. CONTRASEÑA ACTUAL (Necesaria para el backend) */}
          <Box>
             <Typography component="label" variant="subtitle2" fontWeight="bold" color="text.primary" display="block" mb={1}>
                Contraseña Actual
             </Typography>
             <Controller
                name="actual_password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    type={showOld ? "text" : "password"}
                    placeholder="Ingresa tu clave actual"
                    error={!!errors.actual_password}
                    helperText={errors.actual_password?.message}
                    InputProps={{
                        endAdornment: getEndAdornment(showOld, setShowOld)
                    }}
                    sx={{ 
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' } 
                    }}
                  />
                )}
             />
          </Box>

          {/* 2. NUEVA CONTRASEÑA */}
          <Box>
             <Typography component="label" variant="subtitle2" fontWeight="bold" color="text.primary" display="block" mb={1}>
                Nueva Contraseña
             </Typography>
             <Controller
                name="newPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    type={showNew ? "text" : "password"}
                    placeholder="Mínimo 6 caracteres"
                    error={!!errors.newPassword}
                    helperText={errors.newPassword?.message}
                    InputProps={{
                        endAdornment: getEndAdornment(showNew, setShowNew)
                    }}
                    sx={{ 
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' } 
                    }}
                  />
                )}
             />
          </Box>

          {/* 3. CONFIRMAR CONTRASEÑA */}
          <Box>
             <Typography component="label" variant="subtitle2" fontWeight="bold" color="text.primary" display="block" mb={1}>
                Confirmar Nueva Contraseña
             </Typography>
             <Controller
                name="confirm_password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    type={showNew ? "text" : "password"} // Usa el mismo toggle que la nueva
                    placeholder="Repite la nueva clave"
                    error={!!errors.confirm_password}
                    helperText={errors.confirm_password?.message}
                    sx={{ 
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' } 
                    }}
                  />
                )}
             />
          </Box>

        </Box>

        {/* FOOTER */}
        <Box 
            sx={{ 
                p: 2, 
                bgcolor: 'background.default', 
                borderTop: '1px solid', 
                borderColor: 'divider',
                display: 'flex',
                justifyContent: 'flex-end'
            }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isPending}
            startIcon={<Key />}
            sx={{ 
                textTransform: 'none', 
                fontWeight: 'bold',
                boxShadow: 'none',
                '&:hover': { boxShadow: 'none' }
            }}
          >
            {isPending ? 'Verificando...' : 'Actualizar Contraseña'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};