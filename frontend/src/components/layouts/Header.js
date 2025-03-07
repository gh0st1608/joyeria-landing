import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import AuthModal from "../sections/auth/AuthModal";
import { FaPhoneAlt, FaMapMarkerAlt, FaCalendarAlt, FaHeart, FaUser, FaShoppingBag, FaSearch } from "react-icons/fa";
import marca from "../../assets/img/peruJoyas/Logotipo horizontal en formato PNG - A color para fondo claro.png"; // ✅ Importamos la imagen correctamente
// import "./Header.css"; // ✅ Importar los estilos

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
      <div className="top-bar">
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
          {/* Logo */}
          <div className="logo">
            <Link to="/">
              <img src={marca} alt="Logo" className="logo-img" />
              {/* <span>Peru Joyas</span> */}
            </Link>
          </div>

          {/* Menú de Navegación */}
          <nav className={menuOpen ? "nav-menu open" : "nav-menu"}>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">Nosotros</Link></li>
              <li><Link to="/shop-left">Catálogo</Link></li>
              <li><Link to="/contact">Contáctanos</Link></li>

              <li>
              <div className="icons">
                <FaHeart className="icon" /> <span>Favoritos</span>
                <FaUser className="icon" onClick={() => setShowAuthModal(true)} /> <span>Iniciar Sesion</span>
              </div>
              </li>
              <li><Link to="/cart">
                <div className="cart-icon">
                  <FaShoppingBag className="icon" />
                  <span className="cart-badge">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
                </div>
              </Link>
              </li>
            </ul>
          </nav>
          {/* Barra de Búsqueda */}
          {/* <div className="search-bar"> */}
          {/* <input type="text" placeholder="Buscar en tienda..." /> */}
          {/* <button><FaSearch /></button> */}
          {/* </div> */}
        </div>
      </div>

      {/* Modal de Autenticación */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </header>
  );
};

export default Header;
