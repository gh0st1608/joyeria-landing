import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../sections/home/Breadcrumbs';
import Footer from '../layouts/Footer';
import Content from '../sections/shopright/Content';

class Shopright extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Laramiss | Shop Right</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header />
                <Breadcrumb breadcrumb={{ pagename: 'Shop Right' }} />
                <Content />
                <Footer />
            </Fragment>
        );
    }
}

export default Shopright;