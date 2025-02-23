import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';



class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    // Back to top
    componentDidMount() {
        window.addEventListener('scroll', () => {
            this.setState({
                isTop: window.scrollY > 300
            });
        }, false);
    }
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    render() {
        const Map = ReactMapboxGl({
            accessToken:
                'pk.eyJ1IjoiYWJlZHNoIiwiYSI6ImNrNnRyZ3d4aDAyMzkzZXBoc3RsYnM0aGwifQ.yhr3W_OOI6xXElmSY8cyPg'
        });
        return (
            <footer className="sigma-footer">
                <div className="sigma-footer-top">
                    <div className="container-fluid">
                        <div className="row no-gutters">
                            <div className="col-lg-8">
                                <div className="row">
                                    <div className="col-lg-6">
                                        {/*====== Subir======*/}
                                        <div className="sigma-backto-top">
                                            <Link to="#" className="back-to-top" id="backToTop" onClick={() => this.scrollToTop()}>
                                                <i className="fal fa-chevron-up" /> Subir
                                            </Link>
                                        </div>
                                    </div>
     
                                </div>
                                {/*====== Footer content ======*/}
                              
                            </div>
                            <div className="col-lg-4">
                                <Map
                                    // eslint-disable-next-line react/style-prop-object
                                    style="mapbox://styles/mapbox/light-v10"
                                    className="contact-maps"
                                >
                                    <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                                        <Feature coordinates={[-77.04, 38.907]} zoom={11.5} />
                                    </Layer>
                                </Map>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sigma-footer-bottom">
                    <div className="container-fluid">
                        <div className="sigma-footer-bottom-inner">
                            <div className="row no-gutters align-items-end">
                                <div className="col-lg-6">
                                    <div className="sigma-footer-contact">

                                        {/* Datos y redes sociales */}
                                        <ul>
                                            <li>
                                                <i className="flaticon-phone" />
                                                <Link to="tel:"><span>Phone Number</span> +987 876 765 76 577</Link>
                                            </li>
                                            <li>
                                                <i className="flaticon-message" />
                                                <Link to="mailto:"><span>Email Adssdsddress</span> info@webmail.com</Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    <i className="fab fa-facebook-f" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    <i className="fab fa-instagram" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    <i className="fab fa-twitter" />
                                                </Link>
                                            </li>
                                        </ul>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {/* Copyright */}
                <div className="sigma-copyright">
                    <div className="container-fluid">
                        <div className="sigma-copyright-inner">
                            <div className="row">
                                <div className="col-lg-6 col-md-5 order-2 order-md-1">
                                    <p className="sigma-copyright-text">Copyright By@<Link to="#">Example</Link> - 2022</p>
                                </div>
                                <div className="col-lg-6 col-md-7 order-1 order-md-2">
                                    <div className="sigma-copyright-menu">
                                        <ul>
                                            <li>
                                                <Link to="#">Terms of use</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Privacy Environmental Policy</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer >

        );
    }
}

export default Footer;