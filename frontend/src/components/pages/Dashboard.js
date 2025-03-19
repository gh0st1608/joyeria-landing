import React, { useState, useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import { AuthContext } from "../../context/AuthContext";
import { FaSun, FaMoon, FaSearch, FaBars, FaUserCircle } from "react-icons/fa";
import "../../assets/css/dashboard.css";

const Dashboard = () => {
  const history = useHistory();
  const { user, logout } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="dashboard-container">
      {/* 🔹 Barra superior */}
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
          <div className="profile-container" ref={menuRef}>
            <button className="profile-btn" onClick={() => setMenuOpen(!menuOpen)}>
              <FaUserCircle className="profile-icon" />
              <span>{user?.name || "Usuario"}</span>
            </button>
            {menuOpen && (
              <div className="profile-dropdown">
                <ul>
                  <li onClick={() => history.push("/dashboard/profile")}>Mi Perfil</li>
                  <li onClick={() => history.push("/dashboard/settings")}>Configuración</li>
                  <li onClick={logout}>Cerrar Sesión</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🔹 Sidebar y contenido principal */}
      <div className="main-content">
        <Sidebar />
        <div className="dashboard-content">
          <h2>Panel de Administración</h2>
          <p>Bienvenido, {user?.name || "Usuario"}.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
