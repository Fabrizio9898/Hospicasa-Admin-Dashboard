import { Box } from '@mui/material';
import { GoogleCalendar } from '../../components/GoogleCalendar';

export const AdminAgenda = () => {
  return (
    <Box m="20px" height="75vh">
       {/* Pasas el email del admin si el calendario es público o compartido con él */}
       <GoogleCalendar 
          title="Mi Calendario Personal"
       />
    </Box>
  );
};