import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../sections/home/Breadcrumbs';
import Footer from '../layouts/Footer';

class Register extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Laramiss | Register</title>
                    <meta name="description" content="Formulario de registro de usuarios." />
                </MetaTags>

                <Header />
                <Breadcrumb breadcrumb={{ pagename: 'Register' }} />

                {/* Aquí podrías insertar tu formulario de registro */}
                <section className="register-content" style={{ padding: '40px 0', textAlign: 'center' }}>
                    <h2 style={{ fontFamily: 'Vollkorn, serif', color: '#1D252C' }}>Registro</h2>
                    <p style={{ fontFamily: 'Libre Franklin, sans-serif' }}>
                        Aquí irá tu formulario de registro personalizado.
                    </p>
                </section>

                <Footer />
            </Fragment>
        );
    }
}

export default Register;
