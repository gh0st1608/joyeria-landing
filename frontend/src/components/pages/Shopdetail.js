import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Header";
import Breadcrumb from "../layouts/Breadcrumbs";
import Instafeeds from "../layouts/Instafeeds";
import Content from "../sections/shopdetail/Content";
import Footer from "../layouts/Footer";

class Shopdetail extends Component {
  render() {
    return (
      <Fragment>
        <MetaTags>
          <title>My Store | Product Details</title>
          <meta name="description" content="Product details page" />
        </MetaTags>
        <Header />
        <Breadcrumb breadcrumb={{ pagename: "Product Details" }} />
        <Content />
        <Instafeeds />
        <Footer />
      </Fragment>
    );
  }
}

export default Shopdetail;
