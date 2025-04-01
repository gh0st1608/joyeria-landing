import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../servicios/shop/productService";
import "../../../assets/css/product-detail.css";
import {
  BsTruck,
  BsBagCheckFill,
  BsCreditCard2FrontFill,
  BsBoxSeam,
} from "react-icons/bs";

// Valida si un string es color válido en CSS
const isValidColor = (color) => {
  const s = new Option().style;
  s.color = "";
  s.color = color;
  return s.color !== "";
};

const ShopDetail = () => {
  const { _id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(_id);
        setProduct(data);

        // Imagen principal
        if (Array.isArray(data.images) && data.images.length > 0) {
          setMainImage(data.images[0]);
        } else {
          setMainImage(data.image || "https://via.placeholder.com/400x400?text=Sin+imagen");
        }

        // Color por defecto
        if (Array.isArray(data.color)) {
          setSelectedColor(data.color[0]);
        } else if (typeof data.color === "string") {
          setSelectedColor(data.color);
        }

      } catch (error) {
        console.error("❌ Error al cargar producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [_id]);

  if (loading) return <p>Cargando producto...</p>;
  if (!product) return <p style={{ color: "red" }}>❌ Producto no encontrado</p>;

  return (
    <div className="product-detail-container">
      <div className="product-detail">
        {/* Galería de imágenes */}
        <div className="product-image-container">
          <div className="main-image-wrapper">
            <img
              src={mainImage}
              alt={product.title}
              className="product-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/400x400?text=Sin+imagen";
              }}
            />
          </div>

          <div className="thumbnail-gallery-bottom">
            {(
              Array.isArray(product.images) && product.images.length > 0
                ? product.images
                : Array(4).fill(product.image)
            ).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Miniatura ${idx + 1}`}
                className={`thumbnail ${mainImage === img ? "active" : ""}`}
                onClick={() => setMainImage(img)}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/60x60?text=No+img";
                }}
              />
            ))}
          </div>
        </div>

        {/* Info del producto */}
        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>

          {/* Precio y descuento */}
          <div className="price-section">
            <span className="product-price">
              S/ {typeof product.price === "number" ? product.price.toFixed(2) : "0.00"}
            </span>
            {product.oldPrice && (
              <>
                <span className="old-price">S/ {product.oldPrice.toFixed(2)}</span>
                <span className="discount-badge">
                  -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                </span>
              </>
            )}
          </div>

          {/* Selector de color */}
          <div className="color-options">
            <p><strong>Color:</strong></p>
            <div className="color-buttons">
              {Array.isArray(product.color)
                ? product.color.map((color, idx) => {
                    const valid = isValidColor(color);
                    return (
                      <button
                        key={idx}
                        className={`color-circle ${selectedColor === color ? "selected" : ""}`}
                        style={{ backgroundColor: valid ? color : "#ccc" }}
                        onClick={() => valid && setSelectedColor(color)}
                        title={color}
                      />
                    );
                  })
                : (
                  <button
                    className="color-circle selected"
                    style={{
                      backgroundColor: isValidColor(product.color) ? product.color : "#ccc",
                    }}
                    title={product.color}
                  />
                )}
            </div>
          </div>

          {/* Cantidad */}
          <div className="quantity-selector">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)}>+</button>
          </div>

          {/* Botón principal */}
          <button className="action-button">Elige tus opciones</button>

          {/* Info de entrega */}
          <div className="delivery-options">
            <p className="flex items-center gap-2">
              <span role="img" aria-label="Caja"></span><BsBoxSeam size={18} /> Llega mañana
              <span role="img" aria-label="Compra confirmada"></span><BsBagCheckFill size={18} /> Retira mañana
            </p>
            <p className="envio-verde flex items-center gap-2">
              <span role="img" aria-label="Camión de envío"></span><BsTruck size={18} /> Envío en <strong>180 min</strong>
            </p>
          </div>

          {/* Promo */}
          <div className="promo-info flex items-center gap-2 mt-2">
            <span role="img" aria-label="Tarjeta de crédito"></span><BsCreditCard2FrontFill size={18} />
            <p>¡COMPRA CON TARJETA Y ACUMULA PUNTOS!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetail;
