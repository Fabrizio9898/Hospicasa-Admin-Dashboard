import { Box, Typography, useTheme, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom"; // Importa Outlet y Link
import { tokens } from "../../theme";
import Header from "../../components/Header";
import  { ReactNode } from "react";
import '../../styles/settings.style.css';

// Un helper para que los links del menú sepan si están "activos"
const NavLink = ({ to,children }:{to:string,children:ReactNode}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <ListItemButton
      component={Link}
      to={to}
      selected={isActive} // <-- Esto lo resalta
      sx={{
        borderRadius: "8px",
        "&.Mui-selected": {
          backgroundColor: "rgba(104, 112, 250, 0.1)", // (Un color de acento)
          "&:hover": {
            backgroundColor: "rgba(104, 112, 250, 0.2)",
          }
        },
      }}
    >
      <ListItemText primary={children} />
    </ListItemButton>
  );
};


const SettingsLayout = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', }}>
      <Box
  component="header" // (Para que siga siendo un <header> en el HTML)
  sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: 2, // (16px)
    borderBottom: '1px solid',
    borderColor: 'divider',  
    p: { xs: 2, md: 4 },     
  }}
>
    <div className="flex items-center justify-between gap-2"><h1 className="line-clamp-2 hidden! text-2xl sm:block!">CONFIGURACIÓN</h1>
    <div className="grid flex-1 grid-cols-2 gap-2 has-[&gt;*:only-child]:grid-cols-1 sm:flex sm:flex-none md:-my-2"><button className="button-accent" type="button">Guardar Cambios</button>
    </div>
    </div>
<div role="tablist" className="flex gap-3 overflow-x-auto">
  <a className="shrink-0 rounded-full border px-3 py-2 no-underline hover:border-border border-border bg-background text-foreground" role="tab" aria-selected="true" href="/settings">Configuración</a>
        <a className="shrink-0 rounded-full border px-3 py-2 no-underline hover:border-border border-border bg-background text-foreground" role="tab" aria-selected="true" href="/settings">Equipo</a>
        <a className="shrink-0 rounded-full border px-3 py-2 no-underline hover:border-border border-border bg-background text-foreground" role="tab" aria-selected="true" href="/settings">Pagos</a>
       <a className="shrink-0 rounded-full border px-3 py-2 no-underline hover:border-border border-border bg-background text-foreground" role="tab" aria-selected="true" href="/settings">Contraseña</a>
    </div>
       
</Box>
    </div>
  );
};

export default SettingsLayout;