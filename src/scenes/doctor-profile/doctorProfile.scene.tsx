import { Box, Typography, useTheme, CircularProgress, Divider, Button ,Link, Chip} from "@mui/material";
import { ColorTokens, tokens } from "../../theme";
import { useState, useEffect } from 'react';
import { getDoctorDocuments } from "../../api/utils/getDoctorDocuments.util";
import { DoctorProfile, doctorProfileSchema } from "../../types/doctorProfile.type";
import z from "zod";
import { Badge } from "../../components/Badge.component";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'; 
import { Doctor_Status } from "../../enums/doctorStatus.enum";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import Swal from "sweetalert2";

interface DoctorProfileProps {
  doctorId: string | null;
}

const modalStyle = (colors:ColorTokens) => ({ 
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',   
  maxWidth: '800px', 
  maxHeight: '85vh', 
  overflowY: 'auto', 
  bgcolor: colors.primary[400], 
  border: `1px solid ${colors.grey[700]}`,
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
}) as const;

const documentNames = {
 "dni_front": "Ver DNI (Frente)",
 "dni_back": "Ver DNI (Dorso)",
 "medical_license": "Ver Licencia Médica",
};
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



  const handleVerifyDocument = async (documentId: string) => {
    console.log('hoklaaa');
    
    // 3.1: Confirmación con Swal
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Vas a marcar este documento como VERIFICADO.",
      icon: "warning",
      showCancelButton: true,
    confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, verificar",
      cancelButtonText: "Cancelar",
      target: document.getElementById('doctor-profile-modal-content'),
    });
    
console.log(result);

    if (!result.isConfirmed) {
      return; 
    }
    try {
      await new Promise(res => setTimeout(res, 1000));
      setDoctor((currentDoctor) => {
        if (!currentDoctor) return null;

        const updatedDocuments = currentDoctor.documents.map((doc) => {
          if (doc.id === documentId) {
            return { ...doc, verified: true }; // ¡El cambio!
          }
          return doc;
        });

        return {
          ...currentDoctor,
          documents: updatedDocuments,
        };
      });

      Swal.fire({
        title: "¡Verificado!", 
        text: "El documento ha sido marcado.", 
        icon: "success",
        background: colors.primary[400],
        color: colors.grey[100],
      });

    } catch (error) {
      // (Manejo de error de la API)
      Swal.fire("Error", "No se pudo verificar el documento.", "error");
    }
  };
  // --- 4. LÓGICA DE BOTONES ---
const updateDoctorStatusApi = async (
    id: string,
    newStatus: Doctor_Status,
    reason: string | null = null
  ) => {
    // (Aquí iría tu 'api.patch(`/admin/doctor/${id}/status`, ...)')
    console.log("Simulando API:", { id, newStatus, reason });
    await new Promise((res) => setTimeout(res, 1000));
    // Simulamos que la API nos devuelve el doctor actualizado
    return {
      ...doctor!,
      status: newStatus,
      rejectedReason: reason,
    };
  };


  const areAllDocumentsVerified = (): boolean => {
    if (!doctor || !doctor.documents) return false;
    // .every() chequea si CADA documento cumple la condición
    return doctor.documents.every((doc) => doc.verified === true);
  };

  const handleApprove = async () => {
    // 1. Validación (Tu idea)
    if (!areAllDocumentsVerified()) {
      Swal.fire({
        title: "Faltan Documentos",
        text: "No podés aprobar un doctor sin verificar todos sus documentos primero.",
        icon: "error",
        target: document.getElementById("doctor-profile-modal-content"), // (Para que se vea sobre el modal)
      });
      return;
    }

    // 2. Confirmación (Tu idea)
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `Vas a APROBAR al Dr. ${doctor?.fullname}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, aprobar",
      cancelButtonText: "Cancelar",
      target: document.getElementById("doctor-profile-modal-content"),
    });

    if (!result.isConfirmed) return;

    // 3. Simulación de API
    try {
      const updatedDoctor = await updateDoctorStatusApi(
        doctor!.id,
        Doctor_Status.ACTIVE
      );
      // Actualiza el estado local (como pediste)
      setDoctor(updatedDoctor); 
      Swal.fire("¡Aprobado!", "El doctor ha sido activado.", "success");
    } catch (err) {
      Swal.fire("Error", (err as Error).message, "error");
    }
  };


 const handleReject = async () => {
    // 1. Pedir el motivo (HTML dialog)
    const { value: reason } = await Swal.fire({
      title: "Rechazar Doctor",
      text: `Por favor, escribí el motivo del rechazo para el Dr. ${doctor?.fullname}.`,
      input: "textarea", // <-- Pide un <textarea>
      inputPlaceholder: "Ej: El DNI no es legible, la licencia expiró...",
      showCancelButton: true,
      confirmButtonText: "Confirmar Rechazo",
      cancelButtonText: "Cancelar",
      target: document.getElementById("doctor-profile-modal-content"),
      // Validación del input de Swal
      inputValidator: (value) => {
        if (!value || value.trim().length < 10) {
          return "El motivo es obligatorio (mínimo 10 caracteres).";
        }
      },
    });

    // 2. Si el usuario escribió un motivo y confirmó
    if (reason) {
      // 3. Simulación de API
      try {
        const updatedDoctor = await updateDoctorStatusApi(
          doctor!.id,
          Doctor_Status.REJECTED,
          reason // <-- Enviamos el motivo
        );
        // Actualiza el estado local
        setDoctor(updatedDoctor);
        Swal.fire("Rechazado", "El doctor ha sido rechazado.", "success");
      } catch (err) {
        Swal.fire("Error", (err as Error).message, "error");
      }
    }
  };

  return (
    <Box sx={modalStyle(colors)} id="doctor-profile-modal-content">
   {isLoading ? (
        <Box sx={{ m: 'auto', }}><CircularProgress color="secondary" /></Box>
      ) : error ? (
        <Typography color="error" sx={{ m: 'auto' }}>{error}</Typography>
      ) : doctor ? (
<>     <Box sx={{  display: 'flex', gap: 3 ,flexDirection:"column",position:"relative"}}>
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
              <div style={{
                display:"flex",
                gap:10,
                alignContent:"center",

              }}>
              <Typography variant="h2" color={colors.grey[100]} fontWeight="bold">
                {(doctor.fullname).toUpperCase()}
              </Typography>
              {doctor.status===Doctor_Status.ACTIVE && (
 <VerifiedUserIcon 
              titleAccess="Usuario Verificado" sx={{
                alignSelf:"center",
              }}/>
              )}
             
              </div>
              {(doctor?.specialities && doctor.specialities.length > 0)?(
                <Box
      component="nav"
      sx={{
        display: 'flex',        
            flexWrap: 'wrap',   

        gap: '10px',        
             marginTop: '8px',   
      }}
    >
{
  doctor.specialities.map((speciality) => (
          <Badge key={speciality.id}><span >{speciality.name}</span></Badge>

  ))
}
               </Box>
              ):(
<Typography variant="h5" color={colors.grey[300]} sx={{ mt: 1 }}>
Sin especialidades seleccionadas.
              </Typography>
              )}
  
              <Typography variant="body1" color={colors.grey[300]} sx={{ mt: 1 }}>
                Email:  
                <Link
    href={`mailto:${doctor.email}`}
    sx={{
      // 3. USA 'sx' PARA DARLE EL COLOR DE TU TEMA
      color: colors.greenAccent[500], // (Usa un color de "acento" para que parezca un link)
      textDecoration: 'none', // (Opcional: saca el subrayado)
      '&:hover': {
        textDecoration: 'underline', // (Opcional: se subraya al pasar el mouse)
      }
    }}
  >
    {doctor.email}
  </Link>
              </Typography>
              <Typography variant="body1" color={colors.grey[300]}>
                DNI: {doctor.dni}
              </Typography>
            </Box>
</Box>
       
            <Divider sx={{ borderColor: colors.grey[700] }} />

{/* --- 2. SECCIÓN DOCUMENTOS --- */}
          <Box sx={{ alignContent:"center",flexDirection:"column", display:"flex"}}>
            
            <Typography variant="h4" color={colors.grey[100]} sx={{  }} gutterBottom>
              Documentos
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row',gap:2 , flexWrap:"wrap" }}>
            {doctor.documents.map((doc) => {
              const buttonText = documentNames[doc.type as keyof typeof documentNames] || `Ver ${doc.type}`;
              
              return(
 <Box 
                  key={doc.id} 
                  sx={{
                    width: 220, // Ancho fijo
                    height: 150, // Alto fijo
                    
                    // 2. El "Fondo Borroso" (frosted glass)
                    backgroundColor: 'rgba(0, 0, 0, 0.25)', 
                    backdropFilter: 'blur(4px)',
                    
                    border: `1px solid ${colors.grey[700]}`,
                    borderRadius: 2, // Bordes redondeados
                    
                    // 3. Centrar el botón (hijo)
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2, // Padding interno
                    textAlign: 'center',
                    position: 'relative', 
                  }}
                >
                  
                  {/* --- 4. EL BOTÓN (con icono y texto) --- */}
                <Button 
                  key={doc.id}
                  variant="outlined" 
                  color="secondary"
                  href={doc.url}              
                  target="_blank" 
                  rel="noopener noreferrer"
                  startIcon={<VisibilityOutlinedIcon />}
                  sx={{
                  
                 transition: theme.transitions.create(['background-color', 'color', 'border-color'], {
      duration: theme.transitions.duration.short, // (Unos 250ms)
    }),

 '&:hover': {
 backgroundColor: colors.greenAccent[500],
 color: colors.primary[500],
            borderColor: colors.greenAccent[500],
 },}}
                >
                  {buttonText} 
                </Button>

                <Box sx={{
                  position:"absolute",
                  top:0,
                  margin:"8px",
                  left:0,
                }}>
                      {doc.verified ? (
                        // 5. ESTADO VERIFICADO (Verde)
                        <Chip
                          icon={<CheckCircleIcon />}
                          label="Verificado"
                          color="success"
                          size="small"
                        />
                      ) : (
                        // 6. ESTADO PENDIENTE (Naranja)
                        <Button
                          variant="contained"
                          sx={{ 
                            backgroundColor: colors.yellow[600], // Naranja
                            color: colors.grey[900],
                            '&:hover': {
                              backgroundColor: colors.yellow[700],
                            }
                          }}
                          startIcon={<WarningIcon />}
                          size="small"
                          onClick={() => handleVerifyDocument(doc.id)}
                        >
                          Verificar
                        </Button>
                      )}
                    </Box>

                </Box >
            )
          
})}
            </Box>
          </Box>
            <Divider sx={{ borderColor: colors.grey[700] }} />
  {doctor.status === Doctor_Status.PENDING && (
            <>
              <Box 
                sx={{
                  p: "15px 0px ", // Padding para el footer
                  display: 'flex',
                  justifyContent: 'flex-end', // Botones a la derecha
                  gap: 2, // Espacio entre botones
                }}
              >
                <Button 
                  variant="contained" 
                  color="error"
                  onClick={handleReject} >
                  Rechazar
                </Button>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  onClick={handleApprove}
                >
                  Aprobar
                </Button>
              </Box>
            </>
          )}
          </Box>
     </>
   ):null}
    </Box>
  );
};

export default DoctorProfileScene;