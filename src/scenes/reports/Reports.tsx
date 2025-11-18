import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  useTheme,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Autocomplete,
  TextField,
  Avatar,
  Stack,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import {
  BugReport,
  Person,
  MedicalServices,
  Warning,
  CheckCircle,
  AccessTime,
  ExpandMore
} from '@mui/icons-material';
import { tokens } from '../../theme'; // Asumo que tienes esto configurado
import Header from '../../components/Header';

// --- 1. ENUMS (Simulando tu Backend) ---
export enum TicketCategory {
  BOOKING_ISSUE = 'Problema Turno',
  PAYMENT_ISSUE = 'Problema Pago',
  TECHNICAL_ISSUE = 'Falla Técnica',
  ACCOUNT_ISSUE = 'Cuenta/Login',
  REPORT_USER = 'Reportar Usuario',
  OTHER = 'Otro',
}

export enum TicketPriority {
  URGENT = 'Urgente',
  HIGH = 'Alta',
  MEDIUM = 'Media',
  LOW = 'Baja',
}

export enum TicketStatus {
  OPEN = 'Abierto',
  IN_PROGRESS = 'En Proceso',
  RESOLVED = 'Resuelto',
}

export enum UserRole {
  DOCTOR = 'Doctor',
  PATIENT = 'Paciente',
}

// --- 2. MOCK DATA (Datos Falsos) ---
const generateMockReports = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `TICKET-${1000 + i}`,
    user: {
      name: i % 2 === 0 ? `Dr. House ${i}` : `Paciente Pepe ${i}`,
      role: i % 2 === 0 ? UserRole.DOCTOR : UserRole.PATIENT,
      image: null,
    },
    category: Object.values(TicketCategory)[i % Object.values(TicketCategory).length],
    priority: Object.values(TicketPriority)[i % Object.values(TicketPriority).length],
    status: TicketStatus.OPEN,
    subject: i % 2 === 0 ? 'El paciente no se presentó' : 'No puedo procesar el pago',
    description: 'He estado esperando en la sala de video por mas de 15 minutos y nadie aparece. Solicito asistencia inmediata.',
    date: 'Hace 2 horas'
  }));
};

const ALL_REPORTS = generateMockReports(20); // Generamos 20 reportes falsos

// --- 3. COMPONENTE PRINCIPAL ---
export const Reports = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // --- ESTADOS DE FILTROS ---
  const [selectedCategories, setSelectedCategories] = useState<TicketCategory[]>([]);
  const [selectedRole, setSelectedRole] = useState<UserRole | 'ALL'>('ALL');
  
  // --- ESTADO DE PAGINACIÓN (Simulada) ---
  const [visibleCount, setVisibleCount] = useState(6);

  // --- LÓGICA DE FILTRADO ---
  const filteredReports = useMemo(() => {
    return ALL_REPORTS.filter((report) => {
      // 1. Filtro por Categoría (Si el array está vacío, muestra todos)
      const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(report.category);
      
      // 2. Filtro por Rol
      const matchRole = selectedRole === 'ALL' || report.user.role === selectedRole;

      return matchCategory && matchRole;
    });
  }, [selectedCategories, selectedRole]);

  // --- DATOS A MOSTRAR (Recortados por "Load More") ---
  const displayedReports = filteredReports.slice(0, visibleCount);

  // --- HANDLERS ---
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  // --- HELPERS DE UI ---
  const getPriorityColor = (priority: TicketPriority) => {
    switch (priority) {
      case TicketPriority.URGENT: return colors.redAccent[500];
      case TicketPriority.HIGH: return colors.redAccent[400];
      case TicketPriority.MEDIUM: return colors.blueAccent[500];
      case TicketPriority.LOW: return colors.greenAccent[500];
      default: return colors.grey[100];
    }
  };

  return (
    <Box m="20px">
      <Header title="REPORTES Y SOPORTE" subtitle="Gestiona los tickets de la plataforma" />

      {/* --- BARRA DE FILTROS --- */}
      <Box 
        mb={4} 
        p={3} 
        bgcolor={colors.primary[400]} 
        borderRadius="8px"
        display="flex"
        flexWrap="wrap"
        gap={2}
        alignItems="center"
        justifyContent="space-between"
      >
        {/* 1. FILTRO MULTI-SELECT (Estilo Skills) */}
        <Autocomplete
          multiple
          id="tags-filled"
          options={Object.values(TicketCategory)}
          value={selectedCategories}
          onChange={(event, newValue) => {
            setSelectedCategories(newValue);
          }}
          freeSolo={false}
          renderValue={(value: readonly TicketCategory[], getTagProps) =>
            value.map((option: TicketCategory, index: number) => {
                const { key, ...tagProps } = getTagProps({ index });
                return(
              <Chip 
                key={key}
                variant="outlined" 
                label={option} 
                {...tagProps} 
                sx={{ borderColor: colors.greenAccent[400], color: colors.grey[100] }}
              />
            )})
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="Filtrar por Categoría"
              placeholder="Seleccionar..."
              sx={{ minWidth: '400px' }}
            />
          )}
          sx={{ flex: 1, minWidth: '300px' }}
        />

        {/* 2. FILTRO DE ROL (Toggle Buttons) */}
        <ToggleButtonGroup
          value={selectedRole}
          exclusive
          onChange={(e, newRole) => { if(newRole) setSelectedRole(newRole) }}
          aria-label="role filter"
          sx={{ 
             '& .MuiToggleButton-root': { 
                color: colors.grey[100], 
                borderColor: colors.greenAccent[500],
                '&.Mui-selected': {
                   backgroundColor: colors.greenAccent[600],
                   color: 'white',
                   '&:hover': { backgroundColor: colors.greenAccent[700] }
                }
             }
          }}
        >
          <ToggleButton value="ALL">Todos</ToggleButton>
          <ToggleButton value={UserRole.DOCTOR}>
            <MedicalServices sx={{ mr: 1, fontSize: 18 }} /> Doctores
          </ToggleButton>
          <ToggleButton value={UserRole.PATIENT}>
            <Person sx={{ mr: 1, fontSize: 18 }} /> Pacientes
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* --- GRID DE REPORTES (3 COLUMNAS) --- */}
      <Grid container spacing={3}>
        {displayedReports.map((report) => (
          <Grid  size={{xs:12, sm:6, md:4}} key={report.id}>
            <Card 
              sx={{ 
                bgcolor: colors.primary[400], 
                borderLeft: `6px solid ${getPriorityColor(report.priority)}`, // Borde de color según prioridad
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <CardContent>
                {/* Cabecera de la Card */}
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Chip 
                    label={report.priority} 
                    size="small" 
                    sx={{ 
                      bgcolor: getPriorityColor(report.priority), 
                      color: '#fff', 
                      fontWeight: 'bold',
                      height: '20px',
                      fontSize: '0.7rem'
                    }} 
                  />
                  <Typography variant="caption" color={colors.grey[300]}>
                    {report.date}
                  </Typography>
                </Stack>

                {/* Título y Categoría */}
                <Typography variant="h5" fontWeight="bold" color={colors.grey[100]} gutterBottom>
                  {report.category}
                </Typography>
                
                <Typography variant="h6" color={colors.greenAccent[400]} mb={1}>
                  {report.subject}
                </Typography>

                <Typography variant="body2" color={colors.grey[300]} mb={2} sx={{
                   display: '-webkit-box',
                   overflow: 'hidden',
                   WebkitBoxOrient: 'vertical',
                   WebkitLineClamp: 3, // Cortar texto en 3 lineas
                }}>
                  {report.description}
                </Typography>

                {/* Footer de la Card: Usuario */}
                <Box display="flex" alignItems="center" mt={2} pt={2} borderTop={`1px solid ${colors.primary[500]}`}>
                   <Avatar sx={{ bgcolor: colors.blueAccent[500], width: 30, height: 30, mr: 1 }}>
                      {report.user.name[0]}
                   </Avatar>
                   <Box>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {report.user.name}
                      </Typography>
                      <Typography variant="caption" color={colors.greenAccent[500]}>
                        {report.user.role}
                      </Typography>
                   </Box>
                </Box>

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* --- BOTÓN CARGAR MÁS --- */}
      {visibleCount < filteredReports.length && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Button 
            variant="contained" 
            color="secondary" 
            size="large" 
            startIcon={<ExpandMore />}
            onClick={handleLoadMore}
            sx={{ fontWeight: 'bold', padding: '10px 40px' }}
          >
            Cargar Más Reportes
          </Button>
        </Box>
      )}

      {filteredReports.length === 0 && (
         <Box display="flex" justifyContent="center" mt={4}>
            <Typography variant="h5" color={colors.grey[300]}>No hay reportes con estos filtros.</Typography>
         </Box>
      )}

    </Box>
  );
};