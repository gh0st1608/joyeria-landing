import React, { useState } from "react";
import "../../../assets/css/dashboard.css";

// ✅ Configura con tus datos de Cloudinary
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/tu_cloud_name/upload";
const UPLOAD_PRESET = "tu_upload_preset";

const ProductTable = ({ products, onAddOrUpdate, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    color: "",
    material: "",
    description: "",
    stock: "",
    price: "",
    category: "",
    image: "",
  });
  const [editingProductId, setEditingProductId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const handleEdit = (product) => {
    setFormData({
      title: product.title,
      color: product.color,
      material: product.material,
      description: product.description,
      stock: product.stock,
      price: product.price,
      category: product.category,
      image: product.image,
    });
    setEditingProductId(product._id);
    setShowModal(true);
  };

  const handleNew = () => {
    setFormData({
      title: "",
      color: "",
      material: "",
      description: "",
      stock: "",
      price: "",
      category: "",
      image: "",
    });
    setEditingProductId(null);
    setShowModal(true);
  };

  // ✅ Manejo de carga de imagen hacia Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("upload_preset", UPLOAD_PRESET);

    setUploading(true);
    try {
      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formDataUpload,
      });
      const data = await response.json();
      if (data.secure_url) {
        setFormData((prev) => ({ ...prev, image: data.secure_url }));
      } else {
        console.error("❌ Error: No se recibió URL de Cloudinary:", data);
      }
    } catch (error) {
      console.error("Error subiendo la imagen a Cloudinary:", error);
    }
    setUploading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      title: formData.title,
      color: formData.color,
      material: formData.material,
      description: formData.description,
      stock: parseInt(formData.stock),
      price: parseFloat(formData.price),
      category: formData.category,
      image: formData.image, // URL de la imagen cargada
    };

    if (editingProductId) updatedData._id = editingProductId;

    // ✅ Aquí se llama a onAddOrUpdate para que Products.js maneje la creación
    onAddOrUpdate(updatedData);
    closeModal();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      title: "",
      color: "",
      material: "",
      description: "",
      stock: "",
      price: "",
      category: "",
      image: "",
    });
    setEditingProductId(null);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div>
      <div className="filters-container">
        <button className="btn-new-product" onClick={handleNew}>
          NUEVO
        </button>
      </div>

      <div className="table-container">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>N°</th>
              <th>Imagen</th>
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
            {currentProducts.length > 0 ? (
              currentProducts.map((p, index) => (
                <tr key={p._id}>
                  <td>{indexOfFirstProduct + index + 1}</td>
                  <td>
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.title}
                        style={{ width: "60px", height: "60px", objectFit: "cover" }}
                      />
                    ) : (
                      <span style={{ color: "#999", fontStyle: "italic" }}>Sin imagen</span>
                    )}
                  </td>
                  <td>{p.title}</td>
                  <td>{p.color}</td>
                  <td>{p.material}</td>
                  <td>{p.description}</td>
                  <td>{p.stock}</td>
                  <td>${p.price.toFixed(2)}</td>
                  <td>{p.category}</td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEdit(p)}>
                      Editar
                    </button>
                    <button className="btn-delete" onClick={() => onDelete(p._id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="no-data">
                  No hay productos disponibles
                </td>
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
            <h3>{editingProductId ? "Editar Producto" : "Nuevo Producto"}</h3>
            <form onSubmit={handleSubmit}>
              <input name="title" placeholder="Nombre" value={formData.title} onChange={handleChange} required />
              <input name="color" placeholder="Color" value={formData.color} onChange={handleChange} required />
              <input name="material" placeholder="Material" value={formData.material} onChange={handleChange} required />
              <input name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} required />
              <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required />
              <input type="number" name="price" placeholder="Precio" step="0.01" value={formData.price} onChange={handleChange} required />
              <input name="category" placeholder="Categoría" value={formData.category} onChange={handleChange} required />

              <label>Cargar imagen:</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              {uploading && <p>Subiendo imagen...</p>}
              {formData.image && (
                <img src={formData.image} alt="Preview" style={{ width: "100%", marginTop: "10px" }} />
              )}

              <div className="custom-modal-buttons">
                <button type="submit" className="btn-edit" disabled={uploading}>
                  {uploading ? "Subiendo imagen..." : "Guardar"}
                </button>
                <button type="button" className="btn-delete" onClick={closeModal}>
                  Cerrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
