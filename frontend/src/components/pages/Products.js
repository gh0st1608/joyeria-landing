import React, { useEffect, useState } from "react";
import Dashboard from "../pages/Dashboard";
import { getProducts, deleteProduct, createProduct, updateProduct } from "../servicios/shop/productService";
import ProductTable from "../sections/dashboard/ProductTable";
import "../../assets/css/dashboard.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ title: "", color: "", material: "" });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data || []);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  const handleAddOrUpdate = async (productData) => {
    try {
      if (productData._id) {
        // Actualizar producto existente
        await updateProduct(productData._id, productData);
      } else {
        // Crear nuevo producto
        if (productData.imageFile) {
          const formDataData = new FormData();
          Object.keys(productData).forEach((key) => {
            formDataData.append(key, productData[key]);
          });
          await createProduct(formDataData);
        } else {
          await createProduct(productData);
        }
      }
      // Actualizar la lista después de agregar/editar
      await fetchProducts();
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target; // ✅ corregido aquí
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const filteredProducts = products.filter((p) => {
    const titleMatch = String(p.title || "").toLowerCase().includes(filters.title.toLowerCase());
    const colorMatch = String(p.color || "").toLowerCase().includes(filters.color.toLowerCase());
    const materialMatch = String(p.material || "").toLowerCase().includes(filters.material.toLowerCase());
    return titleMatch && colorMatch && materialMatch;
  });

  return (
    <Dashboard>
      <div className="dashboard-content">
        <h2>Gestión de Productos</h2>

        <div className="filter-container">
          <input
            type="text"
            name="title"
            placeholder="Filtrar por nombre"
            value={filters.title}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="color"
            placeholder="Filtrar por color"
            value={filters.color}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="material"
            placeholder="Filtrar por material"
            value={filters.material}
            onChange={handleFilterChange}
          />
          <button
            className="btn-clear-filters"
            onClick={() => setFilters({ title: "", color: "", material: "" })}
          >
            Limpiar Filtros
          </button>
        </div>

        <ProductTable
          products={filteredProducts}
          onAddOrUpdate={handleAddOrUpdate}
          onDelete={handleDelete}
        />
      </div>
    </Dashboard>
  );
};

export default Products;
