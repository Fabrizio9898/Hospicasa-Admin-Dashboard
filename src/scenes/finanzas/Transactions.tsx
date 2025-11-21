import { useState, useMemo } from 'react';
import { 
  Box, Typography, Tabs, Tab, Grid, 
  Button, Alert, AlertTitle, Paper, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent,
  TextField, InputAdornment
} from '@mui/material';
import { 
  AttachMoney, History, CalendarToday, 
  Download, TrendingUp, AccountBalanceWallet, Search
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import Header from '../../components/Header';
import { TransactionCard } from '../../components/TransactionCard';
import { tokens } from '../../theme';
import { MOCK_SETTLEMENTS, SettlementData } from '../../data/doctorsdata';
import { ModalView } from '../../components/Modal';
import { TransactionDetails } from '../../components/TransacciontDetails';



const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(amount);
};

export const Transactions = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [currentTab, setCurrentTab] = useState(0);           // 0 = pendientes, 1 = pagados
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  // --- ESTADOS PARA EL MODAL ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<SettlementData | null>(null);

  const handlePeriodChange = (event: SelectChangeEvent) => {
    setSelectedPeriod(event.target.value as string);
    // Aquí más adelante conectarás con el backend para traer data del período seleccionado
  };

  // 🔥 FILTRADO POTENTE: por tab + buscador (nombre o alias)
  const filteredData = useMemo(() => {
    let data = currentTab === 0
      ? MOCK_SETTLEMENTS.filter(item => item.status === 'PENDING')
      : MOCK_SETTLEMENTS.filter(item => item.status === 'PAID');

    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      data = data.filter(item =>
        item.doctorName.toLowerCase().includes(lowerSearch) ||
        item.doctorAlias.toLowerCase().includes(lowerSearch)
      );
    }

    return data;
  }, [currentTab, searchTerm]);

  // Cálculos solo para la pestaña actual (mejora performance)
  const stats = useMemo(() => {
    const totalGross = filteredData.reduce((acc, curr) => acc + curr.totalGross, 0);
    const totalPlatformFee = filteredData.reduce((acc, curr) => acc + curr.platformFee, 0);
    const totalNetToPay = filteredData.reduce((acc, curr) => acc + curr.netAmount, 0);
    return { totalGross, totalPlatformFee, totalNetToPay };
  }, [filteredData]);
  
    const handleViewDetails = (id: string) => {
        // 1. Buscar la transacción
        const transaction = MOCK_SETTLEMENTS.find(t => t.doctorId === id);
        if (transaction) {
            // 2. Setear estado y abrir modal
            setSelectedTransaction(transaction);
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTransaction(null);
    };
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ md: "center" }} mb={3} gap={2}>
        <Header title="FINANZAS Y LIQUIDACIONES" subtitle="Gestión de pagos a profesionales" />
        
        <Box display="flex" gap={2} flexWrap="wrap">
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel id="period-select-label">Periodo de Liquidación</InputLabel>
            <Select
              labelId="period-select-label"
              value={selectedPeriod}
              label="Periodo de Liquidación"
              onChange={handlePeriodChange}
            >
              <MenuItem value="current">Semana Actual</MenuItem>
              <MenuItem value="last">Semana Anterior</MenuItem>
              <MenuItem value="older">Octubre 2025</MenuItem>
            </Select>
          </FormControl>

          <Button variant="outlined" color="secondary" startIcon={<Download />}>
            Excel
          </Button>
        </Box>
      </Box>

      {/* RESUMEN FINANCIERO */}
      {currentTab === 0 && (
        <Box mb={4}>
          <Alert severity="info" icon={<CalendarToday />} sx={{ mb: 3 }}>
            <AlertTitle>Cierre Semanal: Jueves</AlertTitle>
            Liquidaciones listas para doctores con citas completadas. Se paga neto del 80%.
          </Alert>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper elevation={3} sx={{ p: 3, bgcolor: colors.primary[400], borderRadius: 2, height: '100%' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h6" color={colors.grey[100]}>Facturación Total</Typography>
                    <Typography variant="h3" fontWeight="bold" color={colors.grey[100]}>
                      {formatCurrency(stats.totalGross)}
                    </Typography>
                  </Box>
                  <AccountBalanceWallet sx={{ fontSize: 45, color: colors.blueAccent[400] }} />
                </Box>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Paper elevation={3} sx={{ p: 3, bgcolor: colors.primary[400], borderLeft: `5px solid ${colors.greenAccent[500]}`, borderRadius: 2, height: '100%' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h6" color={colors.greenAccent[500]}>Ganancia Plataforma</Typography>
                    <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
                      {formatCurrency(stats.totalPlatformFee)}
                    </Typography>
                  </Box>
                  <TrendingUp sx={{ fontSize: 45, color: colors.greenAccent[500] }} />
                </Box>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Paper elevation={6} sx={{ p: 3, bgcolor: colors.blueAccent[700], borderRadius: 2, height: '100%' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h6" color="white">A Transferir Hoy</Typography>
                    <Typography variant="h3" fontWeight="bold" color="white">
                      {formatCurrency(stats.totalNetToPay)}
                    </Typography>
                  </Box>
                  <AttachMoney sx={{ fontSize: 45, color: "white" }} />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* TABS */}
      <Box borderBottom={1} borderColor="divider" mb={3}>
        <Tabs value={currentTab} onChange={(_e, v) => setCurrentTab(v)} textColor="secondary" indicatorColor="secondary">
          <Tab icon={<AttachMoney />} label={`Pendientes (${MOCK_SETTLEMENTS.filter(i => i.status === 'PENDING').length})`} iconPosition="start" />
          <Tab icon={<History />} label={`Historial (${MOCK_SETTLEMENTS.filter(i => i.status === 'PAID').length})`} iconPosition="start" />
        </Tabs>
      </Box>

      {/* BUSCADOR FUNCIONAL */}
      <TextField
        fullWidth
        placeholder="Buscar doctor por nombre o alias (ej: House, Meredith, YANG...)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 4, maxWidth: 600 }}
      />

      {/* LISTADO DE DOCTORES */}
      <Grid container spacing={3}>
        {filteredData.map((settlement) => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={settlement.doctorId}>
            <TransactionCard
              data={settlement}
              onPay={() => console.log('Pagando a', settlement.doctorName)}
             onViewDetails={() => handleViewDetails(settlement.doctorId)}
            />
          </Grid>
        ))}

        {filteredData.length === 0 && (
          <Grid size={12}>
            <Box textAlign="center" mt={6}>
              <Typography variant="h5" color="text.secondary">
                {searchTerm ? 'No se encontraron doctores con ese nombre.' : 'No hay liquidaciones en este período.'}
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>

        <ModalView isOpen={isModalOpen} onClose={handleCloseModal}>
                {/* Renderizamos el detalle solo si hay datos */}
                {selectedTransaction && (
                    <TransactionDetails 
                        data={selectedTransaction} 
                        onClose={handleCloseModal} 
                    />
                )}
            </ModalView>
    </Box>
  );
};