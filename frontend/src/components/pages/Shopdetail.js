import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Header";
import Breadcrumb from "../layouts/Breadcrumbs";
import Instafeeds from "../layouts/Instafeeds";

import { getProductById } from "../servicios/products"; // ✅ Importa la API

const Shopdetail = () => {
  const { id } = useParams(); // ✅ Obtiene el ID de la URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      console.log(`📡 Fetching product details for ID: ${id}`);
      const data = await getProductById(id);
      if (data) {
        setProduct(data);
      }
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  return (
    <>
      <MetaTags>
        <title>Product Details</title>
        <meta name="description" content="Product details page" />
      </MetaTags>
      <Header />
      <Breadcrumb breadcrumb={{ pagename: "Product Details" }} />

      <div className="container">
        {loading ? (
          <p>Loading product details...</p>
        ) : product ? (
          <div className="product-details">
            <h2>{product.title}</h2>
            <img src={product.image} alt={product.title} />
            <p>{product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>
          </div>
        ) : (
          <p style={{ color: "red" }}>⚠️ Product not found</p>
        )}
      </div>

      <Instafeeds />
  
    </>
  );
};

export default Shopdetail;
