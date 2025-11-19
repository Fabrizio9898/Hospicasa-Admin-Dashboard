import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  useTheme,
  Grid,
  Chip,
  Button,
  Autocomplete,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  CircularProgress // <--- Agregamos esto para el loading
} from '@mui/material';
import {
  Person,
  MedicalServices,
  ExpandMore
} from '@mui/icons-material';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import { TicketCategory } from '../../enums/tickets/ticketCategory.enum';
import { UserRole } from '../../enums/userRole.enum';
import { Ticket } from '../../types/ticket.type';
import { useTicketsInfiniteQuery } from '../../hooks/useTickets.hook';
import { TicketCard } from '../../components/TicketCard.component';
import { ModalView } from '../../components/Modal';
import { TicketDetail } from '../../components/TicketReportsDetailes';


type RoleFilter = UserRole | 'ALL';

// --- COMPONENTE PRINCIPAL ---
export const Reports = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // --- ESTADOS DE FILTROS ---
  const [selectedCategories, setSelectedCategories] = useState<TicketCategory[]>([]);
  const [selectedRole, setSelectedRole] = useState<RoleFilter>('ALL');

  // --- ESTADOS DEL MODAL (Sin cambios) ---
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null); // Tipado correctamente
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- 1. INTEGRACIÓN DE REACT QUERY ---
  // El hook se encarga de re-hacer la petición cuando cambian categories o role
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error 
  } = useTicketsInfiniteQuery({
    categories: selectedCategories,
    role: selectedRole
  });

  // --- 2. APLANAR LA DATA ---
  // React Query devuelve: { pages: [{data: [t1, t2], meta:...}, {data: [t3, t4]...}] }
  // Necesitamos convertirlo a: [t1, t2, t3, t4]
  const allTickets = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => page.data);
  }, [data]);

  // --- HANDLERS ---
  
  // Ahora cargar más es simplemente llamar a la función del hook
  const handleLoadMore = () => {
    fetchNextPage();
  };

  const handleViewDetails = (ticket: unknown) => {
    // Hacemos cast a Ticket porque sabemos que viene del hook tipado
    setSelectedTicket(ticket as Ticket); 
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
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
        {/* 1. FILTRO MULTI-SELECT */}
        <Autocomplete
          multiple
          id="tags-filled"
          options={Object.values(TicketCategory)}
          value={selectedCategories}
          onChange={(event, newValue) => {
            setSelectedCategories(newValue);
            // React Query detecta el cambio y recarga automáticamente
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

        {/* 2. FILTRO DE ROL */}
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

      {/* --- ESTADO DE ERROR --- */}
      {isError && (
         <Box display="flex" justifyContent="center" mt={4} mb={4}>
            <Typography color="error" variant="h6">
               Error al cargar reportes: {error?.message || "Intente nuevamente."}
            </Typography>
         </Box>
      )}

      {/* --- ESTADO DE CARGA INICIAL (Spinner grande) --- */}
      {isLoading ? (
         <Box display="flex" justifyContent="center" mt={10}>
            <CircularProgress color="secondary" size={60} />
         </Box>
      ) : (
        <>
          {/* --- GRID DE REPORTES --- */}
          <Grid container spacing={3}>
            {allTickets.map((report) => (
              <TicketCard
                key={report.id} 
                report={report} 
                onViewDetails={handleViewDetails} 
              />
            ))}
          </Grid>

          {/* --- MENSAJE VACÍO --- */}
          {allTickets.length === 0 && !isError && (
              <Box display="flex" justifyContent="center" mt={4}>
                <Typography variant="h5" color={colors.grey[300]}>No hay reportes con estos filtros.</Typography>
              </Box>
          )}

          {/* --- BOTÓN CARGAR MÁS --- */}
          {hasNextPage && (
            <Box display="flex" justifyContent="center" mt={4} mb={4}>
              <Button 
                variant="contained" 
                color="secondary" 
                size="large" 
                // Deshabilitamos si ya está cargando la siguiente página
                disabled={isFetchingNextPage} 
                startIcon={isFetchingNextPage ? <CircularProgress size={20} color="inherit"/> : <ExpandMore />}
                onClick={handleLoadMore}
                sx={{ fontWeight: 'bold', padding: '10px 40px' }}
              >
                {isFetchingNextPage ? 'Cargando...' : 'Cargar Más Reportes'}
              </Button>
            </Box>
          )}
        </>
      )}

<ModalView isOpen={isModalOpen} onClose={handleCloseModal}>
          {/* Verificamos que selectedTicket exista antes de renderizar el detalle */}
          {selectedTicket && (
            <TicketDetail 
              ticket={selectedTicket} 
              onClose={handleCloseModal} 
            />
          )}
       </ModalView>

    </Box>
  );
};