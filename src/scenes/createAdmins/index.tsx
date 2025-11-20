import { Box, Button, TextField, CircularProgress } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useRegisterAdmin } from "../../helpers/auth/registerAdminFucntions.auth";


const AdminRegister = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const {
    userData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useRegisterAdmin();

  return (
    <Box sx={{ m: "auto" }}>
      <Header title="CREAR ADMINISTRADOR" subtitle="Crear un nuevo perfil de Admin" />

      <form onSubmit={handleSubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {/* CAMPO DE NOMBRE */}
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Nombre Completo"
            onChange={handleChange}
            value={userData.fullname} 
            name="name" 
            error={!!errors?.name} 
            helperText={errors?.name?._errors[0]}
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
        
        <Box display="flex" justifyContent="end" mt="20px">
          <Button 
            type="submit" 
            color="secondary" 
            variant="contained"
            disabled={isSubmitting} 
            sx={{ height: '45px', minWidth: '150px' }}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Crear Nuevo Admin"
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AdminRegister;