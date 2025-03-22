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

  const handleDelete = async (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    await deleteUser(deleteId);
    setUsers(users.filter(user => user._id !== deleteId));
    setSuccess("Usuario eliminado exitosamente.");
    setTimeout(() => setSuccess(""), 3000);
    setShowConfirm(false);
    setDeleteId(null);
  };

  const handleEdit = (user) => {
    setFormData({ ...user, password: "" }); // no mostramos la contraseña
    setIsEditing(true);
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

        <form className="dashboard-form" onSubmit={handleSubmit}>
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
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          {!isEditing && (
            <input
              type="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          )}
          <button className="btn-submit" type="submit">{isEditing ? "Actualizar" : "Agregar"}</button>
        </form>

        <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />

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
