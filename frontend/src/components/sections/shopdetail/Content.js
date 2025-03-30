import React, { useEffect, useState } from "react";
import ShopInfo from "./Shopinfo"; // Asegúrate que el nombre del archivo sea Shopinfo.js
import { getProductById } from "../../servicios/shop/productService";
import { useParams } from "react-router-dom";

const ShopDetail = () => {
  const { _id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!_id) {
      const errorMsg = "❌ _id no recibido en ShopDetail";
      console.error(errorMsg);
      setError(errorMsg);
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        console.log("🟡 _id recibido:", _id);
        const data = await getProductById(_id);
        console.log("✅ Producto obtenido:", data);
        setProduct(data);
      } catch (error) {
        const errorMsg = `❌ Error al obtener el producto: ${error.message}`;
        console.error(errorMsg);
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [_id]);

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!product) return (
    <p style={{ color: "red" }}>
      <span role="img" aria-label="advertencia">⚠️</span> Producto no encontrado
    </p>
  );

  return (
    <div className="product-detail">
      <h2>{product.title}</h2>
      <img 
        src={product.image} 
        alt={product.title} 
        width="300" 
        style={{ maxWidth: "100%" }}
      />
      <p>{product.description}</p>
      <p>
        <strong>Precio:</strong> S/ {product.price?.toFixed(2) ?? "0.00"}
      </p>
      <ShopInfo product={product} />
    </div>
  );
};

export default ShopDetail;
