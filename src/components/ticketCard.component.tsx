import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  Stack, 
  Avatar, 
  Button, 
  Grid, 
  useTheme 
} from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { tokens } from '../theme';
import { Ticket } from '../types/ticket.type';
import { TicketPriority } from '../enums/tickets/ticketPriority.enum';

interface TicketCardProps {
  report: Ticket; // Tipado fuerte aquí
  onViewDetails: (ticket: Ticket) => void;
}

export const TicketCard = ({ report, onViewDetails }: TicketCardProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // 1. Helper de color basado en el Enum real
  const getPriorityColor = (priority: TicketPriority) => {
    switch (priority) {
      case TicketPriority.URGENT: return colors.redAccent[500];
      case TicketPriority.HIGH: return colors.redAccent[400];
      case TicketPriority.MEDIUM: return colors.blueAccent[500];
      case TicketPriority.LOW: return colors.greenAccent[500];
      default: return colors.grey[100];
    }
  };

  // 2. Helper para traducir el Enum a español para mostrarlo en el Chip
  const getPriorityLabel = (priority: TicketPriority) => {
    const map = {
      [TicketPriority.URGENT]: 'URGENTE',
      [TicketPriority.HIGH]: 'ALTA',
      [TicketPriority.MEDIUM]: 'MEDIA',
      [TicketPriority.LOW]: 'BAJA',
    };
    return map[priority] || priority;
  };

  // 3. Formateo de fecha (backend manda ISO string)
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date); // Ej: "18 nov, 14:30"
  };

  return (
    <Grid size={{xs:12 ,sm:6 ,md:4}} >
      <Card 
        sx={{ 
          bgcolor: colors.primary[400], 
          borderLeft: `6px solid ${getPriorityColor(report.priority)}`,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'transform 0.2s',
          '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: `0 4px 20px 0 rgba(0,0,0,0.2)`
          }
        }}
      >
        <CardContent>
          {/* Cabecera: Chip Prioridad y Fecha */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Chip 
              label={getPriorityLabel(report.priority)} 
              size="small" 
              sx={{ 
                bgcolor: getPriorityColor(report.priority), 
                color: '#fff', 
                fontWeight: 'bold',
                height: '24px',
                fontSize: '0.7rem'
              }} 
            />
            <Typography variant="caption" color={colors.grey[300]}>
              {formatDate(report.date)}
            </Typography>
          </Stack>

          {/* Contenido Principal */}
          <Typography variant="h5" fontWeight="bold" color={colors.grey[100]} gutterBottom>
            {report.category}
          </Typography>
          
          <Typography variant="h6" color={colors.greenAccent[400]} mb={1}>
            {report.subject}
          </Typography>

          <Typography variant="body2" color={colors.grey[300]} mb={2} sx={{
             display: '-webkit-box',
             overflow: 'hidden',
             WebkitBoxOrient: 'vertical',
             WebkitLineClamp: 3, // Corta el texto a 3 lineas
          }}>
            {report.description}
          </Typography>

          {/* Footer: Usuario + Botón */}
          <Box mt={2} pt={2} borderTop={`1px solid ${colors.primary[500]}`}>
              <Box display="flex" alignItems="center" mb={2}>
                 {/* Avatar: Usa la imagen si existe, sino la inicial */}
                 <Avatar 
                    src={report.user.image || undefined}
                    alt={report.user.name}
                    sx={{ bgcolor: colors.blueAccent[500], width: 35, height: 35, mr: 1.5 }}
                 >
                    {!report.user.image && report.user.name[0]}
                 </Avatar>
                 
                 <Box>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
                      {report.user.name}
                    </Typography>
                    <Typography variant="caption" color={colors.greenAccent[500]}>
                      {report.user.role}
                    </Typography>
                 </Box>
              </Box>

              {/* BOTÓN VER DETALLES */}
              <Button 
                variant="outlined" 
                color="secondary" 
                fullWidth 
                startIcon={<Visibility />}
                onClick={() => onViewDetails(report)}
                sx={{ 
                  textTransform: 'none',
                  fontWeight: 'bold',
                  borderColor: colors.greenAccent[400],
                  color: colors.greenAccent[400],
                  '&:hover': {
                    borderColor: colors.greenAccent[200],
                    color: colors.greenAccent[200]
                  }
                 }}
              >
                Ver Detalles
              </Button>
          </Box>

        </CardContent>
      </Card>
    </Grid>
  );
};