import React from "react";

const Shopinfo = ({ product }) => {
  if (!product) {
    return <p style={{ color: "red", textAlign: "center" }}>❌ No product details available</p>;
  }

  return (
    <section className="shop-detail">
      <div className="container">
        <h2>{product.title}</h2>
        <img src={product.image} alt={product.title} style={{ maxWidth: "300px" }} />
        <p>{product.description}</p>
        <h3>${product.price}</h3>
      </div>
    </section>
  );
};

export default Shopinfo;
