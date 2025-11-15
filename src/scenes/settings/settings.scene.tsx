import { Box, Typography, useTheme, Button, Stack, Tabs, Tab } from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";
import { tokens } from "../../theme";
import { Theme } from '@mui/material/styles';
import { useState } from "react"; // Necesario para los Tabs


const SettingsLayout = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation(); 
  const currentTab = location.pathname;

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
                border: (theme: Theme) => theme.palette.mode === 'light' // <-- EL BORDE
                  ? '1px solid rgb(36, 36, 36)'
                  : `1px solid ${tokens('dark').grey[200]}`,
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
                      : `6px 6px 0 0 ${tokens('dark').grey[200]}`,
                  bgcolor: 'rgb(229 126 208)',
                },
              }}
            >
              Guardar Cambios
            </Button>
          </Box>
        </Stack>
        <Box sx={{
        gap:".25rem * 3"
        }} >
          <Tabs
            value={currentTab}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            aria-label="pestañas de configuración"
          >
            <Tab
              label="Configuración"
              component={Link}
              to="/settings"
              value="/settings"
              sx={{
                padding:"0"

              }} // El 'value' debe coincidir con el 'to'
            />

             <Tab
              label="Perfil"
              component={Link}
              to="/profile"
              value="/settings/profile"
              sx={{
                padding:"0"

              }} // El 'value' debe coincidir con el 'to'
            />

            <Tab
              label="Equipo"
              component={Link}
              to="/settings/equipo" // Asumo esta ruta
              value="/settings/equipo"
               sx={{
                padding:"0"
                
              }}
            />
            <Tab
              label="Pagos"
              component={Link}
              to="/settings/pagos" // Asumo esta ruta
              value="/settings/pagos"
               sx={{
                padding:"0"
                
              }}
            />
            <Tab
              label="Contraseña"
              component={Link}
              to="/settings/password" // Asumo esta ruta
              value="/settings/password"
               sx={{
                padding:"0"
                
              }}
            />
          </Tabs>
        </Box>
      </Box>
      <Box p={{ xs: 2, md: 4 }}>
        <Outlet /> 
      </Box>
    </Stack>
  );
};

export default SettingsLayout;