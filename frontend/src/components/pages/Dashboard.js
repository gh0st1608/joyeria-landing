import React, { useState, useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import { AuthContext } from "../../context/AuthContext";
import { FaSun, FaMoon, FaSearch, FaBars, FaUserCircle } from "react-icons/fa";
import "../../assets/css/dashboard.css";

const Dashboard = ({ children }) => {
  const history = useHistory();
  const { user, logout } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="dashboard-page">
      <header className="topbar">
        <button className="menu-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Buscar en el panel..." />
        </div>
        <div className="topbar-actions">
          <button className="toggle-theme-btn" onClick={toggleTheme} title="Cambiar tema">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <div className="profile-container" ref={menuRef}>
            <button className="profile-btn" onClick={() => setMenuOpen(!menuOpen)}>
              <FaUserCircle className="profile-icon" />
              <span className="profile-name">{user?.name || "Usuario"}</span>
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
      </header>

      <div className="dashboard-layout">
        <Sidebar collapsed={sidebarCollapsed} showNamesOnHover={true} />
        <div className={`dashboard-main-content ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <h2>Panel de Administración</h2>
          <p>Bienvenido, {user?.name || "Usuario"}.</p>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;