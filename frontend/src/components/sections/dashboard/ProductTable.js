import React, { useState } from "react";
import "../../../assets/css/dashboard.css";

const ProductTable = ({ products, onAddOrUpdate, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleNew = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const productData = Object.fromEntries(data.entries());
    productData.price = parseFloat(productData.price);
    productData.stock = parseInt(productData.stock);
    onAddOrUpdate(productData);
    setShowModal(false);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div>
      <div className="filters-container">
        <button className="btn-new-product" onClick={handleNew}>NUEVO</button>
      </div>
      
      <div className="table-container">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Número</th>
              <th>Nombre</th>
              <th>Color</th>
              <th>Material</th>
              <th>Descripción</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length > 0 ? currentProducts.map((p, index) => (
              <tr key={p._id}>
                <td>{indexOfFirstProduct + index + 1}</td>
                <td>{p.title}</td>
                <td>{p.color}</td>
                <td>{p.material}</td>
                <td>{p.description}</td>
                <td>{p.stock}</td>
                <td>${p.price.toFixed(2)}</td>
                <td>{p.category}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(p)}>Editar</button>
                  <button className="btn-delete" onClick={() => onDelete(p._id)}>Eliminar</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="9" className="no-data">No hay productos disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={() => setCurrentPage(currentPage - 1)}>Anterior</button>
        )}
        {currentPage < totalPages && (
          <button onClick={() => setCurrentPage(currentPage + 1)}>Siguiente</button>
        )}
      </div>

      {showModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <h3>{editingProduct ? "Editar Producto" : "Nuevo Producto"}</h3>
            <form onSubmit={handleSubmit}>
              <input name="name" placeholder="Nombre" defaultValue={editingProduct?.name} required />
              <input name="color" placeholder="Color" defaultValue={editingProduct?.color} required />
              <input name="material" placeholder="Material" defaultValue={editingProduct?.material} required />
              <input name="description" placeholder="Descripción" defaultValue={editingProduct?.description} required />
              <input type="number" name="stock" placeholder="Stock" defaultValue={editingProduct?.stock} required />
              <input type="number" name="price" placeholder="Precio" step="0.01" defaultValue={editingProduct?.price} required />
              <input name="category" placeholder="Categoría" defaultValue={editingProduct?.category} required />
              
              <button type="submit" className="btn-edit">Guardar</button>
              <button type="button" className="btn-delete" onClick={() => setShowModal(false)}>Cerrar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
