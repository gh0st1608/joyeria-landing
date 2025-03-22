import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import ReactWOW from 'react-wow';
import img2 from '../../../assets/img/banner/02.jpg';


const bannerposts = [{ img: img2 }];

class Banner extends Component {
    render() {
        const settings = {
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 4000,
            arrows: false,
            dots: false,
        };

        return (
            <section className="banner-area">
                <div className="banner-content-container">
                    {/* Contenido a la izquierda */}
                    <div className="banner-content">
                        <ReactWOW animation='fadeInDown' data-delay=".3s">
                            <span className="promo-tag">Diseño de joyas con amor</span>
                        </ReactWOW>
                        <ReactWOW animation='fadeInLeft' data-delay=".5s">
                            <h1 className="title">Artículos de <br /> joyería de alta gama</h1>
                        </ReactWOW>
                        <ul>
                            <li>
                                <ReactWOW animation='fadeInUp' data-delay=".7s">
                                    <Link className="main-btn" to="/about">Nosotros</Link>
                                </ReactWOW>
                            </li>
                        </ul>
                    </div>

                    {/* Imagen dinámica a la derecha */}
                    <ReactWOW animation='fadeInRight' data-delay="0.5s">
                        <div className="banner-thumb">
                            <Slider className="carousel hero-slider-one" {...settings}>
                                {bannerposts.map((item, i) => (
                                    <div key={i} className="single-thumb">
                                        <img src={item.img} alt="images" />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </ReactWOW>
                </div>
            </section>
        );
    }
}

export default Banner;
