import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";


const Header = () => {
  const { cart } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/shop-left">Tienda</Link></li>
            <li>
              <Link to="/cart" className="cart-link">
                🛒 Carrito <span className="cart-count">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
