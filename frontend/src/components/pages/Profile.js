import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
// import { updateUserProfile } from "../../servicios/auth/authService";
import { updateUserSettings } from "../servicios/auth/authService"; 

import "../../assets/css/dashboard.css";

const Profile = () => {
  const { user, login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      const updatedUser = await updateUserSettings(formData);
      login(updatedUser, localStorage.getItem("accessToken")); // Actualizar el contexto
      setSuccess("✅ Perfil actualizado con éxito.");
    } catch (error) {
      setError("❌ Error al actualizar el perfil.");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h2> Mi Perfil</h2>

        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}

        <form onSubmit={handleSubmit} className="profile-form">
          <label>Nombre</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Nueva Contraseña</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />

          <button type="submit" className="btn btn-primary">Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
