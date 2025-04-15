import React from 'react';
import { Link } from 'react-router-dom';
// import './HeroBanner.css';
import imgHero from '../../../assets/img/banner/02.jpg';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const HeroBanner = () => {
  return (
    <section className="hero-banner">
      <div className="container">
        
        {/* Texto a la izquierda */}
        <div className="hero-text">
          <p className="subtitle">Diseño de joyas con amor</p>
          <h1 className="title">
          Gama alta <br /> Artículos de joyería
          </h1>

          <div className="buttons">
            <Link to="/shop-left" className="btn outline">Compra ahora</Link>
            <Link to="/about" className="btn outline">Sobre Nosotros</Link>
          </div>

          <div className="social-links">
            <a href="https://www.facebook.com/profile.php?id=100063131836042"><FaFacebookF /></a>
            <a href="https://www.facebook.com/profile.php?id=100063131836042"><FaInstagram /></a>
            <a href="https://www.facebook.com/profile.php?id=100063131836042"><FaWhatsapp /></a>
          </div>
        </div>


        {/* Imagen a la derecha */}
        <div className="hero-image">
          <img src={imgHero} alt="Jewelry Model" />
          <span className="phone-number">Contáctanos: +51 983 217 772</span>
        </div>
        
      </div>
    </section>
  );
};

export default HeroBanner;
