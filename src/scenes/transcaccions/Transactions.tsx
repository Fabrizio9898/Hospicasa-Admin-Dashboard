import { useState } from 'react';
import { 
  Box, Typography, useTheme, Tabs, Tab, Grid, 
  Button, Alert, AlertTitle 
} from '@mui/material';
import { 
  AttachMoney, History, CalendarToday, 
  Download 
} from '@mui/icons-material';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import { SettlementData, TransactionCard } from '../../components/TransactionCard';


// --- MOCK DATA (Simulando lo que vendrá del back) ---
const MOCK_SETTLEMENTS: SettlementData[] = [
    {
        doctorId: '1',
        doctorName: 'Dr. Gregory House',
        doctorImage: '',
        doctorAlias: 'HOUSE.MEDICINA.MP',
        totalAppointments: 12,
        totalGross: 120000,
        platformFee: 24000, // 20%
        netAmount: 96000,
        status: 'PENDING',
        lastPaymentDate: '10/11/2023'
    },
    {
        doctorId: '2',
        doctorName: 'Dra. Meredith Grey',
        doctorImage: '',
        doctorAlias: 'MEREDITH.GREY.GAL',
        totalAppointments: 8,
        totalGross: 80000,
        platformFee: 16000,
        netAmount: 64000,
        status: 'PENDING',
        lastPaymentDate: '10/11/2023'
    },
    {
        doctorId: '3',
        doctorName: 'Dr. Strange',
        doctorImage: '',
        totalAppointments: 20,
        totalGross: 200000,
        platformFee: 40000,
        netAmount: 160000,
        status: 'PAID', // Este va al historial
        lastPaymentDate: '17/11/2023'
    }
];

export const Transactions = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    // 0 = Pendientes, 1 = Historial
    const [currentTab, setCurrentTab] = useState(0);

    // --- HELPERS DE FECHAS (Cálculo del ciclo) ---
    const getCurrentPeriodLabel = () => {
        // Aquí luego pondrás lógica real para calcular "Jueves pasado a Miércoles próximo"
        return "Jue 16 Nov - Mié 22 Nov";
    };

    // Filtrar datos según tab
    const displayedData = MOCK_SETTLEMENTS.filter(item => 
        currentTab === 0 ? item.status === 'PENDING' : item.status === 'PAID'
    );

    // Calcular total a pagar (Sumatoria visual)
    const totalPendingAmount = MOCK_SETTLEMENTS
        .filter(i => i.status === 'PENDING')
        .reduce((acc, curr) => acc + curr.netAmount, 0);

    const handlePay = (id: string) => {
        console.log("Pagando a:", id);
        // Aquí abrirías un Modal de confirmación
    };

    const handleViewDetails = (id: string) => {
        console.log("Viendo detalle de:", id);
        // Aquí navegarías a una vista con la lista de citas de ese doc
    };

    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="FINANZAS Y LIQUIDACIONES" subtitle="Gestión de pagos a profesionales" />
                
                {/* Botón Exportar (siempre útil) */}
                <Button variant="outlined" color="secondary" startIcon={<Download />}>
                    Exportar Excel
                </Button>
            </Box>

            {/* RESUMEN FINANCIERO (Solo visible en Pendientes) */}
            {currentTab === 0 && (
                <Grid container spacing={2} mb={4}>
                    <Grid  size={{xs:12}}>
                        <Alert severity="info" icon={<CalendarToday fontSize="inherit" />}>
                            <AlertTitle>Periodo de Liquidación Actual</AlertTitle>
                            Estás visualizando las citas realizadas entre el <strong>{getCurrentPeriodLabel()}</strong>.
                        </Alert>
                    </Grid>
                    <Grid size={{xs:12,md:4}}>
                        <Box bgcolor={colors.greenAccent[600]} p="20px" borderRadius="8px">
                            <Typography variant="h5" color="white" fontWeight="bold">
                                Total a Transferir Hoy
                            </Typography>
                            <Typography variant="h3" color="white" fontWeight="bold" mt="10px">
                                {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(totalPendingAmount)}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            )}

            {/* TABS FILTROS */}
            <Box borderBottom={1} borderColor="divider" mb={3}>
                <Tabs 
                    value={currentTab} 
                    onChange={(e, val) => setCurrentTab(val)}
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                    <Tab icon={<AttachMoney />} label="Pendientes de Pago" iconPosition="start" />
                    <Tab icon={<History />} label="Historial Transferencias" iconPosition="start" />
                </Tabs>
            </Box>

            {/* GRID DE TARJETAS */}
            <Grid container spacing={3}>
                {displayedData.map((settlement) => (
                    <Grid  size={{xs:12,md:6,lg:4}} key={settlement.doctorId}>
                        <TransactionCard 
                            data={settlement} 
                            onPay={handlePay}
                            onViewDetails={handleViewDetails}
                        />
                    </Grid>
                ))}

                {displayedData.length === 0 && (
                    <Grid  size={{xs:12}}>
                        <Typography variant="h5" color={colors.grey[300]} textAlign="center" mt={4}>
                            No hay registros para mostrar en esta sección.
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};