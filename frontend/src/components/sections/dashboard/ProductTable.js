import React, { useState } from "react";
import "../../../assets/css/dashboard.css";


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
    image: null,  // Cambiado a null para poder manejar archivos
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
      image: product.image,  // Mantener la imagen si la edita
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
      image: null,  // Inicializar la imagen como null
    });
    setEditingProductId(null);
    setShowModal(true);
  };

  // ✅ Manejo de carga de imagen hacia el backend (con Multer y S3)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    console.log("Imagen seleccionada:", file);
    setFormData((prev) => ({ ...prev, image: file }));  // Guardar el archivo en el state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Primero, verifica si la imagen fue seleccionada
    if (!formData.image) {
      console.error("❌ Error: No se ha seleccionado una imagen.");
      return;
    }

    // Crear FormData y agregar todos los datos
    const formDataUpload = new FormData();
    formDataUpload.append("title", formData.title);
    formDataUpload.append("color", formData.color);
    formDataUpload.append("material", formData.material);
    formDataUpload.append("description", formData.description);
    formDataUpload.append("stock", formData.stock);
    formDataUpload.append("price", formData.price);
    formDataUpload.append("category", formData.category);

    // Añadir la imagen
    formDataUpload.append("file", formData.image);

  // Verificar el contenido de formDataUpload
    setUploading(true);

    try {
      // Enviar todo al backend, con los datos del producto y la imagen
/*       console.log('formDataUpload',formDataUpload)
      const response = await createProduct(formDataUpload);
      const { _id, ...data } = response; */
      if (formData) {
        console.log("Producto creado con éxito", formData);
        onAddOrUpdate(formData); // Llamar a la función que maneja el producto creado
        closeModal(); // Cerrar el modal después de guardar el producto
      }
    } catch (error) {
      console.error("Error subiendo el producto al backend:", error);
    }

    setUploading(false);
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
      image: null,
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
                  <td>{Array.isArray(p.color) ? p.color.join(", ") : p.color}</td>
                  <td>{p.material}</td>
                  <td>{p.description}</td>
                  <td>{p.stock}</td>
                  <td>${p.price.toFixed(2)}</td>
                  <td>{p.category}</td>
                  <td>
                    <button className="icon-btn edit-icon" onClick={() => handleEdit(p)} title="Editar">
                      <i className="fas fa-pen"></i>
                    </button>
                    <button className="icon-btn delete-icon" onClick={() => onDelete(p._id)} title="Eliminar">
                      <i className="fas fa-trash-alt"></i>
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
              <div className="form-grid">
                <input name="title" placeholder="Nombre" value={formData.title} onChange={handleChange} required />
                <input name="color" placeholder="Color" value={formData.color} onChange={handleChange} required />
                <input name="material" placeholder="Material" value={formData.material} onChange={handleChange} required />
                <input name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} required />
                <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required />
                <input type="number" name="price" placeholder="Precio" step="0.01" value={formData.price} onChange={handleChange} required />
                <input name="category" placeholder="Categoría" value={formData.category} onChange={handleChange} required />
              </div>

              <label>Cargar imagen:</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              {uploading && <p>Subiendo imagen...</p>}

              {formData.image && (
                <div className="image-preview-container">
                  <img src={URL.createObjectURL(formData.image)} alt="Preview" className="image-preview" />
                </div>
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