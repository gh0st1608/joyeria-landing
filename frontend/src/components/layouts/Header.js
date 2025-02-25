import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext"; // ✅ Importar autenticación
import { Link, useHistory } from "react-router-dom";

const Header = () => {
  const { cart } = useContext(CartContext);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const history = useHistory();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    logout();
    history.push("/login"); // ✅ Redirigir al login después de cerrar sesión
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">🛍 Peru Joyas</Link>
        </div>

        {/* Botón de menú responsivo */}
        <button className="menu-toggle" onClick={toggleMenu}>🍔</button>

        <nav className={menuOpen ? "nav-menu open" : "nav-menu"}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop-left">Shop</Link></li>
            <li>
              <Link to="/cart" className="cart-link">
                🛒 Cart <span className="cart-count">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
              </Link>
            </li>
            {!isAuthenticated ? (
              <li><Link to="/login">🔑 Login</Link></li>
            ) : (
              <li><button onClick={handleLogout} className="logout-btn">🚪 Logout</button></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
