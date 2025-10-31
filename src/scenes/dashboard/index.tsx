import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData"; // Asegúrate que este archivo sea .ts
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
// import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    // CAMBIO: 'm' movido a 'sx'
    <Box sx={{ m: "20px" }}>
      {/* HEADER */}
      {/* CAMBIO: props de display/justify/align movidas a 'sx' */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      {/* CAMBIO: props de grid movidas a 'sx' */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        sx={{ gap: "20px" }}
      >
        {/* ROW 1 */}
        {/* CAMBIO: props de estilo movidas a 'sx' */}
        <Box
          gridColumn="span 3"
          sx={{
            backgroundColor: colors.primary[400],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StatBox
            title="12,361"
            subtitle="Emails Sent"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* CAMBIO: props de estilo movidas a 'sx' */}
        <Box
          gridColumn="span 3"
          sx={{
            backgroundColor: colors.primary[400],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StatBox
            title="431,225"
            subtitle="Sales Obtained"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* CAMBIO: props de estilo movidas a 'sx' */}
        <Box
          gridColumn="span 3"
          sx={{
            backgroundColor: colors.primary[400],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StatBox
            title="32,441"
            subtitle="New Clients"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* CAMBIO: props de estilo movidas a 'sx' */}
        <Box
          gridColumn="span 3"
          sx={{
            backgroundColor: colors.primary[400],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StatBox
            title="1,325,134"
            subtitle="Traffic Received"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        {/* CAMBIO: 'backgroundColor' movido a 'sx' */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          sx={{ backgroundColor: colors.primary[400] }}
        >
          {/* CAMBIO: props de layout (mt, p, display, etc) movidas a 'sx' */}
          <Box
            sx={{
              mt: "25px",
              p: "0 30px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          {/* CAMBIO: 'height' y 'm' movidas a 'sx' */}
          <Box sx={{ height: "250px", m: "-20px 0 0 0" }}>
            {/* <LineChart isDashboard={true} /> */}
          </Box>
        </Box>
        {/* CAMBIO: 'backgroundColor' y 'overflow' movidas a 'sx' */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          sx={{
            backgroundColor: colors.primary[400],
            overflow: "auto",
          }}
        >
          {/* CAMBIO: props de estilo movidas a 'sx'. Prop 'colors' eliminada (no es válida) */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: `4px solid ${colors.primary[500]}`,
              p: "15px",
            }}
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            // CAMBIO: props de estilo movidas a 'sx'
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
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              {/* CAMBIO: 'color' movido a 'sx' */}
              <Box sx={{ color: colors.grey[100] }}>{transaction.date}</Box>
              {/* CAMBIO: props de estilo movidas a 'sx' */}
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

        {/* ROW 3 */}
        {/* CAMBIO: 'backgroundColor' y 'p' movidas a 'sx' */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          sx={{
            backgroundColor: colors.primary[400],
            p: "30px",
          }}
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          {/* CAMBIO: props de estilo movidas a 'sx' */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: "25px",
            }}
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;