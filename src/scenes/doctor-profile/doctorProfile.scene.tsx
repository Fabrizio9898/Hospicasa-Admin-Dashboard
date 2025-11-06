import { Box, Typography, useTheme, CircularProgress, Divider, Button } from "@mui/material";
import { ColorTokens, tokens } from "../../theme";
import { useState, useEffect } from 'react';
import { getDoctorDocuments } from "../../api/utils/getDoctorDocuments.util";
import { DoctorProfile, doctorProfileSchema } from "../../types/doctorProfile.type";
import z from "zod";

interface DoctorProfileProps {
  doctorId: string | null;
}

const modalStyle = (colors:ColorTokens) => ({ 
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',   
  maxWidth: '800px', 
  maxHeight: '85vh', 
  overflowY: 'auto', 
  bgcolor: colors.primary[400], 
  border: `1px solid ${colors.grey[700]}`,
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
});

export const DoctorProfileScene = ({ doctorId }: DoctorProfileProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 4. useEffect para buscar los datos
useEffect(() => {
    // Limpia los datos si el ID desaparece (ej: al cerrar el modal)
    if (!doctorId) {
      setDoctor(null);
      return;
    }

    const fetchProfile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getDoctorDocuments(doctorId);
        console.log(data);
        
        const validation = doctorProfileSchema.safeParse(data);
        if (!validation.success) {
          console.error("Error de Zod:",z.treeifyError(validation.error));
          throw new Error("La respuesta del servidor no tiene la forma esperada.");
        }
        setDoctor(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfile();
    
  }, [doctorId]);

  return (
    <Box sx={modalStyle(colors)}>
   {isLoading ? (
        <Box sx={{ m: 'auto' }}><CircularProgress color="secondary" /></Box>
      ) : error ? (
        <Typography color="error" sx={{ m: 'auto' }}>{error}</Typography>
      ) : doctor ? (
<>     <Box sx={{  display: 'flex', gap: 3 ,flexDirection:"column"}}>
  <Box sx={{
    display:"flex",
    justifyContent:"center",
    
  }}>    
     <Box
              component="img"
              alt="perfil"
              src={doctor.profile_image} 
              sx={{ width: 120, height: 120, border:"2px solid black"  }}
            />
            <Box sx={{
              flex:1,
              flexDirection:"column",
              marginLeft:"15px"

            }}>
              <Typography variant="h2" color={colors.grey[100]} fontWeight="bold">
                {(doctor.fullname).toUpperCase()}
              </Typography>
               <nav className="flex flex-wrap gap-4 mt-2">
{

}
               </nav>
              <Typography variant="body1" color={colors.grey[300]} sx={{ mt: 1 }}>
                Email: {doctor.email}
              </Typography>
              <Typography variant="body1" color={colors.grey[300]}>
                DNI: {doctor.dni}
              </Typography>
            </Box>
</Box>
       
            <Divider sx={{ borderColor: colors.grey[700] }} />

{/* --- 2. SECCIÓN DE CONTENIDO (CON SCROLL) --- */}
          <Box sx={{ p: 3, overflowY: 'auto', flex: 1 }}>
            
            <Typography variant="h4" color={colors.grey[100]} gutterBottom>
              Especialidades
            </Typography>
            {/* (Aquí iría un .map() de las especialidades) */}
            <Typography>Especialidad 1, Especialidad 2</Typography>

            <Typography variant="h4" color={colors.grey[100]} sx={{ mt: 4 }} gutterBottom>
              Documentos
            </Typography>
            {/* (Aquí iría un .map() de los 'doctor.documents' 
                cuando los pidas en el fetch) */}
            <Button variant="outlined" sx={{ mr: 1 }}>Ver DNI (PDF)</Button>
            <Button variant="outlined">Ver Licencia (PDF)</Button>
            {/* (Agregá más contenido aquí para probar el scroll) */}
          </Box>

          </Box>
     </>
   ):null}
    </Box>
  );
};

export default DoctorProfileScene;