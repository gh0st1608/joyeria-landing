import React, { useEffect, useState } from "react";
import Dashboard from "../pages/Dashboard"; // Asegúrate de importar el contenedor principal
import { getProducts, deleteProduct, createProduct, updateProduct } from "../servicios/shop/productService";
import ProductTable from "../sections/dashboard/ProductTable";
import "../../assets/css/dashboard.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ id: "", title: "", price: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [filters, setFilters] = useState({ name: "", minPrice: "", maxPrice: "" });

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

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredProducts = products.filter((p) => {
    const nameMatch = p.title.toLowerCase().includes(filters.name.toLowerCase());
    const minPriceMatch = filters.minPrice === "" || p.price >= parseFloat(filters.minPrice);
    const maxPriceMatch = filters.maxPrice === "" || p.price <= parseFloat(filters.maxPrice);
    return nameMatch && minPriceMatch && maxPriceMatch;
  });

  return (
    <Dashboard>
      <div className="dashboard-content">
        <h2>Gestión de Productos</h2>

        <div className="filter-container">
          <input
            type="text"
            name="name"
            placeholder="Filtrar por nombre"
            value={filters.name}
            onChange={handleFilterChange}
          />
          <input
            type="number"
            name="minPrice"
            placeholder="Precio mínimo"
            value={filters.minPrice}
            onChange={handleFilterChange}
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Precio máximo"
            value={filters.maxPrice}
            onChange={handleFilterChange}
          />
          <button
            className="btn-clear-filters"
            onClick={() => setFilters({ name: "", minPrice: "", maxPrice: "" })}
          >
            Limpiar Filtros
          </button>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
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

        <ProductTable products={filteredProducts} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </Dashboard>
  );
};

export default Products;