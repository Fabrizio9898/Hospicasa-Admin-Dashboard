import { useEffect } from "react";
import { 
  Box, 
  Button, 
  TextField, 
  CircularProgress, 
  Typography, 
  Avatar, 
  useTheme,
  Select,
  MenuItem,
  FormControl,
  Alert
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import { useRegisterAdmin } from "../../../helpers/auth/registerAdminFucntions.auth";
import { tokens } from "../../../theme";
import { useQuery } from "@tanstack/react-query"; // <--- REACT QUERY
import { getAdmins } from "../../../api/utils/getAdmins.util"; // Asumo que tu función está aquí

// Interfaz para los datos
interface AdminUser {
  id: string;
  fullname: string;
  email: string;
  role: "ADMIN" | "SUPER_ADMIN";
  profile_image?: string;
}

const AdminRegister = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // --- 1. REACT QUERY PARA TRAER ADMINS ---
  const { 
    data: adminsList = [], // Valor por defecto [] evita el error .map undefined
    isLoading, 
    isError,
    refetch 
  } = useQuery({
    queryKey: ['admins'], // Clave única para cache
    queryFn: getAdmins,   // Tu función importada
  });

  const {
    userData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useRegisterAdmin();

  // --- 2. RECARGAR LISTA AL CREAR ---
  // Detectamos si el formulario se limpió (señal de éxito en tu hook) para recargar la lista
  useEffect(() => {
    if (!isSubmitting && userData.email === "") {
        refetch();
    }
  }, [isSubmitting, userData.email, refetch]);

  return (
    <Box sx={{ m: "auto" }}>
      <Header title="CREAR ADMINISTRADOR" subtitle="Crear un nuevo perfil de Admin" />

      {/* --- FORMULARIO --- */}
      <form onSubmit={handleSubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Nombre Completo"
            onChange={handleChange}
            value={userData.fullname} 
            name="fullname" 
            error={!!errors?.fullname} 
            helperText={errors?.fullname?._errors[0]}
            disabled={isSubmitting}
            sx={{ gridColumn: "span 4" }}
          />
          
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Email"
            onChange={handleChange}
            value={userData.email} 
            name="email" 
            error={!!errors?.email} 
            helperText={errors?.email?._errors[0]} 
            disabled={isSubmitting}
            sx={{ gridColumn: "span 4" }}
          />
        </Box>
        
        <Box display="flex" justifyContent="end" mt="20px" mb={6}>
          <Button 
            type="submit" 
            color="secondary" 
            variant="contained"
            disabled={isSubmitting} 
            sx={{ height: '45px', minWidth: '150px', fontWeight: 'bold' }}
          >
            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Crear Nuevo Admin"}
          </Button>
        </Box>
      </form>

      {/* --- SECCIÓN TEAM MEMBERS (ESTILO FOTO) --- */}
      <Box mt={4}>
        <Typography variant="h4" color={colors.grey[100]} fontWeight="bold" mb={3}>
          Miembros de equipo
        </Typography>

        {isLoading ? (
           <Box display="flex" justifyContent="center" p={4}><CircularProgress color="secondary" /></Box>
        ) : isError ? (
           <Alert severity="error">Error al cargar la lista de administradores.</Alert>
        ) : (
          <Box 
            sx={{
              border: `1px solid ${colors.grey[700]}`,
              borderRadius: "4px",
              backgroundColor: theme.palette.background.paper,
              overflow: "hidden" // Para que los bordes redondeados funcionen
            }}
          >
            {/* HEADER DE LA TABLA */}
            <Box 
              display="flex" 
              justifyContent="space-between"
              alignItems="center"
              p="16px 24px"
              borderBottom={`1px solid ${colors.grey[700]}`}
              bgcolor={colors.primary[400]} // Un tono sutilmente diferente para el header
            >
                <Typography variant="subtitle1" fontWeight="bold" color={colors.grey[100]}>
                    Member
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold" color={colors.grey[100]} sx={{ width: { xs: '120px', sm: '200px'} }}>
                    Role
                </Typography>
            </Box>

            {/* FILAS DE LA TABLA */}
            {adminsList.map((admin: AdminUser, index: number) => (
              <Box 
                key={admin.id}
                display="flex" 
                justifyContent="space-between"
                alignItems="center"
                p="16px 24px"
                borderBottom={index !== adminsList.length - 1 ? `1px solid ${colors.grey[800]}` : 'none'}
                sx={{
                    transition: "0.2s",
                    "&:hover": { backgroundColor: colors.primary[400] }
                }}
              >
                {/* COLUMNA IZQUIERDA: AVATAR + DATOS */}
                <Box display="flex" alignItems="center" gap={2}>
                   <Avatar 
                      src={admin.profile_image} 
                      alt={admin.fullname}
                      sx={{ 
                          bgcolor: colors.greenAccent[500],
                          width: 40, 
                          height: 40,
                          border: `1px solid ${colors.grey[700]}`
                      }}
                   >
                      {admin.fullname.charAt(0).toUpperCase()}
                   </Avatar>
                   <Box>
                      <Typography variant="body1" color={colors.grey[100]} fontWeight="600">
                        {admin.fullname}
                      </Typography>
                      <Typography variant="body2" color={colors.grey[300]}>
                        {admin.email}
                      </Typography>
                   </Box>
                </Box>

                {/* COLUMNA DERECHA: SELECT (SOLO LECTURA O VISUAL) */}
                <Box sx={{ width: { xs: '120px', sm: '200px'} }}>
                    <FormControl fullWidth size="small">
                        <Select
                            value={admin.role ? admin.role.toUpperCase() : ''}
                            readOnly // Hacemos que parezca un select pero no se edita aquí
                            sx={{
                                height: '40px',
                                backgroundColor: theme.palette.background.default,
                                color: colors.grey[100],
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: colors.grey[600],
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: colors.grey[500],
                                },
                                '& .MuiSelect-icon': {
                                    color: colors.grey[400]
                                }
                            }}
                        >
                            <MenuItem value="SUPER_ADMIN">Super Admin</MenuItem>
                            <MenuItem value="ADMIN">Admin</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
              </Box>
            ))}

            {adminsList.length === 0 && (
                <Box p={3} textAlign="center">
                    <Typography color={colors.grey[300]}>No hay miembros en el equipo.</Typography>
                </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AdminRegister;