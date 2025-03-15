import React, { useState, useContext } from "react";
import Sidebar from "../layouts/Sidebar";
import { AuthContext } from "../../context/AuthContext";
import { updateUserSettings } from "../../components/servicios/auth/authService";
import "../../assets/css/dashboard.css";

const Settings = () => {
  const { user, login } = useContext(AuthContext);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    twoFactorAuth: false,
    language: "es",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleToggle = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      const updatedSettings = await updateUserSettings(settings);
      login({ ...user, settings: updatedSettings }, localStorage.getItem("accessToken"));
      setSuccess("✅ Configuración actualizada con éxito.");
    } catch (error) {
      setError("❌ Error al actualizar la configuración.");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h2> Configuración de Cuenta</h2>

        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}

        <form onSubmit={handleSubmit} className="settings-form">
          <label>
            <input type="checkbox" name="emailNotifications" checked={settings.emailNotifications} onChange={handleToggle} />
            Recibir notificaciones por correo
          </label>

          <label>
            <input type="checkbox" name="twoFactorAuth" checked={settings.twoFactorAuth} onChange={handleToggle} />
            Activar autenticación en dos pasos
          </label>

          <label>Idioma</label>
          <select name="language" value={settings.language} onChange={handleChange}>
            <option value="es">Español</option>
            <option value="en">Inglés</option>
          </select>

          <button type="submit" className="btn btn-primary">Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
