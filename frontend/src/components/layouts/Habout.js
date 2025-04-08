import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactWOW from 'react-wow';

// Importar imágenes
import aboutimg1 from '../../assets/img/JoyeriaPeru/02.jpg';
import aboutimg2 from '../../assets/img/JoyeriaPeru/ch.jpg';
import aboutbottomimg from '../../assets/img/bg/03.jpg';
// import './Habout.css';

class Habout extends Component {
    render() {
        return (
            <section className="about-section">
                <div className="about-container">
                    
                    {/* Columna izquierda - Características e imágenes */}
                    <ReactWOW animation='fadeInLeft' data-delay=".3s">
                        <div className="about-left">
                            <div className="feature-box">
                                <div className="icon">
                                    <i className="flaticon-ring" />
                                </div>
                                <h4>Nuevos anillos</h4>
                                <p>Los más finos y delicados anillos para nuestros valiosos clientes.</p>
                            </div>
                            <div 
                                className="feature-image"
                                style={{ backgroundImage: `url(${aboutimg1})` }}
                            ></div>
                            <div 
                                className="feature-image"
                                style={{ backgroundImage: `url(${aboutimg2})` }}
                            ></div>
                            <div className="feature-box">
                                <div className="icon">
                                    <i className="flaticon-necklace" />
                                </div>
                                <h4>Colección de bodas</h4>
                                <p>Nuestros collares de colección con diseños asombrosos.</p>
                            </div>
                        </div>
                    </ReactWOW>

                    {/* Columna derecha - Texto y botón */}
                    <ReactWOW animation='fadeInRight' data-delay=".3s">
                        <div className="about-right">
                            <span className="title-tag">Sobre Nosotros</span>
                            <h2>Fabricando Joyería Desde 1990.</h2>
                            <p>Nos avala una gran historia y reputación en el mundo de la joyería, con colecciones exclusivas que destacan por su calidad y diseño.</p>
                            <Link to="/contact" className="main-btn btn-filled">Saber Más</Link>
                        </div>
                    </ReactWOW>

                </div>

                {/* Imagen de fondo */}
                <div 
                    className="about-background"
                    style={{ backgroundImage: `url(${aboutbottomimg})` }}
                ></div>

            </section>
        );
    }
}

export default Habout;
