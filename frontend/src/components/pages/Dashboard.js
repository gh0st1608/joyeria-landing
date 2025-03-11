import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';


class Login extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Laramiss | Login</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                {/* <Breadcrumb breadcrumb={{pagename:'Login'}}/> */}
                {/* <Content/> */}
                {/* <Instafeeds/> */}
                {/* <Footer/> */}
            </Fragment>
        );
    }
}

export default Login;