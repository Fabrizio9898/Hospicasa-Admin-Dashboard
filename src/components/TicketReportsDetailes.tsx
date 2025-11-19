import { useState } from 'react';
import { 
  Box, Typography, Divider, Chip, Button, useTheme, Avatar, Grid,
  TextField, IconButton, Alert
} from '@mui/material';
import { 
  Close, Event, Payment, Block, CheckCircle, Cancel, 
  CurrencyExchange, VideocamOff, Gavel, PersonOff 
} from '@mui/icons-material';
import { tokens } from '../theme'; 
import { Ticket } from '../types/ticket.type'; 
import { modalStyle } from '../scenes/doctor-profile/doctorProfile.scene';
import { TicketCategory } from '../enums/tickets/ticketCategory.enum';
import { TicketStatus } from '../enums/tickets/ticketStatus.enum';
import { TicketPriority } from '../enums/tickets/ticketPriority.enum';
import { TicketReason } from '../enums/tickets/ticketReason.enum'; // <--- IMPORTANTE
import { useNavigate } from 'react-router-dom';

interface TicketDetailProps {
  ticket: Ticket;
  onClose: () => void;
}

export const TicketDetail = ({ ticket, onClose }: TicketDetailProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [adminNote, setAdminNote] = useState(ticket.adminResponse || '');
  const navigate = useNavigate(); // <--- 2. INICIALIZAR EL HOOK

  // --- CEREBRO DE ACCIONES ---
  const renderSmartActions = () => {
    // 1. PRIORIDAD: Miramos el MOTIVO ESPECÍFICO (Reason)
    if (ticket.reason) {
      switch (ticket.reason) {
        
        case TicketReason.DOCTOR_NO_SHOW:
          return (
            <Box p={2} bgcolor="background.default" borderRadius="8px" mb={2} borderLeft={`4px solid ${colors.redAccent[500]}`}>
               <Typography variant="subtitle2" fontWeight="bold" color={colors.redAccent[200]} mb={1} display="flex" alignItems="center" gap={1}>
                 <Gavel fontSize="small"/> Ausencia del Profesional
               </Typography>
               <Alert severity="error" sx={{ mb: 2 }}>
                 El doctor no asistió a la cita. Corresponde devolución total.
               </Alert>
               <Box display="flex" gap={1}>
                 <Button variant="contained" color="error" size="small" onClick={() => console.log('Reembolsar y Sancionar')}>
                    Reembolsar & Sancionar Doc
                 </Button>
                 <Button variant="outlined" color="secondary" size="small">Ver Cita</Button>
               </Box>
            </Box>
          );

    

        case TicketReason.AUDIO_VIDEO_FAIL:
        case TicketReason.APP_CRASH:
           return (
            <Box p={2} bgcolor="background.default" borderRadius="8px" mb={2} borderLeft={`4px solid ${colors.greenAccent[500]}`}>
               <Typography variant="subtitle2" fontWeight="bold" color={colors.greenAccent[200]} mb={1} display="flex" alignItems="center" gap={1}>
                 <VideocamOff fontSize="small"/> Falla Técnica
               </Typography>
               <Box display="flex" gap={1}>
                 <Button variant="contained" color="warning" size="small">Reagendar Gratis</Button>
                 <Button variant="outlined" color="secondary" size="small">Ver Logs</Button>
               </Box>
            </Box>
           );
      }
    }

    // 2. FALLBACK: Si no hay Reason específico, miramos la CATEGORÍA GENERAL
    switch (ticket.category) {
      case TicketCategory.PAYMENT_ISSUE:
        return (
          <Box p={2} bgcolor="background.default" borderRadius="8px" mb={2} borderLeft={`4px solid ${colors.blueAccent[500]}`}>
            <Typography variant="subtitle2" fontWeight="bold" mb={1} display="flex" alignItems="center" gap={1}>
              <Payment fontSize="small" /> Gestión de Pagos
            </Typography>
            <Box display="flex" gap={1}>
              <Button variant="outlined" color="info" size="small">Ver en MP</Button>
              <Button variant="contained" color="error" size="small">Reembolsar</Button>
            </Box>
          </Box>
        );
      
      case TicketCategory.REPORT_USER:
         return (
          <Box p={2} bgcolor="background.default" borderRadius="8px" mb={2} borderLeft={`4px solid ${colors.redAccent[500]}`}>
             <Typography variant="subtitle2" fontWeight="bold" mb={1} display="flex" alignItems="center" gap={1}>
              <Block fontSize="small" /> Seguridad
            </Typography>
            <Button variant="outlined" color="error" size="small" startIcon={<Block />}>Bloquear Usuario</Button>
          </Box>
         );

      default:
        return null; // Sin acciones especiales
    }
  };

  return (
    <Box sx={{ ...modalStyle(colors), maxHeight: '90vh', overflowY: 'auto' }}>
      
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
        <Box>
            <Typography variant="h3" color="text.primary" fontWeight="bold">
              Ticket #{ticket.id.split('-')[1] || ticket.id.slice(0,6)}
            </Typography>
            {/* Muestra la RAZÓN si existe, es lo más importante */}
            {ticket.reason && (
               <Chip 
                 label={ticket.reason} 
                 color="error" 
                 variant="filled" 
                 sx={{ mt: 1, fontWeight: 'bold' }} 
               />
            )}
            <Typography variant="caption" display="block" mt={1} color={colors.grey[400]}>
               {new Date(ticket.date).toLocaleString()}
            </Typography>
        </Box>
        <IconButton onClick={onClose}><Close sx={{ color: 'text.primary' }} /></IconButton>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* INFO RÁPIDA */}
      <Grid container spacing={2} mb={3}>
        <Grid size={{xs:12 ,sm:8}}>
            <Box display="flex" gap={1} mb={2}>
                <Chip 
                    label={ticket.status} 
                    sx={{ bgcolor: ticket.status === TicketStatus.OPEN ? colors.greenAccent[500] : colors.grey[500] }} 
                />
                <Chip 
                    label={ticket.priority} 
                    variant="outlined" 
                    color={ticket.priority === TicketPriority.URGENT ? 'error' : 'default'}
                />
                {/* Si ya mostramos la reason arriba, la categoría puede ir como chip simple */}
                <Chip label={ticket.category} variant="outlined" />
            </Box>
            
            <Typography variant="h4" color={colors.greenAccent[400]} fontWeight="bold" mb={1}>
                {ticket.subject || "Sin Asunto"}
            </Typography>
            
            <Box bgcolor="background.default" p={2} borderRadius="4px">
                <Typography variant="body1" color='white' sx={{ whiteSpace: 'pre-wrap' }}>
                {ticket.description}
                </Typography>
            </Box>
        </Grid>

        {/* DATOS USUARIO */}
        <Grid size={{xs:12 ,sm:4}} >
            <Box border={`1px solid ${colors.grey[700]}`} p={2} borderRadius="8px">
                <Typography variant="subtitle2" color={colors.grey[300]} mb={2}>REPORTADO POR:</Typography>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Avatar src={ticket.user.image || undefined} sx={{ width: 48, height: 48 }}>
                        {!ticket.user.image && ticket.user.name[0]}
                    </Avatar>
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
                            {ticket.user.name}
                        </Typography>
                        <Typography variant="caption" color={colors.greenAccent[500]}>
                            {ticket.user.role}
                        </Typography>
                    </Box>
                </Box>
                <Button
                color="secondary"
                variant="outlined" size="small" fullWidth                     onClick={() => {
                  navigate(`/patient/profile/${ticket.user.id}`);
                }}>Ver Perfil</Button>
            </Box>
        </Grid>
      </Grid>

      <Divider sx={{ mb: 3 }} />

      {/* --- PANEL DE ACCIONES INTELIGENTES --- */}
      <Typography variant="h6" color={colors.grey[300]} mb={1} sx={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
          Panel de Resolución
      </Typography>
      
      {renderSmartActions()}

      {/* --- RESOLUCIÓN FINAL --- */}
      <Typography variant="h6" color="text.primary" fontWeight="bold" mt={3} mb={1}>
        Nota de Cierre
      </Typography>
      
      <TextField
        fullWidth
        multiline
        rows={3}
        variant="filled"
        placeholder="Escribe aquí la respuesta final al usuario o notas internas..."
        value={adminNote}
        onChange={(e) => setAdminNote(e.target.value)}
        disabled={ticket.status === TicketStatus.RESOLVED}
        sx={{ mb: 2, bgcolor: colors.primary[500], borderRadius: '4px' }}
      />

      <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
        <Button variant="text" color="secondary" onClick={onClose}>
          Cancelar
        </Button>

        {ticket.status !== TicketStatus.RESOLVED && (
            <>
                <Button 
                    variant="contained" 
                    color="error" 
                    startIcon={<Cancel />}
                    onClick={() => console.log("Rechazar ticket")}
                >
                    Rechazar
                </Button>
                
                <Button 
                    variant="contained" 
                    color="secondary" 
                    startIcon={<CheckCircle />}
                    onClick={() => console.log("Resolver ticket con nota:", adminNote)}
                >
                    Marcar como Resuelto
                </Button>
            </>
        )}
      </Box>
    </Box>
  );
};