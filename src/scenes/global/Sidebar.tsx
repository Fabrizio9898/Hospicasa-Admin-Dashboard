import { useState } from "react";
import React from "react"; 
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useAuthStore } from "../../store/auth.store";
import { UserRole } from "../../enums/userRole.enum";
import { Link, useLocation } from "react-router-dom";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
interface ItemProps {
  title: string;
  to: string;
  icon: React.ReactNode; 
}

// 3. APLICA LA INTERFACE AL COMPONENTE
const Item = ({ title, to, icon }: ItemProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <MenuItem
      active={isActive} 
      style={{
        color: colors.grey[100],
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} /> 
    </MenuItem>
  );
};

const Sidebar = () => {
  const {user}=useAuthStore()
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
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              // 4. CORRECCIÓN DE MUI v5: Mover props a 'sx'
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  ml: "15px",
                }}
              >
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box sx={{ mb: "25px" }}>
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={user?.profile_image} 
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
{user?.name}                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
{user?.role===UserRole.ADMIN?"Admin":"Super Admin"}                </Typography>
              </Box>
            </Box>
          )}

          <Box sx={{ paddingLeft: isCollapsed ? undefined : "10%" }}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Gestion
            </Typography>

            <Item
              title="Doctores"
              to="/panel-doctores"
              icon={<PeopleOutlinedIcon />}
              
            />

            <Item
    title="Especialidades"
    to="/gestion/especialidades" 
    icon={<CategoryOutlinedIcon />}
  />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Operaciones
            </Typography>
           <Item
    title="Calendario General"
    to="/calendario" 
    icon={<CalendarMonthOutlinedIcon />}
  />
  <Item
    title="Reporte de Pagos"
    to="/finanzas/pagos" 
    icon={<PaymentOutlinedIcon />}
  />

  <Typography
    variant="h6"
    color={colors.grey[300]}
    sx={{ m: "15px 0 5px 20px" }}
  >
    Soporte
  </Typography>
  <Item
    title="Reporte de Errores"
    to="/soporte" 
    icon={<BugReportOutlinedIcon />}
  />

<Typography
    variant="h6"
    color={colors.grey[300]}
    sx={{ m: "15px 0 5px 20px" }}
  >
    Plataforma
  </Typography>
  <Item
    title="Gestión de Staff"
    to="/plataforma/staff" 
    icon={<AdminPanelSettingsOutlinedIcon />}
  />
  <Item
    title="Configuración"
    to="/settings" 
    icon={<SettingsOutlinedIcon />}
  />
  <Item
    title="FAQ"
    to="/faq" 
    icon={<QuestionAnswerIcon />}
  />

          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;