import React from "react";
import { Link } from "react-router-dom";
import { FaPhone, FaEnvelope } from "react-icons/fa";
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
            <Link to="#"><i className="fab fa-facebook-f"></i></Link>
            <Link to="#"><i className="fab fa-instagram"></i></Link>
            <Link to="#"><i className="fab fa-twitter"></i></Link>
          </div>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <Link to="#">Términos de Uso</Link> |
          <Link to="#"> Política de Privacidad</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 <strong>Peru Joyas</strong> - Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
