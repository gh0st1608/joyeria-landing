import React from "react";

const ShopInfo = ({ product }) => {
  return (
    <div>
      <h3>Detalles del Producto</h3>
      <p>Color: {product.color}</p>
      <p>Disponibilidad: {product.stock > 0 ? "Disponible" : "Agotado"}</p>
    </div>
  );
};

export default ShopInfo;
