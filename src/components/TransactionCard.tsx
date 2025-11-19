import { 
  Box, Card, CardContent, Typography, Avatar, Button, 
  Divider, Chip, useTheme, Grid, IconButton, Tooltip 
} from '@mui/material';
import { 
  AttachMoney, CalendarMonth, CheckCircle, History, 
  Visibility, WhatsApp 
} from '@mui/icons-material';
import { tokens } from '../theme';

// Interface simulada para el frontend (luego vendrá del back)
export interface SettlementData {
  doctorId: string;
  doctorName: string;
  doctorImage: string;
  doctorCbu?: string; // Datos bancarios
  doctorAlias?: string;
  
  totalAppointments: number; // Cantidad de citas
  totalGross: number; // Total facturado
  platformFee: number; // Tu comisión
  netAmount: number; // Lo que le transfieres (Gross - Fee)
  
  status: 'PENDING' | 'PAID';
  lastPaymentDate?: string;
}

interface TransactionCardProps {
  data: SettlementData;
  onPay: (id: string) => void;
  onViewDetails: (id: string) => void;
}

export const TransactionCard = ({ data, onPay, onViewDetails }: TransactionCardProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Formateador de moneda
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(amount);
  };

  const isPaid = data.status === 'PAID';

  return (
    <Card sx={{ 
      bgcolor: colors.primary[400], 
      borderRadius: '12px',
      border: isPaid ? `1px solid ${colors.greenAccent[500]}` : `1px solid ${colors.grey[700]}`,
      position: 'relative',
      overflow: 'visible'
    }}>
      {/* Badge de Estado */}
      <Chip 
        label={isPaid ? "PAGADO" : "PENDIENTE"} 
        color={isPaid ? "success" : "warning"}
        size="small"
        sx={{ position: 'absolute', top: 10, right: 10, fontWeight: 'bold' }}
      />

      <CardContent>
        {/* HEADER DOCTOR */}
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar 
            src={data.doctorImage} 
            sx={{ width: 50, height: 50, border: `2px solid ${colors.blueAccent[500]}` }}
          />
          <Box>
            <Typography variant="h5" fontWeight="bold" color={colors.grey[100]}>
              {data.doctorName}
            </Typography>
            <Typography variant="caption" color={colors.grey[400]} display="flex" alignItems="center" gap={0.5}>
              <History fontSize="inherit"/> Último pago: {data.lastPaymentDate || 'Nunca'}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* DATOS FINANCIEROS */}
        <Grid container spacing={2} mb={2}>
          <Grid  size={{xs:6}}>
            <Typography variant="caption" color={colors.grey[300]}>Citas Realizadas</Typography>
            <Typography variant="h4" fontWeight="bold">{data.totalAppointments}</Typography>
          </Grid>
          <Grid  size={{xs:6}} textAlign="right">
             <Typography variant="caption" color={colors.grey[300]}>A Transferir</Typography>
             <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[400]}>
                {formatMoney(data.netAmount)}
             </Typography>
             <Typography variant="caption" display="block" color={colors.grey[500]}>
                (Comisión descontada)
             </Typography>
          </Grid>
        </Grid>

        {/* DATOS BANCARIOS RÁPIDOS (Para copiar y pegar) */}
        <Box bgcolor={colors.primary[500]} p={1.5} borderRadius="8px" mb={3}>
            <Box display="flex" justifyContent="space-between" mb={0.5}>
                <Typography variant="caption" color={colors.grey[400]}>CBU:</Typography>
                <Typography variant="caption" fontFamily="monospace">{data.doctorCbu || 'No cargado'}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="caption" color={colors.grey[400]}>Alias:</Typography>
                <Typography variant="caption" fontFamily="monospace" fontWeight="bold" color={colors.blueAccent[300]}>
                    {data.doctorAlias || 'No cargado'}
                </Typography>
            </Box>
        </Box>

        {/* ACCIONES */}
        <Box display="flex" gap={1}>
          {!isPaid ? (
            <Button 
              variant="contained" 
              color="secondary" 
              fullWidth 
              startIcon={<AttachMoney />}
              onClick={() => onPay(data.doctorId)}
            >
              Registrar Pago
            </Button>
          ) : (
             <Button variant="outlined" disabled fullWidth startIcon={<CheckCircle />}>
                Liquidado
             </Button>
          )}
          
          <Tooltip title="Ver detalle de citas">
            <IconButton onClick={() => onViewDetails(data.doctorId)} sx={{ bgcolor: colors.primary[500] }}>
                <Visibility />
            </IconButton>
          </Tooltip>
        </Box>

      </CardContent>
    </Card>
  );
};