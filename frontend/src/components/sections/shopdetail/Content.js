import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShopInfo from "./Shopinfo";  
import { getProductById } from "../../servicios/shop/productService";

const ShopDetail = () => {
  const { _id } = useParams(); // Capturar ID desde la URL
  console.log("🟢 ID recibido desde la URL:", _id); // 🔍 Debugging

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!_id) {
      console.error("❌ ID no recibido en ShopDetail");
      return;
    }

    const fetchProduct = async () => {
      try {
        console.log(`Fetching product data from: /shop/products/${_id}`);
        const data = await getProductById(_id);
        setProduct(data);
      } catch (error) {
        console.error("❌ Error al cargar el producto:", error);
      }
    };

    fetchProduct();
  }, [_id]);

  if (!product) return <p>Cargando producto...</p>;

  return (
    <div>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} width="300" />
      <p>{product.description}</p>
      <p>Precio: S/ {product.price.toFixed(2)}</p>

      <ShopInfo product={product} />
    </div>
  );
};

export default ShopDetail;
