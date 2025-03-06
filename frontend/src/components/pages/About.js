import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumbs';
import Instafeeds from '../layouts/Instafeeds';
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
                {/* <Instafeeds/> */}
                {/*<Footer/>*/}
            </Fragment>
        );
    }
}

export default About;