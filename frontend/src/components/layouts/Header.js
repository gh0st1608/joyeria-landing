import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import AuthModal from "../sections/auth/AuthModal";
import marca from "../../assets/img/marca.jpg"; // ✅ Importamos la imagen correctamente

const Header = () => {
  const { cart } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={marca} alt="Logo" className="logo-img" />Peru Joyas
          </Link>
        </div>

        {/* <button className="menu-toggle" onClick={toggleMenu}>🍔</button> */}

        <nav className={menuOpen ? "nav-menu open" : "nav-menu"}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop-left">Catálogo</Link></li>
            <li><Link to="/contact">📩 Contáctanos</Link></li> {/* ✅ Agregado */}
            <li>
              <Link to="/cart" className="cart-link">
                🛒 Cart <span className="cart-count">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
              </Link>
            </li>
            <li>
              <button className="btn btn-primary" onClick={() => setShowAuthModal(true)}>🔐 Login </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* ✅ Modal de Autenticación (Login / Registro) */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </header>
  );
};

export default Header;
