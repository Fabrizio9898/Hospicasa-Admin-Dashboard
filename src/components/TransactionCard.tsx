import { 
  Box, Card, CardContent, Typography, Avatar, Button, 
  Divider, Chip, useTheme, Grid, IconButton, Tooltip 
} from '@mui/material';
import { 
  AttachMoney, CheckCircle, History, 
  Visibility,
} from '@mui/icons-material';
import { tokens } from '../theme';
import { SettlementData } from '../data/doctorsdata';

// Interface simulada para el frontend (luego vendrá del back)

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
      bgcolor: 'background.paper',
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
            sx={{ width: 50, height: 50,borderColor: 'primary.main',  border: '2px solid'}}
          />
          <Box>
            <Typography variant="h5" fontWeight="bold" color="text.primary">
              {data.doctorName}
            </Typography>
            <Typography variant="caption" color="text.secondary" display="flex" alignItems="center" gap={0.5}>
              <History fontSize="inherit"/> Último pago: {data.lastPaymentDate || 'Nunca'}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

 {/* DATOS FINANCIEROS */}
        <Grid container spacing={2} mb={2}>
          <Grid size={{xs:6}}>
            <Typography variant="caption" color="text.secondary">Citas Realizadas</Typography>
            <Typography variant="h4" fontWeight="bold" color="text.primary">{data.totalAppointments}</Typography>
          </Grid>
          <Grid size={{xs:6}}  textAlign="right">
             <Typography variant="caption" color="text.secondary">A Transferir</Typography>
             {/* Usamos 'success.main' para dinero, se lee bien siempre */}
             <Typography variant="h4" fontWeight="bold" color="success.main">
                {formatMoney(data.netAmount)}
             </Typography>
             <Typography variant="caption" display="block" color="text.secondary">
                (Comisión descontada)
             </Typography>
          </Grid>
        </Grid>


        {/* DATOS BANCARIOS RÁPIDOS (Para copiar y pegar) */}
        <Box  
          bgcolor="action.hover" 
          p={1.5} 
          borderRadius="8px" 
          mb={3}
          border="1px dashed"
          borderColor="divider">
            <Box display="flex" justifyContent="space-between" mb={0.5}>
                <Typography variant="caption" color="text.secondary">CBU:</Typography>
                <Typography variant="caption" fontFamily="monospace" color="text.primary">
                  {data.doctorCbu || 'No cargado'}
                </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
                 <Typography variant="caption" color="text.secondary">Alias:</Typography>
                <Typography variant="caption" fontFamily="monospace" fontWeight="bold" color="primary.main">
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
            <IconButton onClick={() => onViewDetails(data.doctorId)}>
                <Visibility />
            </IconButton>
          </Tooltip>
        </Box>

      </CardContent>
    </Card>
  );
};