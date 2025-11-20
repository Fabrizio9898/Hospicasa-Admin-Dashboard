import { useState, useEffect } from 'react';
import { 
  Box, Paper, Typography, CircularProgress, 
  TextField, Button,
} from '@mui/material';
import { CalendarMonth, Save, Edit, Info } from '@mui/icons-material';

interface GoogleCalendarEmbedProps {
  title?: string;
}

export const GoogleCalendar = ({ 
  title = "Mi Agenda Personal" 
}: GoogleCalendarEmbedProps) => {
  
  // Estados
  const [calendarId, setCalendarId] = useState<string | null>(null);
  const [inputEmail, setInputEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // 1. Al cargar, buscamos si ya guardó su email antes
  useEffect(() => {
    const savedEmail = localStorage.getItem('admin_calendar_id');
    if (savedEmail) {
      setCalendarId(savedEmail);
    }
  }, []);

  // 2. Guardar email
  const handleSave = () => {
    if (inputEmail.includes('@')) {
      localStorage.setItem('admin_calendar_id', inputEmail);
      setCalendarId(inputEmail);
      setIsLoading(true); // Reiniciar carga para el nuevo iframe
    }
  };

  // 3. Borrar email (Cambiar cuenta)
  const handleChangeAccount = () => {
    localStorage.removeItem('admin_calendar_id');
    setCalendarId(null);
    setInputEmail('');
  };

  // URL Constructora
  const getCalendarUrl = (id: string) => {
    const encodedId = encodeURIComponent(id);
    const timeZone = "America%2FArgentina%2FBuenos_Aires"; // Ajusta si es necesario
    return `https://calendar.google.com/calendar/embed?height=600&wkst=2&bgcolor=%23ffffff&ctz=${timeZone}&src=${encodedId}&color=%23039BE5&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=0`;
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 2, 
        bgcolor: 'background.paper', 
        borderRadius: '12px', 
        height: '100%',
        minHeight: '650px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold" color="text.primary" display="flex" alignItems="center" gap={1}>
          <CalendarMonth /> {title}
        </Typography>
        
        {/* Botón para cambiar cuenta si ya está configurada */}
        {calendarId && (
          <Button 
            size="small" 
            variant="outlined" 
            color="secondary" 
            startIcon={<Edit />} 
            onClick={handleChangeAccount}
          >
            Cambiar Cuenta
          </Button>
        )}
      </Box>

      <Box sx={{ 
        flexGrow: 1, 
        width: '100%', 
        borderRadius: '8px', 
        overflow: 'hidden', 
        border: '1px solid', 
        borderColor: 'divider',
        position: 'relative',
        bgcolor: 'background.default' 
      }}>
        
        {/* CASO 1: NO HAY CALENDARIO CONFIGURADO */}
        {!calendarId ? (
          <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center" 
            height="100%" 
            p={4}
            textAlign="center"
          >
            <CalendarMonth sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.primary" gutterBottom>
              Vincula tu Google Calendar
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3} maxWidth="400px">
              Ingresa tu correo de Gmail para ver tu agenda personal aquí mismo. 
              Este dato se guarda solo en tu navegador.
            </Typography>
            
            <Box display="flex" gap={1} width="100%" maxWidth="400px">
              <TextField 
                fullWidth 
                variant="outlined" 
                placeholder="tu.email@gmail.com"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                size="small"
                sx={{ bgcolor: 'background.paper' }}
              />
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={handleSave}
                startIcon={<Save />}
              >
                Guardar
              </Button>
            </Box>
            
            <Box mt={2} display="flex" alignItems="center" gap={1} bgcolor="action.hover" p={1} borderRadius={1}>
               <Info fontSize="small" color="info" />
               <Typography variant="caption" color="text.secondary">
                 Debes estar logueado en Google en este navegador.
               </Typography>
            </Box>
          </Box>
        ) : (
          /* CASO 2: HAY CALENDARIO -> MOSTRAR IFRAME */
          <>
            {isLoading && (
              <Box 
                position="absolute" 
                top="50%" 
                left="50%" 
                sx={{ transform: 'translate(-50%, -50%)', zIndex: 10 }}
              >
                <CircularProgress color="secondary" />
              </Box>
            )}

            <iframe 
              src={getCalendarUrl(calendarId)} 
              style={{ border: 0, width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} 
              width="800" 
              height="600" 
              frameBorder="0" 
              scrolling="no"
              onLoad={() => setIsLoading(false)}
              title="Google Calendar"
            />
          </>
        )}
      </Box>
    </Paper>
  );
};