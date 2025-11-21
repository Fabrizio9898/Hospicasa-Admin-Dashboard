import { Box, Typography, useTheme, Button, Stack, Tabs, Tab } from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";
import { tokens } from "../../theme";
import { Theme } from '@mui/material/styles';
import { useAuthStore } from "../../store/auth.store";
import { UserRole } from "../../enums/userRole.enum";


const SettingsLayout = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation(); 
  const user = useAuthStore((state) => state.user);
  const currentTab = location.pathname;
const tabStyle = {
fontFamily: theme.typography.fontFamily ?? "sans-serif",
    fontWeight: 500,
    textTransform: 'none',    
    minWidth: 'auto',          
    borderRadius: '9999px',      
    paddingX: '0.75rem',      
    paddingY: '0.5rem',        
    border: '1px solid transparent', 
        color: 'text.primary',
    '&:hover': {
      borderColor: theme.palette.divider ,
      color: 'text.primary',
    },
    '&.Mui-selected': {
      backgroundColor: '#FFFFFF',
      color: 'rgb(36, 36, 36)', 
      fontWeight: 700, 
borderColor: colors.grey[200],
    }
  };

  return (
    // CAMBIO: Reemplazamos el <div> con <Stack> (un flexbox vertical por defecto)
    <Stack direction="column">
      <Box
        component="header" // (Esto está perfecto)
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderBottom: '1px solid',
          borderColor: 'divider', // <-- 'divider' es el color de borde de MUI
          p: { xs: 2, md: 4 },
        }}
      >
        {/* CAMBIO: Reemplazamos el <div> con clases "flex justify-between" 
          por un <Stack> de MUI.
        */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }} // Se apila en móvil, fila en desktop
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700, // Los H suelen ser 'bold'
              display: { xs: 'none', sm: 'block' }, // "hidden sm:block"
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            CONFIGURACIÓN
          </Typography>

     
          <Box
            sx={{
              width: { xs: '100%', sm: 'auto' }, // Ocupa todo en móvil
              display: { xs: 'grid', sm: 'flex' },
              flex: { xs: 1, sm: 'none' },
              gap: 2,
              my: { md: -2 }, // "md:-my-2"
            }}
          >
          
            <Button
              variant="contained"
              sx={{
                bgcolor: 'rgb(229 126 208)',
                color: 'rgb(36, 36, 36)',
                border: '1px solid rgb(36, 36, 36)',
                borderRadius: '0.25rem',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                fontFamily: 'inherit',
                fontSize: '1rem',
                lineHeight: 1.4,
                textTransform: 'none',
                transition: 'transform 0.15s ease-out, box-shadow 0.15s ease-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: (theme: Theme) =>
                    theme.palette.mode === 'light'
                      ? '6px 6px 0 0 #000000'
                      : `6px 6px 0 0 ${tokens('dark').grey[100]}`,
                  bgcolor: 'rgb(229 126 208)',
                },
              }}
            >
              Guardar Cambios
            </Button>
          </Box>
        </Stack>
    
        <Tabs
          value={currentTab}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="pestañas de configuración"
          slotProps={{
            indicator: { sx: { display: 'none' } } // Oculta línea azul
          }}
          sx={{
            '& .MuiTabs-flexContainer': { // Agrega gap
              gap: '12px',
            }
          }}
        >
          {/* --- 4. APLICAMOS EL MISMO ESTILO A TODOS --- */}
          <Tab
            label="Configuración"
            component={Link}
            to="/settings"
            value="/settings"
            sx={tabStyle} 
          />
{user?.role===UserRole.SUPER_ADMIN && (
 <Tab
            label="Equipo"
            component={Link}
            to="/settings/equipo"
            value="/settings/equipo"
            sx={tabStyle}
          />
)}
         
          {/* <Tab
            label="Pagos"
            component={Link}
            to="/settings/pagos"
            value="/settings/pagos"
            sx={tabStyle}
          /> */}
          <Tab
            label="Contraseña"
            component={Link}
            to="/settings/password"
            value="/settings/password"
            sx={tabStyle}
          />
        </Tabs>
      </Box>
      <Box p={{ xs: 2, md: 4 }}>
        <Outlet /> 
      </Box>
    </Stack>
  );
};

export default SettingsLayout;