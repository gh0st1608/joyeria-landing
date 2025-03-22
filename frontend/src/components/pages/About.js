import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../sections/home/Breadcrumbs';

// import Footer from '../layouts/Footer';
import Content from '../sections/about/aboutContent';

class About extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Mi Tienda | Nosotros</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:'Nosotros'}} />
                <Content/>
            </Fragment>
        );
    }
}

export default About;