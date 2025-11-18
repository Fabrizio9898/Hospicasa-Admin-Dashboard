import { useState } from 'react';
import {
  Box,
  Typography,
  useTheme,
  CircularProgress,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
} from '@mui/x-data-grid';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import { Doctor_Status } from '../../enums/doctorStatus.enum';
import { DoctorPublic } from '../../types/doctor.type';
import { ModalView } from '../../components/Modal';
import DoctorProfileScene from '../doctor-profile/doctorProfile.scene';
import { useDoctorsQuery } from '../../hooks/useDoctorQuery.hook';


const DoctorsPanel = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [filterStatus, setFilterStatus] = useState<Doctor_Status>(
    Doctor_Status.PENDING,
  );
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
const { 
    data: doctorsData, // Tu data ya validada
    isLoading, 
    isError, 
    error 
  } = useDoctorsQuery({
    status: filterStatus,
    page: paginationModel.page + 1, // Ajuste porque DataGrid usa base 0
    limit: paginationModel.pageSize,
  });

const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);

   const handleOpenModal = (id:string) =>{ 
    setSelectedDoctorId(id)
  
  }
  const handleCloseModal = () => {
    setSelectedDoctorId(null);
  }

 

  
  const StatusCircle = ({ color }: { color: string }) => (
    <Box
      component="span"
      sx={{
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: color,
        mr: 1,
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
    />
  );
 const getColorForStatus = (status: string) => {
    // Para 'ACTIVE' y 'REJECTED', el color es el mismo en ambos modos
    if (status === Doctor_Status.ACTIVE) return colors.greenAccent[500];
    if (status === Doctor_Status.REJECTED) return colors.redAccent[500];

    // --- ¡AQUÍ ESTÁ LA LÓGICA! ---
    // Si el estado es 'PENDING':
    if (theme.palette.mode === 'dark') {
      // MODO OSCURO: Devolvemos el amarillo
      return colors.yellow[500] || colors.grey[300]; 
    } else {
      // MODO CLARO: Devolvemos un color oscuro (negro)
      // (En tu 'theme.ts', el 'grey[100]' del modo claro es negro)
      return colors.grey[100]; 
    }
  };
  const getTextForStatus = (status: Doctor_Status) => {
    if (status === Doctor_Status.ACTIVE) return "Activos";
    if (status === Doctor_Status.REJECTED) return "Rechazados";
    return "Pendientes";
  };
  
  // --- (Tu definición de 'columns' queda igual) ---
  const columns: GridColDef[] = [
    {
      field: 'status',
      headerName: 'Estado',
      width: 220,
      align: 'center', 
      
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Typography sx={{ mr: 1, color: colors.grey[100], fontSize: '0.9rem' }}>
            Estado:
          </Typography>
          <Select
            value={filterStatus}
            onChange={(e: SelectChangeEvent<Doctor_Status>) =>
              setFilterStatus(e.target.value as Doctor_Status)
            }
            size="small"
            variant="standard"
            sx={{
              flex: 1,
              color: getColorForStatus(filterStatus),
              '& .MuiSvgIcon-root': { color: getColorForStatus(filterStatus) },
              '&:before': { borderBottomColor: getColorForStatus(filterStatus) },
              '&:after': { borderBottomColor: getColorForStatus(filterStatus) },
            }}
            renderValue={(selectedStatus) => (
              <Box sx={{ display: 'flex', alignItems: 'center',gap:1,}}>
                {getTextForStatus(selectedStatus)}
                <StatusCircle color={getColorForStatus(selectedStatus)} />
              </Box>
            )}
          >
            <MenuItem value={Doctor_Status.PENDING}>
              <StatusCircle color={getColorForStatus(Doctor_Status.PENDING)} />
              Pendientes
            </MenuItem>
            <MenuItem value={Doctor_Status.ACTIVE}>
              <StatusCircle color={getColorForStatus(Doctor_Status.ACTIVE)} />
              Activos
            </MenuItem>
            <MenuItem value={Doctor_Status.REJECTED}>
              <StatusCircle color={getColorForStatus(Doctor_Status.REJECTED)} />
              Rechazados
            </MenuItem>
          </Select>
        </Box>
      ),
      renderCell: ({ row: { status } }: { row: DoctorPublic }) => (
        <Box sx={{ display: 'flex', alignItems: 'center',justifyContent:"center",height:"100%" }}>
          <StatusCircle color={getColorForStatus(status)} />
          <Typography sx={{
            fontWeight:"bold",
            textTransform:"uppercase"
          }} color={getColorForStatus(status)}>
            {status}
          </Typography>
        </Box>
      ),
    },
    // ... (El resto de tus columnas: id, fullname, dni, email, etc.)
     {
   field: 'id',
   headerName: 'ID',
   width: 150,
  },
  {
   field: 'fullname',
    headerName: 'Nombre Completo',
   flex: 1,
   cellClassName: 'name-column--cell',
  },
    {
   field: 'dni', 
   headerName: 'DNI',
   flex: 1,
  },
  {
   field: 'email',
   headerName: 'Email',
   flex: 1,
  },
  {
   field: 'specialtyCount', 
   headerName: 'Especialidades',
   type: 'number',
   headerAlign: 'left',
   align: 'left',
  },
  {
   field: 'actions',
   headerName: 'Acciones',
   flex: 1,
   renderCell: ({ row: { id } }: { row: DoctorPublic }) => {
    return (
     <Button
      onClick={() => handleOpenModal(id)}
      variant="contained"
      color="secondary"
      size="small"
     >
      Ver Perfil
     </Button>
    );
   },
  },
  ];

  // --- 8. MANEJO DE ERROR (Ahora lee 'error' del store) ---
 if (isError) {
    return (
      <Box m="20px">
        <Header title="ERROR" subtitle={error instanceof Error ? error.message : "Error desconocido"} />
        <Typography color="error">No se pudieron cargar los doctores.</Typography>
      </Box>
    );
  }


  if (isLoading) {
    return (
      <Box m="20px" display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress color="secondary" size={60} />
      </Box>
    );
  }

  return (
    <>
    <Box m="20px">
      <Header title="DOCTORES" subtitle="Administrar el equipo de doctores" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          // ... (tus estilos de DataGrid)
             "& .MuiDataGrid-root": { border: "none" },
     "& .MuiDataGrid-cell": { borderBottom: "none" },
     "& .name-column--cell": { color: colors.greenAccent[300] },
     "& .MuiDataGrid-columnHeaders": {
      backgroundColor: colors.blueAccent[700],
      borderBottom: "none",
     },
     "& .MuiDataGrid-virtualScroller": {
      backgroundColor: colors.primary[400],
     },
     "& .MuiDataGrid-footerContainer": {
      borderTop: "none",
      backgroundColor: colors.blueAccent[700],
     },
          "& .MuiDataGrid-columnHeaderCheckbox": {
            display: 'none',
          },
     "& .MuiCheckbox-root": {
      color: `${colors.greenAccent[200]} !important`,
 },
        }}
      >
        <DataGrid
          // --- 10. EL DATAGRID AHORA LEE DE ZUSTAND ---
          rows={doctorsData?.data || []}
          columns={columns}
          loading={isLoading} // <-- ¡Controlado por Zustand!
          rowCount={doctorsData?.total || 0}
          pageSizeOptions={[10, 25, 50]}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          disableColumnMenu
          disableColumnSorting
        />
      </Box>
      <ModalView 
          isOpen={!!selectedDoctorId} 
          onClose={handleCloseModal}
        >          <DoctorProfileScene doctorId={selectedDoctorId} /> 
        </ModalView>
    </Box>
    </>
  );
};

export default DoctorsPanel;