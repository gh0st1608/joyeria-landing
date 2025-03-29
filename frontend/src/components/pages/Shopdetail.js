import React, { useEffect, useState } from "react";
import ShopInfo from "../sections/shopdetail/Shopinfo"; // Asegúrate de importar correctamente este componente

const Shopdetail = (props) => {
  const _id = props.match?.params?._id;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!_id) {
      console.error("❌ _id no recibido");
      return;
    }

    const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
    const encontrado = productosGuardados.find((p) => p._id === _id);

    if (encontrado) {
      console.log("✅ Producto encontrado:", encontrado);
      setProduct(encontrado);
    } else {
      console.error("❌ Producto no encontrado con _id:", _id);
    }
  }, [_id]);

  if (!product) {
    return (
      <p style={{ color: "red" }}>
        <span role="img" aria-label="advertencia">⚠️</span> Producto no encontrado
      </p>
    );
  }

  return (
    <div>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} width="300" />
      <p>{product.description}</p>
      <p><strong>Precio:</strong> S/ {product.price.toFixed(2)}</p>
      <ShopInfo product={product} />
    </div>
  );
};

export default Shopdetail;
