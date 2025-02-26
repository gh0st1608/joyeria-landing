import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="row">
            {/* Contact Information */}
            <div className="col-md-6">
              <h4>Contactanos</h4>
              <ul className="contact-info">
                <li>
                  <i className="fas fa-phone-alt"></i> +987 876 765 76 577
                </li>
                <li>
                  <i className="fas fa-envelope"></i> info@webmail.com
                </li>
              </ul>
            </div>

            {/* Social Media & Legal Links */}
            <div className="col-md-6 text-md-right">
              <h4>Redes Sociales</h4>
              <div className="social-icons">
                <Link to="#">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link to="#">
                  <i className="fab fa-instagram"></i>
                </Link>
                <Link to="#">
                  <i className="fab fa-twitter"></i>
                </Link>
              </div>
              <div className="legal-links">
                <Link to="#">Terms of Use</Link> |{" "}
                <Link to="#">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="footer-bottom text-center">
          <p>© 2025 <strong>Peru Joyas</strong> - All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
