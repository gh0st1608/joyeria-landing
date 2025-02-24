import React, { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContext";

const Shopinfo = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <div className="row justify-content-center">
      <div className="col-lg-6">
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.title}
          style={{
            width: "100%",
            borderRadius: "10px",
          }}
        />
      </div>
      <div className="col-lg-6">
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <span className="price">${product.price}</span>

        <div className="quantity-cart d-flex">
          <div className="quantity-box">
            <button type="button" className="minus-btn" onClick={handleDecrement}>
              <i className="fal fa-minus" />
            </button>
            <input type="text" className="input-qty" value={quantity} readOnly />
            <button type="button" className="plus-btn" onClick={handleIncrement}>
              <i className="fal fa-plus" />
            </button>
          </div>
          <button
            onClick={() => {
              addToCart({ ...product, quantity });
              alert("Product added to cart!");
            }}
            className="main-btn btn-border"
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shopinfo;
