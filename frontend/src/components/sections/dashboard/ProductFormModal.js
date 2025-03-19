import React from "react";
import "../../../assets/css/dashboard.css";

const ProductFormModal = ({ formData, setFormData, onClose, onSubmit, isEditing }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{isEditing ? "Editar Producto" : "Agregar Producto"}</h2>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>
        <form onSubmit={onSubmit} className="modal-form">
          <div className="form-group">
            <label>Nombre del producto</label>
            <input
              type="text"
              placeholder="Ejemplo: Anillo de oro"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Precio (USD)</label>
            <input
              type="number"
              placeholder="Ejemplo: 49.99"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="btn-save">
              {isEditing ? "Guardar Cambios" : "Agregar Producto"}
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
