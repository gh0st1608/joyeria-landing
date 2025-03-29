import React from "react";

const ShopInfo = ({ products }) => {
  return (
    <div>
      <h4>Detalles del producto:</h4>
      <p><strong>Categoría:</strong> {products.category || "No especificada"}</p>
      <p><strong>Stock:</strong> {products.stock ?? "No disponible"}</p>
      {/* Puedes agregar más info según lo que tenga el producto */}
    </div>
  );
};

export default ShopInfo;
