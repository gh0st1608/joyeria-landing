import React from "react";
import { Link } from "react-router-dom";

import { FaChartBar, FaShoppingCart, FaUser, FaClipboardList } from "react-icons/fa";
import "../../assets/css/dashboard.css";

const Sidebar = ({ collapsed }) => {


  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">
              <FaChartBar /> {!collapsed && <span>Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link to="/dashboard/products">
              <FaShoppingCart /> {!collapsed && <span>Productos</span>}
            </Link>
          </li>
          <li>
            <Link to="/dashboard/users">
              <FaUser /> {!collapsed && <span>Usuarios</span>}
            </Link>
          </li>
          <li>
            <Link to="/dashboard/clients">
              <FaClipboardList /> {!collapsed && <span>Clientes</span>}
            </Link>
          </li>
        </ul>
      </nav>

    </div>
  );
};

export default Sidebar;
