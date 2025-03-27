import React from "react";
import { Link } from "react-router-dom";
import {
  FaChartBar,
  FaShoppingCart,
  FaUser,
  FaClipboardList,
  FaShoppingBasket,
  FaCreditCard
} from "react-icons/fa";
import "../../assets/css/dashboard.css";

const Sidebar = ({ collapsed, userRole }) => {
  const isAdmin = userRole === "ADMIN";

  const menuItems = [
    isAdmin && { to: "/dashboard", icon: <FaChartBar />, label: "Dashboard" },
    isAdmin && { to: "/dashboard/products", icon: <FaShoppingCart />, label: "Productos" },
    isAdmin && { to: "/dashboard/users", icon: <FaUser />, label: "Usuarios" },
    isAdmin && { to: "/dashboard/clients", icon: <FaClipboardList />, label: "Clientes" },
    { to: "/dashboard/purchases", icon: <FaShoppingBasket />, label: "Compras" },
    { to: "/dashboard/payments", icon: <FaCreditCard />, label: "Pagos" }
  ].filter(Boolean); // Elimina los null cuando no es admin

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <nav>
        <ul>
          {menuItems.map(({ to, icon, label }) => (
            <li key={to}>
              <Link to={to}>
                {icon}
                {!collapsed && <span>{label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
