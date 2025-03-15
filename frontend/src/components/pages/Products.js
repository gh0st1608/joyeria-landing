import React, { useEffect, useState } from "react";
import Sidebar from "../layouts/Sidebar";
import { getProducts, deleteProduct, createProduct, updateProduct } from "../servicios/shop/productService";
import ProductTable from "../sections/dashboard/ProductTable";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ id: "", title: "", price: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter(product => product.id !== id));
  };

  const handleEdit = (product) => {
    setFormData(product);
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateProduct(formData);
      setProducts(products.map(p => (p.id === formData.id ? formData : p)));
    } else {
      const newProduct = await createProduct(formData);
      setProducts([...products, newProduct]);
    }
    setFormData({ id: "", title: "", price: "" });
    setIsEditing(false);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h2>Gestión de Productos</h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Precio"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
          <button type="submit">{isEditing ? "Actualizar" : "Agregar"}</button>
        </form>

        <ProductTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Products;
