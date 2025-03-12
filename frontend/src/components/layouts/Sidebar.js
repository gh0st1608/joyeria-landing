import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <nav>
        <ul>
          <li><Link to="/dashboard"> Dashboard</Link></li>
          <li><Link to="/dashboard/products"> Productos</Link></li>
          <li><Link to="/dashboard/users"> Usuarios</Link></li>
          <li><Link to="/dashboard/clients"> Clientes</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
