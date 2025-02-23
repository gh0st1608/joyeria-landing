import React, { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContext";

const Shopinfo = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [quantity] = useState(1);

  if (!product) {
    return (
      <h3 style={{ textAlign: "center", color: "red", fontSize: "24px" }}>
        ⚠️ Producto no encontrado
      </h3>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    alert("🛒 Producto agregado al carrito");
  };

  return (
    <section className="Shop-section pt-120 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="shop-detail-content text-center">
              <img
                src={product.imagen}
                alt={product.nombre}
                onError={(e) => (e.target.src = "https://via.placeholder.com/300")}
                style={{ width: "100%", maxWidth: "400px", objectFit: "cover", borderRadius: "10px" }}
              />
              <h3 style={{ marginTop: "15px" }}>{product.nombre}</h3>
              <p>{product.descripcion}</p>
              <span className="price" style={{ fontSize: "20px", fontWeight: "bold", color: "#ff9800" }}>
                ${product.precio.toFixed(2)}
              </span>

              <div className="mt-3">
                <button onClick={handleAddToCart} className="main-btn btn-border">
                  🛒 Agregar al Carrito
                </button>
              </div>

              <div className="other-info mt-3">
                <h6>Categoría:</h6>
                <p>{product.categoria ? product.categoria : "Sin categoría"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shopinfo;
