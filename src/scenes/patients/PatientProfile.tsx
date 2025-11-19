import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Para leer el ID de la URL
import {
  Box, Typography, Avatar, Grid, Paper, Tabs, Tab, 
  Chip, Button, Divider, useTheme, CircularProgress,
  List, ListItem, ListItemText, ListItemAvatar
} from '@mui/material';
import { 
  Email, CalendarMonth, History, ConfirmationNumber, 
  ArrowBack, MedicalServices 
} from '@mui/icons-material';
import { tokens } from '../../theme';
import { useUserDetail } from '../../hooks/usePatientDetail.hook';
import { AppointmentType } from '../../types/appointment.type';
import { AppointmentStatus } from '../../enums/appointmentStatus.enum';
import { Ticket } from '../../types/ticket.type';
import { TicketPatientPreviewType } from '../../types/patient.type';

// Componente auxiliar para paneles de pestañas
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export const UserProfile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams(); // <--- AQUÍ OBTENEMOS EL ID DE LA URL
  const navigate = useNavigate();
  
  const [tabValue, setTabValue] = useState(0);
  
  // Llamada a React Query
  const { data: user, isLoading, isError } = useUserDetail(id || '');

  if (isLoading) return <Box display="flex" justifyContent="center" mt={10}><CircularProgress /></Box>;
  if (isError || !user) return <Typography>Error al cargar usuario o no encontrado.</Typography>;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box m="20px">
      {/* --- HEADER CON BOTÓN VOLVER --- */}
      <Box display="flex" alignItems="center" mb={3}>
        <Button 
            startIcon={<ArrowBack />} 
            onClick={() => navigate(-1)} 
            sx={{ color: colors.grey[100], mr: 2 }}
        >
            Volver
        </Button>
        <Typography variant="h3" fontWeight="bold" color={colors.grey[100]}>
          Perfil del Paciente
        </Typography>
      </Box>

      <Grid container spacing={3}>
        
        {/* --- TARJETA PRINCIPAL (Izquierda) --- */}
        <Grid size={{xs:12 ,md:4}}>
          <Paper elevation={3} sx={{ p: 3, bgcolor: colors.primary[400], textAlign: 'center', borderRadius: '12px' }}>
            <Avatar 
              src={user.profile_image} 
              sx={{ width: 120, height: 120, margin: '0 auto', mb: 2, border: `4px solid ${colors.greenAccent[500]}` }}
            />
            <Typography variant="h4" fontWeight="bold" gutterBottom>{user.fullname}</Typography>
            <Chip label={user.role} color="secondary" variant="outlined" sx={{ mb: 2 }} />
            
            <Divider sx={{ my: 2 }} />
            
            <Box display="flex" alignItems="center" gap={1} mb={1} justifyContent="center">
              <Email sx={{ color: colors.greenAccent[500] }} />
              <Typography color={colors.grey[100]}>{user.email}</Typography>
            </Box>
            
            <Box display="flex" alignItems="center" gap={1} justifyContent="center">
              <CalendarMonth sx={{ color: colors.greenAccent[500] }} />
              <Typography color={colors.grey[100]}>
                Miembro desde: {new Date(user.createdAt).toLocaleDateString()}
              </Typography>
            </Box>

            {/* Estadísticas Rápidas */}
            <Box display="flex" justifyContent="space-around" mt={4} p={2} bgcolor={colors.primary[500]} borderRadius="8px">
               <Box>
                  <Typography variant="h3" color={colors.greenAccent[500]}>{user.appointments?.length || 0}</Typography>
                  <Typography variant="caption">Citas</Typography>
               </Box>
               <Box>
                  <Typography variant="h3" color={colors.redAccent[500]}>{user.supportTickets?.length || 0}</Typography>
                  <Typography variant="caption">Tickets</Typography>
               </Box>
            </Box>
          </Paper>
        </Grid>

        {/* --- PANELES DE DETALLE (Derecha) --- */}
        <Grid size={{xs:12 ,md:8}}>
          <Paper elevation={3} sx={{ bgcolor: colors.primary[400], borderRadius: '12px', overflow: 'hidden', minHeight: '500px' }}>
            <Tabs 
                value={tabValue} 
                onChange={handleTabChange}
                textColor="secondary"
                indicatorColor="secondary"
                variant="fullWidth"
                sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab icon={<MedicalServices />} label="Historial Citas" iconPosition="start" />
              <Tab icon={<ConfirmationNumber />} label="Soporte / Tickets" iconPosition="start" />
              <Tab icon={<History />} label="Reseñas" iconPosition="start" />
            </Tabs>

            {/* --- PANEL 1: CITAS --- */}
            <TabPanel value={tabValue} index={0}>
              <Typography variant="h5" mb={2} fontWeight="bold">Consultas Médicas</Typography>
              {user.appointments && user.appointments.length > 0 ? (
                <List>
                 {user.appointments.map((appt: AppointmentType) => (
  <Paper key={appt.id} sx={{ mb: 2, bgcolor: colors.primary[500], p: 1 }}>
    <ListItem>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: colors.blueAccent[500] }}>
          <MedicalServices />
        </Avatar>
      </ListItemAvatar>
      <ListItemText 
        primary={`Dr. ${appt.doctor?.fullname || 'Desconocido'}`}
    
        secondary={new Date(appt.dateHour).toLocaleString()}
        
        primaryTypographyProps={{ fontWeight: 'bold', color: colors.grey[100] }}
        secondaryTypographyProps={{ color: colors.grey[300] }}
      />
      <Chip 
        label={appt.status} 
        size="small" 
                color={appt.status === AppointmentStatus.COMPLETED ? 'success' : 'default'} 
      />
    </ListItem>
  </Paper>
))}
                </List>
              ) : (
                <Typography color={colors.grey[300]}>Este usuario no ha agendado citas aún.</Typography>
              )}
            </TabPanel>

            {/* --- PANEL 2: TICKETS --- */}
            <TabPanel value={tabValue} index={1}>
              <Typography variant="h5" mb={2} fontWeight="bold">Tickets de Soporte</Typography>
              {user.supportTickets && user.supportTickets.length > 0 ? (
                  user.supportTickets.map((ticket: TicketPatientPreviewType) => (
                    <Box key={ticket.id} p={2} mb={2} bgcolor={colors.primary[500]} borderRadius="4px" borderLeft={`4px solid ${colors.redAccent[500]}`}>
                        <Box display="flex" justifyContent="space-between">
                            <Typography fontWeight="bold">{ticket.category}
                              
                            </Typography>
                            <Chip label={ticket.status} size="small" />
                        </Box>
                    </Box>
                  ))
              ) : (
                 <Typography color={colors.grey[300]}>Sin tickets reportados.</Typography>
              )}
            </TabPanel>

             {/* --- PANEL 3: RESEÑAS --- */}
             <TabPanel value={tabValue} index={2}>
                 <Typography>Aquí irían las reseñas que dejó el usuario a los doctores.</Typography>
             </TabPanel>

          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};