import React from "react";

const ProductTable = ({ products }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 ? (
          products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3">No hay productos disponibles</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ProductTable;
