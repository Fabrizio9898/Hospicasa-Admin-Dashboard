import { useState } from 'react';
import { 
  Box, Typography, Tabs, Tab, Grid, 
  Button, Alert, AlertTitle 
} from '@mui/material';
import { 
  AttachMoney, History, CalendarToday, 
  Download 
} from '@mui/icons-material';
import Header from '../../components/Header';
import { SettlementData, TransactionCard } from '../../components/TransactionCard';


// --- MOCK DATA ---
const MOCK_SETTLEMENTS: SettlementData[] = [
    {
        doctorId: '1',
        doctorName: 'Dr. Gregory House',
        doctorImage: '',
        doctorAlias: 'HOUSE.MEDICINA.MP',
        totalAppointments: 12,
        totalGross: 120000,
        platformFee: 24000,
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
        status: 'PAID', 
        lastPaymentDate: '17/11/2023'
    }
];

export const Transactions = () => {
    const [currentTab, setCurrentTab] = useState(0);

    const getCurrentPeriodLabel = () => {
        return "Jue 16 Nov - Mié 22 Nov";
    };

    const displayedData = MOCK_SETTLEMENTS.filter(item => 
        currentTab === 0 ? item.status === 'PENDING' : item.status === 'PAID'
    );

    const totalPendingAmount = MOCK_SETTLEMENTS
        .filter(i => i.status === 'PENDING')
        .reduce((acc, curr) => acc + curr.netAmount, 0);

    const handlePay = (id: string) => console.log("Pagando a:", id);
    const handleViewDetails = (id: string) => console.log("Viendo detalle de:", id);

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="FINANZAS Y LIQUIDACIONES" subtitle="Gestión de pagos a profesionales" />
                <Button variant="outlined" color="secondary" startIcon={<Download />}>
                    Exportar Excel
                </Button>
            </Box>

            {/* RESUMEN FINANCIERO */}
            {currentTab === 0 && (
                <Grid container spacing={2} mb={4}>
                    <Grid size={{xs:12}}>
                        <Alert severity="info" icon={<CalendarToday fontSize="inherit" />}>
                            <AlertTitle>Periodo de Liquidación Actual</AlertTitle>
                            Estás visualizando las citas realizadas entre el <strong>{getCurrentPeriodLabel()}</strong>.
                        </Alert>
                    </Grid>
                    <Grid size={{ xs:12,md:4}}>
                        <Box 
                            bgcolor="secondary.main" // Usamos el color del tema
                            p="20px" 
                            borderRadius="8px"
                            color="secondary.contrastText" // Asegura texto legible sobre el verde
                        >
                            <Typography variant="h5" fontWeight="bold" color="inherit">
                                Total a Transferir Hoy
                            </Typography>
                            <Typography variant="h3" fontWeight="bold" mt="10px" color="inherit">
                                {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(totalPendingAmount)}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            )}

            <Box borderBottom={1} borderColor="divider" mb={3}>
                <Tabs 
                    value={currentTab} 
                    onChange={(_e, val) => setCurrentTab(val)}
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                    <Tab icon={<AttachMoney />} label="Pendientes de Pago" iconPosition="start" />
                    <Tab icon={<History />} label="Historial Transferencias" iconPosition="start" />
                </Tabs>
            </Box>

            <Grid container spacing={3}>
                {displayedData.map((settlement) => (
                    <Grid size={{xs:12 ,md:6 ,lg:4}}  key={settlement.doctorId}>
                        <TransactionCard
                            data={settlement} 
                            onPay={handlePay}
                            onViewDetails={handleViewDetails}
                        />
                    </Grid>
                ))}

                {displayedData.length === 0 && (
                    <Grid size={{ xs:12}}>
                        <Typography variant="h5" color="text.secondary" textAlign="center" mt={4}>
                            No hay registros para mostrar en esta sección.
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};