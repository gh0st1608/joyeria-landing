import React from "react";
import "../../../assets/css/dashboard.css";

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p) => (
              <tr key={p._id}>
                <td>{p._id}</td>
                <td>{p.title}</td>
                <td>${p.price.toFixed(2)}</td>
                <td>
                  <button className="btn-edit" onClick={() => onEdit(p)}>Editar</button>
                  <button className="btn-delete" onClick={() => onDelete(p._id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-data">No hay productos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
