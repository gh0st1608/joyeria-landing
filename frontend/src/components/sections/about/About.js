import React, { Component } from 'react';

import 'magnific-popup';

import missionImage from '../../../assets/img/text-block/01.jpg';


class About extends Component {
    render() {
        return (
            <section className="about-section pt-115 pb-115">
                <div className="container">
                    <div className="section-title about-title text-center">
                        <h2>Sobre Nosotros</h2>
                    </div>
                    <div className="about-text-box">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="about-img">
                                    <img src={missionImage} alt="Misión" />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="about-text">
                                    <h3>Misión</h3>
                                    <p className="mb-4"></p>
                                    <p>Nos comprometemos a perfeccionar la artesanía de la joyería con una obsesión por la calidad, fusionando tradición y tecnología para crear piezas únicas y personalizadas. Buscamos emocionar y <strong>ser parte de los momentos más significativos en la vida de nuestros clientes</strong>, estableciendo estándares globales de excelencia en diseño y fabricación, con un enfoque constante en la innovación y la satisfacción del cliente.</p>
                                </div>
                                <div className="about-text">
                                    <h3>Vision</h3>
                                    <p className="mb-4"></p>
                                    <p><strong>Ser líder global en joyería</strong>, destacando por nuestra inquebrantable dedicación a la calidad y artesanía excepcional. Creamos joyas personalizadas que celebran momentos especiales, fusionando la tradición con tecnología innovadora para cautivar a una audiencia moderna.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<div className="about-text-box">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="about-img">
                                    <img src={visionImage} alt="Visión" />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="about-text">
                                    <h3>Visión</h3>
                                    <p className="mb-4"></p>
                                    <p><strong>Ser líder global en joyería</strong>, destacando por nuestra inquebrantable dedicación a la calidad y artesanía excepcional. Creamos joyas personalizadas que celebran momentos especiales, fusionando la tradición con tecnología innovadora para cautivar a una audiencia moderna.</p>
                                </div>
                            </div>
                        </div>
                    </div>*/}
                </div>
            </section>
        );
    }
}

export default About;
