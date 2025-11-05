import { useState } from "react";
// 1. IMPORTA 'React' PARA USAR LOS TIPOS
import React from "react"; 
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useAuthStore } from "../../store/auth.store";
import { UserRole } from "../../enums/userRole.enum";

// 2. DEFINE LA "FORMA" (INTERFACE) DE LAS PROPS DE 'Item'
interface ItemProps {
  title: string;
  to: string;
  icon: React.ReactNode; // 'ReactNode' es el tipo para un icono JSX
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

// 3. APLICA LA INTERFACE AL COMPONENTE
const Item = ({ title, to, icon, selected, setSelected }: ItemProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
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
  const [selected, setSelected] = useState("Dashboard");

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
            // 4. CORRECCIÓN DE MUI v5: Mover 'mb' a 'sx'
            <Box sx={{ mb: "25px" }}>
              {/* 4. CORRECCIÓN DE MUI v5: Mover props a 'sx' */}
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={user?.profile_image} // (Asegúrate que esto esté en 'public/assets/user.png')
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              {/* 4. CORRECCIÓN DE MUI v5: Mover 'textAlign' a 'sx' */}
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

          {/* 4. CORRECCIÓN DE MUI v5: Mover 'paddingLeft' a 'sx' */}
          <Box sx={{ paddingLeft: isCollapsed ? undefined : "10%" }}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Contacts Information"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoices Balances"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Team
            </Typography>
            <Item
              title="Profile Form"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;