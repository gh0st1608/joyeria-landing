import React, { useEffect, useState } from "react";
import Sidebar from "../../components/layouts/Sidebar";
import { getProducts } from "../servicios/shop/productService";
import ProductTable from "../sections/dashboard/ProductTable";

const Products = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h2> Gestión de Productos</h2>
        <ProductTable products={products} />
      </div>
    </div>
  );
};

export default Products;
