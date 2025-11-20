import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar"; // <--- IMPORTA SubMenu
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { UserRole } from "../../enums/userRole.enum";

// Iconos
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined'; // Para métricas
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'; // Para finanzas

interface ItemProps {
  title: string;
  to: string;
  icon: React.ReactNode; 
}

const Item = ({ title, to, icon }: ItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={isActive} 
      style={{ color: colors.grey[100] }}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} /> 
    </MenuItem>
  );
};

const Sidebar = () => {
  const { user } = useAuthStore();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        // Estilos específicos para SubMenu
        "& .pro-sub-menu .pro-inner-item": {
           color: colors.grey[100],
        },
        "& .pro-sub-menu .pro-menu-item.active": {
           color: "#6870fa !important",
        }
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          
          {/* LOGO Y BOTÓN COLAPSAR */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ margin: "10px 0 20px 0", color: colors.grey[100] }}
          >
            {!isCollapsed && (
              <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", ml: "15px" }}>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* PERFIL DE USUARIO */}
          {!isCollapsed && (
            <Box sx={{ mb: "25px" }}>
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={user?.profile_image || "https://via.placeholder.com/100"} 
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h3" color={colors.grey[100]} fontWeight="bold" sx={{ m: "10px 0 0 0" }}>
                  {user?.fullname}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {user?.role === UserRole.ADMIN ? "Admin" : "Super Admin"}
                </Typography>
              </Box>
            </Box>
          )}

          {/* ITEMS DEL MENÚ */}
          <Box sx={{ paddingLeft: isCollapsed ? undefined : "10%" }}>
            <Item title="Dashboard" to="/" icon={<HomeOutlinedIcon />} />

            {/* GESTIÓN */}
            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
              Gestión
            </Typography>
            <Item title="Doctores" to="/panel-doctores" icon={<PeopleOutlinedIcon />} />
            <Item title="Especialidades" to="/especialidades" icon={<CategoryOutlinedIcon />} />

            {/* OPERACIONES (Aquí está el cambio) */}
            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
              Operaciones
            </Typography>
            <Item title="Calendario General" to="/calendario" icon={<CalendarMonthOutlinedIcon />} />
            
            {/* SUBMENU FINANZAS */}
            <SubMenu 
              title="Finanzas"
              icon={<MonetizationOnOutlinedIcon />}
              style={{ color: colors.grey[100] }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
               {/* Item 1: La tabla de pagos que ya hiciste */}
               <Item title="Liquidaciones" to="/pagos" icon={<PaymentOutlinedIcon />} />
               
               {/* Item 2: Aquí irían tus rankings y gráficas semanales */}
               <Item title="Métricas y Ranking" to="/finanzas/metricas" icon={<AssessmentOutlinedIcon />} />
            </SubMenu>

            {/* SOPORTE */}
            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
              Soporte
            </Typography>
            <Item title="Reporte de Errores" to="/soporte" icon={<BugReportOutlinedIcon />} />

            {/* PLATAFORMA */}
            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
              Plataforma
            </Typography>
            <Item title="Configuración" to="/settings" icon={<SettingsOutlinedIcon />} />
            <Item title="FAQ" to="/faq" icon={<QuestionAnswerIcon />} />

          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;