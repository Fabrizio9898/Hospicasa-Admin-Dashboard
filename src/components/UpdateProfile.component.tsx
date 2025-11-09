import { Box, Typography, Button, TextField } from "@mui/material";

const UpdateProfileComponent = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight="600" mb={3}>
        Actualizar Perfil
      </Typography>
      
      {/* (Aquí iría tu formulario de React Hook Form + Zod) */}
      <TextField
        label="Email"
        variant="filled"
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Nueva Contraseña"
        type="password"
        variant="filled"
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="secondary">
        Guardar Cambios
      </Button>
    </Box>
  );
};

export default UpdateProfileComponent;