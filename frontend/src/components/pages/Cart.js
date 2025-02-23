import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Header";
import Breadcrumb from "../layouts/Breadcrumbs";
import Footer from "../layouts/Footer";
import CartContent from "../sections/cart/Content"; // ✅ Importación corregida

const Cart = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Mi Tienda | Carrito de Compras</title>
        <meta name="description" content="Revisa y gestiona los productos en tu carrito de compras." />
      </MetaTags>
      <Header />
      <Breadcrumb breadcrumb={{ pagename: "Carrito de Compras" }} />
      <CartContent /> {/* ✅ Sección del carrito */}
      <Footer />
    </Fragment>
  );
};

export default Cart;
