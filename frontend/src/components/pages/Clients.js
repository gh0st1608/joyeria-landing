import React, { useEffect, useState } from "react";
import Sidebar from "../../components/layouts/Sidebar";
import { getClients, deleteClient, createClient, updateClient } from "../servicios/dashboard/clientService";
import ClientTable from "../sections/dashboard/ClientTable";


const Clients = () => {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({ id: "", name: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);

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

  const handleDelete = async (id) => {
    await deleteClient(id);
    setClients(clients.filter(client => client.id !== id));
  };

  const handleEdit = (client) => {
    setFormData(client);
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateClient(formData);
      setClients(clients.map(c => (c.id === formData.id ? formData : c)));
    } else {
      const newClient = await createClient(formData);
      setClients([...clients, newClient]);
    }
    setFormData({ id: "", name: "", email: "" });
    setIsEditing(false);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h2> Gestión de Clientes</h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <button type="submit">{isEditing ? "Actualizar" : "Agregar"}</button>
        </form>

        <ClientTable clients={clients} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Clients;
