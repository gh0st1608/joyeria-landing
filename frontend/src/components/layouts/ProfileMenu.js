import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./../../assets/css/dashboard.css"; // ✅ Agrega estilos separados

const ProfileMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Alternar menú
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="profile-container">
      <img
        src="https://via.placeholder.com/40" // ✅ Reemplaza con la URL de la imagen del usuario
        alt="Perfil"
        className="profile-pic"
        onClick={toggleMenu}
      />

      {/* Menú desplegable */}
      {menuOpen && (
        <div className="profile-dropdown">
          <ul>
            <li>
              <Link to="/profile">👤 Mi Perfil</Link>
            </li>
            <li>
              <Link to="/settings">⚙️ Configuración</Link>
            </li>
            <li onClick={() => alert("Cerrando sesión...")}>
              🚪 Cerrar Sesión
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
