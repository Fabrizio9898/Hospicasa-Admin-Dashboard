import { Box, Typography, Divider, Grid, Avatar, Paper, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import { SettlementData } from '../data/doctorsdata';
import { tokens } from '../theme';
import { modalStyle } from '../scenes/doctor-profile/doctorProfile.scene';

interface TransactionDetailsProps {
    data: SettlementData;
    onClose: () => void;
}

export const TransactionDetails = ({ data, onClose }: TransactionDetailsProps) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(amount);
    };

    return (
        <Paper 
            sx={modalStyle(colors)}
        >
            {/* ENCABEZADO DE LIQUIDACIÓN */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Box>
                    <Typography variant="h4" color={colors.grey[100]} fontWeight="bold">
                        Liquidación de Honorarios
                    </Typography>
                    <Typography variant="body2" color={colors.grey[300]}>
                        ID Transacción: #{data.doctorId.padStart(6, '0')} - {data.lastPaymentDate}
                    </Typography>
                </Box>
                <Box textAlign="right">
                    <Typography 
                        variant="subtitle1" 
                        fontWeight="bold" 
                        color={data.status === 'PENDING' ? colors.greenAccent[500] : colors.blueAccent[500]}
                        sx={{ border: `1px solid`, padding: '4px 8px', borderRadius: '4px' }}
                    >
                        {data.status === 'PENDING' ? 'PENDIENTE DE PAGO' : 'PAGADO'}
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* DATOS DEL DOCTOR Y CUENTA */}
            <Grid container spacing={2} mb={4}>
                <Grid size={{xs:12,sm:6}}>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Avatar src={data.doctorImage} sx={{ width: 56, height: 56 }} />
                        <Box>
                            <Typography variant="h5" color={colors.grey[100]} fontWeight="bold">
                                {data.doctorName}
                            </Typography>
                            <Typography variant="body2" color={colors.grey[300]}>
                                {data.doctorEmail}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid size={{xs:12,sm:6}} >
                    <Box bgcolor={colors.primary[400]} p={2} borderRadius={1}>
                        <Typography variant="subtitle2" color={colors.grey[100]} fontWeight="bold">
                            Datos Bancarios
                        </Typography>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                            <Typography variant="body2" color={colors.grey[300]}>CBU:</Typography>
                            <Typography variant="body2" color={colors.grey[100]} fontFamily="monospace">
                                {data.doctorCbu}
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" color={colors.grey[300]}>Alias:</Typography>
                            <Typography variant="body2" color={colors.grey[100]}>
                                {data.doctorAlias}
                            </Typography>
                        </Box>
                        <Button 
                            size="small" 
                            startIcon={<ContentCopyIcon fontSize="small"/>} 
                            sx={{ mt: 1, width: '100%', color: colors.greenAccent[500] }}
                            onClick={() => navigator.clipboard.writeText(data.doctorCbu)}
                        >
                            Copiar CBU
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            {/* DETALLE FINANCIERO (TABLA) */}
            <Box mb={3}>
                <Typography variant="h6" color={colors.grey[100]} mb={2}>
                    Detalle de Servicios
                </Typography>
                
                {/* Fila 1: Ingresos Brutos */}
                <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography color={colors.grey[100]}>
                        Consultas Realizadas ({data.totalAppointments})
                    </Typography>
                    <Typography color={colors.grey[100]}>
                        {formatCurrency(data.totalGross)}
                    </Typography>
                </Box>

                {/* Fila 2: Comisión */}
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography color={colors.redAccent[400]}>
                        Comisión Plataforma (20%)
                    </Typography>
                    <Typography color={colors.redAccent[400]}>
                        - {formatCurrency(data.platformFee)}
                    </Typography>
                </Box>

                <Divider sx={{ borderStyle: 'dashed', mb: 2 }} />

                {/* Fila 3: Total Neto */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4" fontWeight="bold" color={colors.grey[100]}>
                        TOTAL A TRANSFERIR
                    </Typography>
                    <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
                        {formatCurrency(data.netAmount)}
                    </Typography>
                </Box>
            </Box>

            {/* FOOTER / ACCIONES */}
            <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
                <Button variant="outlined" color="error" onClick={onClose}>
                    Cerrar
                </Button>
                <Button variant="contained" color="secondary" startIcon={<DownloadIcon />}>
                    Descargar Comprobante
                </Button>
            </Box>
        </Paper>
    );
};