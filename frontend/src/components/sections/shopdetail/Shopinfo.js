import React from "react";

const ShopInfo = ({ product }) => {
  return (
    <div>
      <h4>Detalles del producto:</h4>
      <p><strong>Categoría:</strong> {product.category || "No especificada"}</p>
      <p><strong>Stock:</strong> {product.stock ?? "No disponible"}</p>
      {/* Puedes agregar más info según lo que tenga el producto */}
    </div>
  );
};

export default ShopInfo;
