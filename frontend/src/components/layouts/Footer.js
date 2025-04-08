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
          <p><FaPhone /> +51 983 217 772</p>
          <p><FaEnvelope /> peru.joyas@hotmail.com</p>
        </div>

        <div className="footer-section">
          <h4>Redes Sociales</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://wa.me/51983217772" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <div className="footer-legal-links">
            <Link to="#"><FaChevronRight /> Términos de Uso</Link>
            <span className="divider">|</span>
            <Link to="#"><FaChevronRight /> Política de Privacidad</Link>
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