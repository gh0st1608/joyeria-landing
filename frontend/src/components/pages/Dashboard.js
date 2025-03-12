import React from "react";
import Sidebar from "../../components/layouts/Sidebar"; // ✅ Importamos el Sidebar

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h2>Panel de Administración</h2>
        <p>Bienvenido al panel de control.</p>
      </div>
    </div>
  );
};

export default Dashboard;
