import React, { useState, useContext } from "react";
import Sidebar from "../layouts/Sidebar";
import { AuthContext } from "../../context/AuthContext";
import { FaSun, FaMoon, FaSearch, FaBars, FaUserCircle, FaCog } from "react-icons/fa";
import "../../assets/css/dashboard.css";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [menuOpen, setMenuOpen] = useState(false);

  // Alternar Modo Nocturno/Día
  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="dashboard-container">
      {/* 🔹 Barra Superior */}
      <div className="topbar">
        <button className="menu-btn">
          <FaBars />
        </button>
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Buscar en el dashboard..." />
        </div>
        <div className="topbar-icons">
          <button className="toggle-theme-btn" onClick={toggleTheme}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button className="settings-btn">
            <FaCog />
          </button>
          <div className="profile-container" onClick={() => setMenuOpen(!menuOpen)}>
            <FaUserCircle className="profile-icon" />
            {menuOpen && (
              <div className="profile-dropdown">
                <ul>
                  <li>Mi Perfil</li>
                  <li onClick={logout}>Cerrar Sesión</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🔹 Sidebar y Contenido */}
      <div className="main-content">
        <Sidebar />
        <div className="dashboard-content">
          <h2> Panel de Administración</h2>
          <p>Bienvenido al dashboard.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
