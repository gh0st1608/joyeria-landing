import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumbs';
import Instafeeds from '../layouts/Instafeeds';
import Footer from '../layouts/Footer';
import Content from '../sections/about/Content';



class Aboutv2 extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Laramiss | Aboutv2 Us</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:'About Us'}} />
                <Content/>
                <Instafeeds/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Aboutv2;