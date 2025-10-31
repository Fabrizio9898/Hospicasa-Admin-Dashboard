import { useState } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";



function DashboardLayout() {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Topbar />
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;