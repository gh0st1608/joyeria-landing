import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';

import Content from '../sections/home/Content';

class Home extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Perú | Joyas</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Content/>
    
            </Fragment>
        );
    }
}

export default Home;