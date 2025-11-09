import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { ColorModeContext } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import '../../styles/topbar.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LogoutIcon from '@mui/icons-material/Logout';import { Link } from "react-router-dom";
const Topbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // El dropdown
  const iconRef = useRef<HTMLButtonElement>(null);


useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Si el clic NO fue en el dropdown Y NO fue en el ícono
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        iconRef.current &&
        !iconRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false); // Cierra el dropdown
      }
    };
    // Agrega el listener
    document.addEventListener("mousedown", handleClickOutside);
    // Limpia el listener cuando el componente se "muere"
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
       <Box sx={{ position: "relative" }}>
          {/* 7. EL BOTÓN (LE AGREGAMOS EL REF Y EL ONCLICK) */}
          <IconButton 
            ref={iconRef} 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <PersonOutlinedIcon />
          </IconButton>

          {/* 8. EL DROPDOWN (EL "HIJO" HTML) */}
          {/* Renderizado condicional: solo se muestra si 'isDropdownOpen' es true */}
          {isDropdownOpen && (
          <div ref={dropdownRef} className="profile-dropdown">
            
            {/* 4. EL ITEM (tal como lo viste) */}
            <Link role="menuitem" to="/profile" className="dropdown-item">
              <span className="icon-span">
                {/* (Aquí pondrías tu ícono) */}
                <HomeOutlinedIcon fontSize="small" /> 
              </span>
              Perfil
            </Link>
            
            <Link role="menuitem" to="/logout" className="dropdown-item">
              <span className="icon-span">
                <LogoutIcon fontSize="small" />
              </span>
              Cerrar Sesión
            </Link>
          </div>
        )}
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
