import React, { Component } from "react";
import { withRouter } from "react-router-dom"; // ✅ Importamos para acceder a los parámetros
import MetaTags from "react-meta-tags";
import Header from "../layouts/Header";
import Breadcrumb from "../layouts/Breadcrumbs";
import Instafeeds from "../layouts/Instafeeds";
import Content from "../sections/shopdetail/Content";
import Footer from "../layouts/Footer";

class Shopdetail extends Component {
  render() {
    const { match } = this.props; // ✅ Captura el ID desde la URL
    const productId = match.params.id;

    return (
      <div>
        <MetaTags>
          <title>Peru Joyas | Detalles de producto</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header />
        <Breadcrumb breadcrumb={{ pagename: "Shop Detail" }} />
        <Content productId={productId} /> {/* ✅ Enviamos el ID a Content.js */}
        <Instafeeds />
        <Footer />
      </div>
    );
  }
}

export default withRouter(Shopdetail);
