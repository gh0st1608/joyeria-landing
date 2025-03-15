import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaMapMarkerAlt, FaCalendarAlt, FaHeart, FaUser, FaShoppingBag } from "react-icons/fa";
import AuthModal from "../sections/auth/AuthModal";
import marca from "../../assets/img/peruJoyas/Logotipo horizontal en formato PNG - A color para fondo claro.png"; 


const Header = () => {
  const { cart } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      {/* Barra Superior */}
      <div className="top-cab">
        <div className="container">
          <div className="top-info">
            <FaPhoneAlt className="icon" /> <span>914 027 437</span>
            <FaMapMarkerAlt className="icon" /> <span>Ver tiendas físicas</span>
            <FaCalendarAlt className="icon" /> <span>Solicitar cita virtual</span>
          </div>
        </div>
      </div>

      {/* Barra Principal */}
      <div className="main-header">
        <div className="container">
           {/* Botón Menú Móvil */}
           {/* <div className="menu-toggle" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div> */}

          {/* Logo */}
          <div className="logo">
            <Link to="/">
              <img src={marca} alt="Perú Joyas" />
            </Link>
          </div>

         
          {/* Menú de Navegación */}
          <nav className={menuOpen ? "nav-menu open" : "nav-menu"}>
            <ul>
              <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
              <li><Link to="/about" onClick={toggleMenu}>Nosotros</Link></li>
              <li><Link to="/shop-left" onClick={toggleMenu}>Catálogo</Link></li>
              <li><Link to="/contact" onClick={toggleMenu}>Contáctanos</Link></li>

              <li className="icons">
                <FaHeart className="icon" />
                <span>Favoritos</span>
                <FaUser className="icon" onClick={() => setShowAuthModal(true)} />
                <span>Iniciar Sesión</span>
              </li>

              <li>
                <Link to="/cart" onClick={toggleMenu}>
                  <div className="cart-icon">
                    <FaShoppingBag className="icon" />
                    <span className="cart-badge">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
                  </div>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Modal de Autenticación */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </header>
  );
};

export default Header;
