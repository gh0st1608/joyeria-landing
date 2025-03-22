import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Header";
import Breadcrumb from "../sections/home/Breadcrumbs";
import CheckoutContent from "../sections/checkout/Content"; // ✅ Importación corregida

const Checkout = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Mi Tienda | Checkout</title>
        <meta name="description" content="Completa tu compra proporcionando tus datos." />
      </MetaTags>
      <Header />
      <Breadcrumb breadcrumb={{ pagename: "Checkout" }} />
      <CheckoutContent /> {/* ✅ Aquí se renderiza el contenido del checkout */}
    </Fragment>
  );
};

export default Checkout;
