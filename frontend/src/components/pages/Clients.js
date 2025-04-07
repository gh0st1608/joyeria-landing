import React, { useEffect, useState } from "react";
import Dashboard from "../pages/Dashboard";
import { getUsers, deleteUser, createUser, updateUser } from "../servicios/auth/authService";
import ClientTable from "../sections/dashboard/ClientTable";
import "../../assets/css/dashboard.css";
import Swal from 'sweetalert2';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({ id: "", name: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();
        setClients(data);
      } catch (error) {
        console.error("Error cargando clientes:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Eliminar cliente?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteUser(id);
        setClients(clients.filter(client => client._id !== id));
        Swal.fire('¡Eliminado!', 'El cliente ha sido eliminado.', 'success');
      }
    });
  };

  const handleEdit = (client) => {
    setFormData({ id: client._id, name: client.name, email: client.email });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleNewClient = () => {
    setFormData({ id: "", name: "", email: "" });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateUser(formData.id, formData);
        setClients(clients.map(c => (c._id === formData.id ? { ...c, ...formData } : c)));
      } else {
        const newClient = await createUser(formData);
        setClients([...clients, newClient]);
      }
      setShowModal(false);
      setFormData({ id: "", name: "", email: "" });
      setIsEditing(false);
    } catch (error) {
      console.error("Error al guardar cliente:", error);
    }
  };

  const filteredClients = clients.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dashboard>
      <div className="dashboard-content">
        <h2>Gestión de Clientes</h2>

        <div className="filters-container">
          <input
            type="text"
            placeholder="Buscar cliente por nombre o email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="btn-new-product" onClick={handleNewClient}>Nuevo Cliente</button>
        </div>

        <ClientTable clients={filteredClients} onEdit={handleEdit} onDelete={handleDelete} />

        {showModal && (
          <div className="custom-modal-overlay">
            <div className="custom-modal">
              <h3>{isEditing ? "Editar Cliente" : "Nuevo Cliente"}</h3>
              <form onSubmit={handleSubmit}>
                <div className="modal-form-grid">
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
                </div>
                <div className="custom-modal-buttons">
                  <button type="submit" className="btn-edit">Guardar</button>
                  <button type="button" className="btn-delete" onClick={() => setShowModal(false)}>Cerrar</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Dashboard>
  );
};

export default Clients;
