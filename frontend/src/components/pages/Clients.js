import React, { useEffect, useState } from "react";
import Sidebar from "../../components/layouts/Sidebar";
import { getClients } from "../servicios/dashboard/clientService";
import ClientTable from "../sections/dashboard/ClientTable";

const Clients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getClients();
        setClients(data);
      } catch (error) {
        console.error("Error cargando clientes:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h2> Gestión de Clientes</h2>
        <ClientTable clients={clients} />
      </div>
    </div>
  );
};

export default Clients;
