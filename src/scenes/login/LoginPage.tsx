import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useLoginFunctions } from '../../helpers/auth/loginFunctions.helper'; 

const LoginPage = () => {

  const { 
    userData, 
    errors, 
    isSubmitting,
    showPassword, 
    setShowPassword, 
    handleChange, 
    handleSubmit 
  } = useLoginFunctions();

  const toggleShowPassword = () => {  setShowPassword((prev) =>!prev);};

return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage:
          "url('/assets/admin-background.webp')", 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '25px', 
            padding: '50px', 
            borderRadius: '10px',
            backgroundColor: 'rgba(31, 42, 64, 0.9)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)', 
            minWidth: { xs: '320px', sm: '450px' }, 
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Typography
            variant="h3"
            color="white"
            textAlign="center"
            fontWeight="bold"
            mb={2}
          >
            Hospicasa Admin
          </Typography>

          <TextField
            label="Email"
            variant="filled"
            type="email"
            name="email" 
            value={userData.email}
            onChange={handleChange}
            error={!!errors?.email} 
            helperText={errors?.email?._errors[0]} 
            disabled={isSubmitting} 
            fullWidth
          />
          <TextField
            label="Contraseña"
            variant="filled"
            name="password" 
            type={showPassword ? 'text' : 'password'}
            value={userData.password}
            onChange={handleChange}
            error={!!errors?.password}
            helperText={errors?.password?._errors[0]}
            disabled={isSubmitting} 
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            disabled={isSubmitting} 
            sx={{ height: '56px' }} 
          >
            {isSubmitting ? (
              <CircularProgress size={26} color="inherit" />
            ) : (
              'Entrar'
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default LoginPage;