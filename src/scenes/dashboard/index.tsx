import { useEffect } from "react";
import { Box, Button, CircularProgress, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom"; // <-- 1. IMPORTAR LINK
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData"; 
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import { useDashboardStore } from "../../store/dashboardData.store";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'; 

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { kpis, isLoading, error, fetchKpis } = useDashboardStore();

  useEffect(() => {
    fetchKpis();
  }, [fetchKpis]);

  // --- (Estados de Loading y Error - están perfectos) ---
  if (isLoading) {
    return (
      <Box sx={{ m: "20px", display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <CircularProgress color="secondary" size={60} />
      </Box>
    );
  }
  if (error) {
    // ... (tu estado de error)
  }

  // --- RENDERIZADO DEL DASHBOARD ---
  return (
    <Box sx={{ m: "20px" }}>
      {/* HEADER */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Header title="DASHBOARD" subtitle="Bienvenido a tu panel de administración"  />
        {/* (Botón de reportes) */}
      </Box>

      {/* --- NUEVO GRID DE KPIs (4 Cajas, todas son links) --- */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        sx={{ gap: "20px" }}
      >
        {/* KPI 1: GANANCIAS */}
        <Box
          gridColumn="span 3"
          component={Link} // <-- 2. ES UN LINK
          to="/invoices" // <-- 3. A DÓNDE VA
          sx={{
            backgroundColor: colors.primary[400],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none", // <-- 4. Saca el subrayado
            '&:hover': {
              backgroundColor: colors.primary[300] // (Efecto hover)
            }
          }}
        >
          <StatBox
            title={`$${kpis?.revenueMonth.toLocaleString() || "0"}`}
            subtitle="Ganancias del Mes"
            progress="0" // (Quitamos esto)
            increase=" " // (Quitamos esto)
            icon={<PointOfSaleIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>

        {/* KPI 2: DOCTORES PENDIENTES */}
        <Box
          gridColumn="span 3"
          component={Link}
          to="/team" // <-- Te lleva a la página de Doctores
          sx={{
            backgroundColor: colors.primary[400],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            '&:hover': {
              backgroundColor: colors.primary[300]
            }
          }}
        >
          <StatBox
            title={kpis?.pendingDoctorsCount.toString() || "0"}
            subtitle="Doctores Pendientes"
            progress="0"
            increase={`+${kpis?.newDoctorsMonth || '0'} nuevos`} // (Dato secundario)
            icon={<MedicalServicesIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>

        {/* KPI 3: NUEVOS PACIENTES */}
        <Box
          gridColumn="span 3"
          component={Link}
          to="/contacts" // <-- Te lleva a la página de Pacientes
          sx={{
            backgroundColor: colors.primary[400],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            '&:hover': {
              backgroundColor: colors.primary[300]
            }
          }}
        >
          <StatBox
            title={kpis?.newPatientsMonth.toString() || "0"}
            subtitle="Nuevos Pacientes (Mes)"
            progress="0"
            increase=" "
            icon={<PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>

        {/* KPI 4: CITAS DEL MES */}
        <Box
          gridColumn="span 3"
          component={Link}
          to="/invoices" // <-- Te lleva a la página de Citas/Facturas
          sx={{
            backgroundColor: colors.primary[400],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            '&:hover': {
              backgroundColor: colors.primary[300]
            }
          }}
        >
          <StatBox
            title={kpis?.appointmentsMonth.toString() || "0"}
            subtitle="Citas del Mes"
            progress="0"
            increase=" "
            icon={<TrafficIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>

        {/* --- ROW 2 (REDISEÑADA) --- */}

        {/* Transacciones Recientes (más grande) */}
        <Box
          gridColumn="span 12" // <-- Ocupa todo el ancho
          gridRow="span 2"
          sx={{
            backgroundColor: colors.primary[400],
            overflow: "hidden", // (No auto, para que no tenga scroll)
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: `4px solid ${colors.primary[500]}`,
              p: "15px",
            }}
          >
            <Typography color="text.primary" variant="h5" fontWeight="600">
              Transacciones Recientes
            </Typography>
            {/* 5. BOTÓN "VER MÁS" */}
            <Button
              component={Link}
              to="/transactions" // <-- Te lleva a la futura página de pagos
              variant="contained"
              color="secondary"
              size="small"
            >
              Ver Más
            </Button>
          </Box>
          
          {/* 6. Muestra solo las ÚLTIMAS 5 */}
          {mockTransactions.slice(0, 5).map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `4px solid ${colors.primary[500]}`,
                p: "15px",
              }}
            >
              {/* (Tu JSX para cada transacción) */}
              <Box>
                <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">
                  {transaction.txId}
                </Typography>
                <Typography color="text.primary">
                  {transaction.user}
                </Typography>
              </Box>
              <Box sx={{ color: 'text.primary' }}>{transaction.date}</Box>
              <Box
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  p: "5px 10px",
                  borderRadius: "4px",
                }}
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>
        
      </Box>
    </Box>
  );
};

export default Dashboard;