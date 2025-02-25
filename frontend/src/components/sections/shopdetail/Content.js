import React from "react";

const Content = ({ product }) => {
  if (!product) {
    return <p style={{ color: "red" }}>⚠️ Product not found</p>;
  }

  return (
    <section className="shop-detail-section">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img
              src={product.image || "https://via.placeholder.com/300"}
              alt={product.title}
              style={{ width: "100%", height: "auto", borderRadius: "10px" }}
            />
          </div>
          <div className="col-md-6">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <h3>${product.price}</h3>
            <button className="btn btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
