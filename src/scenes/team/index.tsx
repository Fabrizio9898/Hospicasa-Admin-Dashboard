import { useState, useEffect } from 'react'; // <-- 1. IMPORTAMOS HOOKS
import {
  Box,
  Typography,
  useTheme,
  CircularProgress,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent, // <-- 2. TIPO PARA EL EVENTO DEL SELECT
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridPaginationModel, // <-- 3. TIPO PARA PAGINACIÓN
} from '@mui/x-data-grid';
import { tokens } from '../../theme';
// import { mockDataTeam } from '../../data/mockData'; // <-- BORRADO
import Header from '../../components/Header';

import { DoctorListResponse,DoctorPublic, getDoctors } from '../../utils/getDoctors.util';
import { Doctor_Status } from '../../enums/doctorStatus.enum';// <-- 5. IMPORTAMOS LOS TIPOS
import { Link } from 'react-router-dom';
// (Los iconos de Admin/Lock ya no se usan en este contexto, los quito)
// import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // --- 6. ESTADO LOCAL PARA LOS DATOS ---
  const [doctorsData, setDoctorsData] = useState<DoctorListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- 7. ESTADO LOCAL PARA LOS FILTROS Y PAGINACIÓN ---
  // El filtro de estado (tu idea del dropdown)
  const [filterStatus, setFilterStatus] = useState<Doctor_Status>(
    Doctor_Status.PENDING, // Por defecto, mostramos 'PENDING'
  );
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true);
      setError(null);
      
      // Preparamos los parámetros para el backend
      const query = {
        status: filterStatus,
        page: paginationModel.page + 1, // Sumamos 1 (DataGrid empieza en 0)
        limit: paginationModel.pageSize,
        // 'search' se puede agregar aquí si tuvieras un input
      };

      try {
        const response = await getDoctors(query);
        setDoctorsData(response); // Guardamos la respuesta completa
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Ocurrió un error desconocido');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, [filterStatus, paginationModel]); // <-- 9. SE EJECUTA OTRA VEZ SI EL FILTRO O LA PÁGINA CAMBIAN

  /** Componente simple para el círculo de color */
  const StatusCircle = ({ color }: { color: string }) => (
    <Box
      component="span" // Usamos 'span' para que esté en línea con el texto
      sx={{
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: color,
        mr: 1, // margen a la derecha
        display: 'inline-block', // Para alinearse
        verticalAlign: 'middle',
      }}
    />
  );

  /** Devuelve el color basado en el estado */
  const getColorForStatus = (status: Doctor_Status) => {
    if (status === Doctor_Status.ACTIVE) return colors.greenAccent[500];
    if (status === Doctor_Status.REJECTED) return colors.redAccent[500];
    return colors.yellow[300]; // PENDING
  };

  /** Devuelve el texto legible para el estado */
  const getTextForStatus = (status: Doctor_Status) => {
    if (status === Doctor_Status.ACTIVE) return "Activos";
    if (status === Doctor_Status.REJECTED) return "Rechazados";
    return "Pendientes";
  };
  
  // --- 2. DEFINICIÓN DE COLUMNAS (Modificada) ---
  const columns: GridColDef[] = [
    {
      field: 'status',
      headerName: 'Estado',
      width: 220, // <-- Más ancho para el texto y el select
      // --- CAMBIO: Header personalizado ---
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          {/* Tu idea: "Estado:" + Dropdown */}
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
              flex: 1, // Para que ocupe el espacio restante
              color: colors.grey[100],
              '& .MuiSvgIcon-root': { color: colors.grey[100] },
              '&:before': { borderBottomColor: colors.grey[100] },
              '&:after': { borderBottomColor:getColorForStatus(filterStatus) },
            }}
            // --- CAMBIO: Muestra el círculo y el texto en el valor seleccionado ---
            renderValue={(selectedStatus) => (
              <Box sx={{ display: 'flex', alignItems: 'center' ,gap:1}}>
                
                {getTextForStatus(selectedStatus)}
                <StatusCircle color={getColorForStatus(selectedStatus)} />
              </Box>
            )}
          >
            {/* --- CAMBIO: Opciones con círculo de color --- */}
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
      // --- CAMBIO: Celda con círculo de color ---
      renderCell: ({ row: { status } }: { row: DoctorPublic }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <StatusCircle color={getColorForStatus(status)} />
          <Typography color={getColorForStatus(status)}>
            {status}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'id',
      headerName: 'ID',
      width: 150, // Démosle más espacio al ID
    },
    
    {
      field: 'fullname', // (Basado en tu DTO)
      headerName: 'Nombre Completo',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'dni', // (Basado en tu DTO)
      headerName: 'DNI',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'specialtyCount', // (Basado en tu DTO)
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
            component={Link} // <-- Usamos Link
            to={`/doctor/${id}`} // <-- Ruta al perfil
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

  // --- 11. MANEJO DE ERROR EN LA UI ---
  if (error) {
    return (
      <Box m="20px">
        <Header title="ERROR" subtitle={error} />
        <Typography color="error">
          No se pudieron cargar los doctores. Intenta recargar la página.
        </Typography>
      </Box>
    );
  }

  return (
    <Box m="20px">
      <Header title="DOCTORES" subtitle="Administrar el equipo de doctores" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          // (Tus estilos de DataGrid están perfectos)
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
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={doctorsData?.data || []} 
          columns={columns} 
          loading={isLoading} 
          rowCount={doctorsData?.total || 0} 
          pageSizeOptions={[10, 25, 50]}
          paginationMode="server" 
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel} 
          disableColumnMenu
          disableColumnSorting
          
        />
      </Box>
    </Box>
  );
};

export default Team;