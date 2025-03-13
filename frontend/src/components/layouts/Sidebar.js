import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaChartBar, FaShoppingCart, FaUser, FaClipboardList, FaSun, FaMoon, FaSignOutAlt, FaCog, FaUserCircle } from "react-icons/fa";
import "./../../assets/css/dashboard.css"; // ✅ Importamos los estilos corregidos





const Sidebar = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <>
      {/* 🔹 Barra superior */}
      <div className="top-bar">
        <button className="toggle-theme-btn" onClick={toggleTheme}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/* 🔹 Perfil en la esquina superior derecha */}
        <div className="profile-container">
          <img
            src="https://via.placeholder.com/40" // ✅ Cambia a la imagen real del usuario
            alt="Perfil"
            className="profile-pic"
            onClick={() => setMenuOpen(!menuOpen)}
          />

          {menuOpen && (
            <div className="profile-dropdown">
              <ul>
                <li>
                  <Link to="/profile">
                    <FaUserCircle /> Mi Perfil
                  </Link>
                </li>
                <li>
                  <Link to="/settings">
                    <FaCog /> Configuración
                  </Link>
                </li>
                <li onClick={() => alert("Cerrando sesión...")}>
                  <FaSignOutAlt /> Cerrar Sesión
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* 🔹 Sidebar (Menú lateral con íconos) */}
      <div className="sidebar">
        <nav>
          <ul>
            <li>
              <Link to="/dashboard" title="Dashboard">
                <FaChartBar />
              </Link>
            </li>
            <li>
              <Link to="/dashboard/products" title="Productos">
                <FaShoppingCart />
              </Link>
            </li>
            <li>
              <Link to="/dashboard/users" title="Usuarios">
                <FaUser />
              </Link>
            </li>
            <li>
              <Link to="/dashboard/clients" title="Clientes">
                <FaClipboardList />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
