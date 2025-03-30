import React, { useEffect, useState } from "react";
import ShopInfo from "./Shopinfo"; // Asegúrate que el nombre del archivo sea Shopinfo.js
import { getProductById } from "../../servicios/shop/productService";
import '../../../assets/css/product-detail.css'; // Importa el archivo de estilos CSS
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
    <div className="product-detail-container">
      <div className="product-detail">
        <div className="product-image-container">
          <img 
            src={product.image} 
            alt={product.title} 
            className="product-image" 
          />
        </div>
        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-price">
            <strong>Precio:</strong> S/ {product.price?.toFixed(2) ?? "0.00"}
          </p>
          <p className="product-description">{product.description}</p>

          <div className="product-specs">
            <h3>Especificaciones del producto</h3>
            <ul>
              <li><strong>Categoría:</strong> {product.category || "No especificada"}</li>
              <li><strong>Stock:</strong> {product.stock ?? "No disponible"}</li>
              <li><strong>Modelo:</strong> {product.model || "No especificado"}</li>
              {/* Agrega más especificaciones según el producto */}
            </ul>
          </div>

          <button className="add-to-cart-btn">Agregar al carrito</button>
        </div>
      </div>
      <ShopInfo product={product} />
    </div>
  );
};

export default ShopDetail;
