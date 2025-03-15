import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaChartBar, FaShoppingCart, FaUser, FaClipboardList } from "react-icons/fa";
import "../../assets/css/dashboard.css";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">
              <FaChartBar /> <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/products">
              <FaShoppingCart /> <span>Productos</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/users">
              <FaUser /> <span>Usuarios</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/clients">
              <FaClipboardList /> <span>Clientes</span>
            </Link>
          </li>
        </ul>
      </nav>
      <button className="logout-btn" onClick={logout}>
        {/* <FaSignOutAlt /> <span>Cerrar Sesión</span> */}
      </button>
    </div>
  );
};

export default Sidebar;
