import React from "react";
import { Link } from "react-router-dom";
import { FaPhone, FaEnvelope, FaChevronRight } from "react-icons/fa";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <footer className="footer">
      
      <div className="footer-container">
        <div className="footer-section">
          <h4>Contáctanos</h4>
          <p> <FaPhone /> +51 983 217 772</p>
          <p> <FaEnvelope /> peru.joyas@hotmail.com</p>
        </div>

        <div className="footer-section">
          <h4>Redes Sociales</h4>
          <div className="social-icons">
            <Link to="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></Link>
            <Link to="#" aria-label="Instagram"><i className="fab fa-instagram"></i></Link>
            <Link to="#" aria-label="Twitter"><i className="fab fa-twitter"></i></Link>
          </div>
        </div>

        {/* Línea divisoria mejorada */}
        {/* <hr className="footer-divider" /> */}

        <div className="footer-section">
          <h4>Legal</h4>
          <div className="footer-legal-links">
            <Link to="#">
              <FaChevronRight className="link-icon" />
              Términos de Uso
            </Link>
            <span className="divider">|</span>
            <Link to="#">
              <FaChevronRight className="link-icon" />
              Política de Privacidad
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} <strong>Peru Joyas</strong> - Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;