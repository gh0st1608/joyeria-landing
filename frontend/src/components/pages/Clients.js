import React, { useEffect, useState } from "react";
import Dashboard from "../pages/Dashboard"; // Contenedor principal con Sidebar y topbar
import { getUsers, deleteUser, createUser, updateUser } from "../servicios/dashboard/userService";
import ClientTable from "../sections/dashboard/ClientTable";
import "../../assets/css/dashboard.css";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({ id: "", name: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();  // ✅ Aquí cambia a getUsers
        setClients(data);
      } catch (error) {
        console.error("Error cargando clientes:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteUser(id);  // ✅ Cambiar a deleteUser
    setClients(clients.filter(client => client.id !== id));
  };

  const handleEdit = (client) => {
    setFormData(client);
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateUser(formData);  // ✅ Cambiar a updateUser
      setClients(clients.map(c => (c.id === formData.id ? formData : c)));
    } else {
      const newClient = await createUser(formData);  // ✅ Cambiar a createUser
      setClients([...clients, newClient]);
    }
    setFormData({ id: "", name: "", email: "" });
    setIsEditing(false);
  };

  return (
    <Dashboard>
      <div className="dashboard-content">
        <h2>Gestión de Clientes</h2>

        <form onSubmit={handleSubmit} className="client-form">
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
    </Dashboard>
  );
};

export default Clients;
