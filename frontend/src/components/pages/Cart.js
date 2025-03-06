import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Header";
import Breadcrumb from "../layouts/Breadcrumbs";
import CartContent from "../sections/cart/CartModalv2"; // ✅ Importación corregida

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
    
    </Fragment>
  );
};

export default Cart;
