import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Header";
import Breadcrumb from "../sections/home/Breadcrumbs";




const Login = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Peru Joyas | Login</title>
        <meta name="description" content="Login to your account" />
      </MetaTags>
      <Header />
      <Breadcrumb breadcrumb={{ pagename: "Login" }} />
      {/* <Content /> */}

    </Fragment>
  );
};

export default Login;
