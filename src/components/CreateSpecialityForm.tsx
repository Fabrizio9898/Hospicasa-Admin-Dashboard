import { 
  Button, TextField, Box, Typography, Divider, useTheme 
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2';
import { AddCircleOutline, Close } from '@mui/icons-material';
import { tokens } from '../theme';
import { DoctorSpeciality, doctorSpecialitySchema } from '../types/doctorSpeciality.type';
import { modalStyle } from '../scenes/doctor-profile/doctorProfile.scene';

interface CreateSpecialityFormProps {
  onClose: () => void; 
  onCreate: (data: DoctorSpeciality) => void;
}

export const CreateSpeciality = ({ onClose, onCreate }: CreateSpecialityFormProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // 1. Configuración del Formulario
  const { control, handleSubmit, reset, formState: { errors } } = useForm<DoctorSpeciality>({
    resolver: zodResolver(doctorSpecialitySchema),
    defaultValues: {
        name: '',
        description: ''
    },
    mode: 'onChange' // Valida mientras escribes (más feedback visual)
  });

  // 2. Función que SOLO se ejecuta si Zod dice que todo está OK
  const onSubmit = (data: DoctorSpeciality) => {
    
    // Feedback visual
    Swal.fire({
        title: '¡Especialidad Creada!',
        text: `Se ha agregado ${data.name} al sistema.`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        // Ajusta colores para que combine con tu tema Dark/Light
        background: theme.palette.mode === 'dark' ? colors.primary[400] : '#fff',
        color: theme.palette.mode === 'dark' ? colors.grey[100] : '#000'
    });

    // Pasamos datos al padre
    onCreate(data);
    
    // Limpiamos
    reset();
    onClose(); 
  };

  return (
    <Box sx={modalStyle(colors)}> 
      
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center" gap={1}>
            <AddCircleOutline color="secondary" fontSize="large" />
            <Typography variant="h4" fontWeight="bold" color="text.primary">
                Nueva Especialidad
            </Typography>
        </Box>
        <Button onClick={onClose} sx={{ minWidth: 'auto', p: 1 }}>
             <Close sx={{ color: 'text.primary' }} />
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* FORMULARIO */}
      {/* handleSubmit valida primero, y si pasa, ejecuta onSubmit */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" gap={3}>
            
            {/* CAMPO NOMBRE */}
            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Nombre de la Especialidad"
                        placeholder="Ej: Cardiología Infantil"
                        fullWidth
                        variant="filled"
                        // Muestra borde rojo si hay error
                        error={!!errors.name} 
                        // Muestra el mensaje definido en Zod
                        helperText={errors.name?.message} 
                        sx={{ 
                            bgcolor: 'action.hover',
                            '& .MuiInputBase-root': { color: 'text.primary' }
                        }}
                    />
                )}
            />

            {/* CAMPO DESCRIPCIÓN */}
            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Descripción (Opcional)"
                        placeholder="Breve detalle..."
                        fullWidth
                        multiline
                        rows={3}
                        variant="filled"
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        sx={{ 
                            bgcolor: 'action.hover',
                            '& .MuiInputBase-root': { color: 'text.primary' }
                        }}
                    />
                )}
            />

        </Box>

        {/* FOOTER ACTIONS */}
        <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
            <Button onClick={onClose} color="secondary" variant="text">
                Cancelar
            </Button>
            <Button 
                type="submit" 
                variant="contained" 
                color="secondary"
                startIcon={<AddCircleOutline />}
            >
                Crear
            </Button>
        </Box>
      </form>
    </Box>
  );
};