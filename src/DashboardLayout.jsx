import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Form from "./scenes/form";
import FAQ from "./scenes/faq";

// NOTA: Los Providers (Theme, ColorMode) ya no van aquí

function DashboardLayout() {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        {/* Estas son las rutas *dentro* del dashboard */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/form" element={<Form />} />
          <Route path="/faq" element={<FAQ />} />
          {/* Faltaría una ruta para registrar usuarios (para tu super-admin) */}
          {/* <Route path="/register-user" element={<RegisterForm />} /> */}
        </Routes>
      </main>
    </div>
  );
}

export default DashboardLayout;
