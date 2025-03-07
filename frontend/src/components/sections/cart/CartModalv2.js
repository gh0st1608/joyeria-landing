import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { createCart, createPayment } from "../../servicios/payment/paymentService";
import { Link, useHistory } from "react-router-dom";
import { io } from "socket.io-client"; // 📌 Importamos WebSockets
import { BASE_URL } from "../../servicios/endpoints";

const CartContent = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const history = useHistory();
  const [orderId, setOrderId] = useState(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  useEffect(() => {
    if (!orderId) return;
    const socket = io(BASE_URL.wsPayment, { transports: ["websocket"] }); // 📌 URL del backend WebSockets
    if (orderId) {
      console.log("✅ Suscribiéndose al canal:", `payment-status-${orderId}`);
      socket.on(`payment-status-${orderId}`, (data) => {
        console.log('entro al socket',`payment-status-${orderId}`,data)
        if (data.status === "COMPLETED") {
          console.log('entro al completed del socket')
          setPaymentCompleted(true);
          alert("✅ ¡Pago confirmado!");
          clearCart(); // Limpia el carrito cuando el pago se confirme
          history.push("/shop-left"); // Redirigir a una página de éxito
        }
      });
    }

    return () => socket.disconnect();
  }, [orderId, clearCart, history]);

  const handlePayment = async () => {
    try {
      console.log("Iniciando pago...");
      const paymentData = {
        items: cart,
        totalAmount: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0),
      };
      const cartCreated = await createCart(paymentData);
      const paymentCreated = await createPayment({ idCartBuy: cartCreated._id });

      if (paymentCreated && paymentCreated.status === "CREATED") {
        setOrderId(paymentCreated.id); // Guardamos el ID de la orden para WebSockets
        window.open(paymentCreated.links[1].href, "_blank");
      } else {
        alert("Hubo un problema con el pago. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert("Hubo un problema con el pago. Intenta nuevamente.");
    }
  };

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
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <img
              src={item.image}
              alt={item.name}
              className="cart-item-image"
              onError={(e) => (e.target.src = "https://via.placeholder.com/100")}
            />
            <div className="cart-item-info">
              <span>{item.name} - ${Number(item.price || 0).toFixed(2)} x {item.quantity}</span>
            </div>
            <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>❌ Eliminar</button>
          </li>
        ))}
      </ul>
      <div className="cart-actions">
        <button className="btn btn-secondary" onClick={clearCart}>🗑 Vaciar Carrito</button>
        <button className="btn btn-success" onClick={handlePayment} disabled={paymentCompleted}>
          {paymentCompleted ? "✅ Pago confirmado" : "💳 Ir a Pagar"}
        </button>
      </div>
    </div>
  );
};

export default CartContent;
