import { 
  Card, CardContent, Typography, Box, 
  Chip, IconButton, Tooltip, Grid, Avatar 
} from '@mui/material';
import { 
  Edit, Delete, People, LocalHospital 
} from '@mui/icons-material';
import { SpecialityUI } from '../types/doctorSpeciality.type';

interface SpecialityCardProps {
  data: SpecialityUI;
}

export const SpecialityCard = ({ data }: SpecialityCardProps) => {
  
  // Lógica visual: ¿Es una especialidad crítica con pocos médicos?
  const isLowCoverage = data.doctorCount < 3;

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <Card sx={{ 
        bgcolor: 'background.paper', 
        borderRadius: '16px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4
        },
        border: '1px solid',
        borderColor: 'divider'
      }}>
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          
          {/* HEADER: Icono y Menu */}
          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
            <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
                <LocalHospital />
            </Avatar>
            <Box>
                <Tooltip title="Editar">
                    <IconButton size="small"><Edit fontSize="small" /></IconButton>
                </Tooltip>
                <Tooltip title="Eliminar (Solo si no tiene docs)">
                    <IconButton size="small" color="error"><Delete fontSize="small" /></IconButton>
                </Tooltip>
            </Box>
          </Box>

          {/* TITULO Y DESCRIPCION */}
          <Box>
            <Typography variant="h5" fontWeight="bold" color="text.primary" gutterBottom>
                {data.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{
                minHeight: '40px', // Para alinear tarjetas
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
            }}>
                {data.description || "Sin descripción disponible."}
            </Typography>
          </Box>

          {/* STATS (Lo valioso para el Admin) */}
          <Box 
            bgcolor="action.hover" 
            p={1.5} 
            borderRadius="8px" 
            display="flex" 
            alignItems="center" 
            justifyContent="space-between"
            mt="auto" // Empuja esto al fondo
          >
            <Box display="flex" alignItems="center" gap={1}>
                <People fontSize="small" color="action" />
                <Typography variant="caption" fontWeight="bold" color="text.secondary">
                    PROFESIONALES
                </Typography>
            </Box>
            
            <Chip 
                label={data.doctorCount} 
                size="small" 
                color={isLowCoverage ? "warning" : "success"}
                variant={isLowCoverage ? "outlined" : "filled"}
            />
          </Box>

          {isLowCoverage && (
             <Typography variant="caption" color="warning.main" sx={{ fontStyle: 'italic', textAlign: 'center' }}>
                ⚠ Se necesitan más médicos
             </Typography>
          )}

        </CardContent>
      </Card>
    </Grid>
  );
};