import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shopinfo from "./Shopinfo";
import { getProductById } from "../../servicios/api";

const Content = () => {
  const { id } = useParams(); // ✅ Obtener el ID del producto desde la URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        if (data) {
          setProduct(data);
        } else {
          console.warn("⚠️ Product not found");
        }
      } catch (error) {
        console.error("❌ Error loading product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <section className="Shop-section pt-120 pb-120">
      <div className="container">
        {loading ? (
          <p>Loading product details...</p>
        ) : product ? (
          <Shopinfo product={product} />
        ) : (
          <p style={{ color: "red", fontSize: "20px", fontWeight: "bold" }}>
            ⚠️ Product not found. Please check if the ID is correct or refresh the page.
          </p>
        )}
      </div>
    </section>
  );
};

export default Content;
