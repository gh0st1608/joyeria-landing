import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Header";
import Breadcrumb from "../layouts/Breadcrumbs";
import Instafeeds from "../layouts/Instafeeds";
import Content from "../sections/login/Content";
import Footer from "../layouts/Footer";

const Login = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Peru Joyas | Login</title>
        <meta name="description" content="Login to your account" />
      </MetaTags>
      <Header />
      <Breadcrumb breadcrumb={{ pagename: "Login" }} />
      <Content />
      <Instafeeds />
      <Footer />
    </Fragment>
  );
};

export default Login;
