import React, { useContext } from "react";
import { CartContext } from "../../../context/CartContext"; // ✅ Asegúrate de que la ruta es correcta
import { Link } from "react-router-dom";

const CartContent = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  if (!cart || cart.length === 0) {
    return (
      <div className="cart-container">
        <h2>🛒 Carrito de Compras</h2>
        <p>Tu carrito está vacío.</p>
        <Link to="/shop-left" className="btn btn-primary">Ver productos</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>🛒 Carrito de Compras</h2>
      <ul className="cart-list">
        {
cart.map((item) => {
  console.log("🔍 Revisando producto:", item); // ✅ Verifica qué valores tiene item.precio
  return (
    <li key={item.id} className="cart-item">
      <img
        src={item.image}
        alt={item.title}
        className="cart-item-image"
        onError={(e) => (e.target.src = "https://via.placeholder.com/100")}
      />
      <div className="cart-item-info">
        <span>{item.name} - ${Number(item.precio || 0).toFixed(2)} x {item.quantity}</span>
      </div>
      <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>❌ Eliminar</button>
    </li>
  );
})

        }
      </ul>
      <div className="cart-actions">
        <button className="btn btn-secondary" onClick={clearCart}>🗑 Vaciar Carrito</button>
        <Link to="/checkout" className="btn btn-success">💳 Ir a Pagar</Link>
      </div>
    </div>
  );
};

export default CartContent;
