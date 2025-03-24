import React, { useEffect, useState } from "react";
import Dashboard from "../pages/Dashboard";
import { getUsers, deleteUser, createUser, updateUser } from "../servicios/dashboard/userService";
import UserTable from "../sections/dashboard/UserTable";
import "../../assets/css/dashboard.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ _id: "", name: "", lastname: "", email: "", password: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error cargando usuarios:", error);
      }
    };
    fetchData();
  }, []);

  const openNewUserModal = () => {
    setFormData({ _id: "", name: "", lastname: "", email: "", password: "" });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setFormData({ ...user, password: "" });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (_id) => {
    const confirm = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (confirm) {
      await deleteUser(_id);
      setUsers(users.filter(user => user._id !== _id));
      setSuccess("Usuario eliminado exitosamente.");
      setTimeout(() => setSuccess(""), 3000);
    }
  };


  const confirmDelete = async () => {
    await deleteUser(deleteId);
    setUsers(users.filter(user => user._id !== deleteId));
    setSuccess("Usuario eliminado exitosamente.");
    setTimeout(() => setSuccess(""), 3000);
    setShowConfirm(false);
    setDeleteId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name.trim() || !formData.lastname.trim() || !formData.email.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      setError("El formato del email no es válido.");
      return;
    }

    try {
      if (isEditing) {
        await updateUser(formData._id, formData);
        setUsers(users.map(u => (u._id === formData._id ? formData : u)));
        setSuccess("Usuario actualizado exitosamente.");
      } else {
        const newUser = await createUser(formData);
        setUsers([...users, newUser]);
        setSuccess("Usuario agregado exitosamente.");
      }
      setFormData({ _id: "", name: "", lastname: "", email: "", password: "" });
      setIsEditing(false);
      setShowModal(false);
    } catch (error) {
      setError("Ocurrió un error al guardar el usuario.");
    }

    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <Dashboard>
      <div className="dashboard-content">
        <h2>Gestión de Usuarios</h2>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <button className="btn-new-product" onClick={openNewUserModal}>Nuevo Usuario</button>

        <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />

        {showModal && (
          <div className="custom-modal-overlay">
            <div className="custom-modal">
              <h3>{isEditing ? "Editar Usuario" : "Nuevo Usuario"}</h3>


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
                    type="text"
                    placeholder="Apellido"
                    value={formData.lastname}
                    onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                    required
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="full-width"
                />
                {!isEditing && (
                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="full-width"
                  />
                )}
                <div className="custom-modal-buttons">
                  <button type="submit" className="btn-edit">Guardar</button>
                  <button type="button" className="btn-delete" onClick={() => setShowModal(false)}>Cerrar</button>
                </div>
              </form>




            </div>
          </div>
        )}

        {showConfirm && (
          <div className="modal-overlay show">
            <div className="modal">
              <p>¿Estás seguro de que quieres eliminar este usuario?</p>
              <div className="modal-buttons">
                <button className="btn-cancel" onClick={() => setShowConfirm(false)}>Cancelar</button>
                <button className="btn-confirm" onClick={confirmDelete}>Confirmar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Dashboard>
  );
};

export default Users;
