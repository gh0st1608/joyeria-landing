import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { createCart, createPayment } from "../../servicios/payment/paymentService";
import { useHistory } from "react-router-dom";
import { io } from "socket.io-client";
import { BASE_URL } from "../../servicios/endpoints";
import { FaTrash, FaCreditCard, FaCheckCircle } from "react-icons/fa";
import PaymentSuccessModal from "./PaymentSuccessModal"; 



const CartContent = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);
  const history = useHistory();
  const [orderId, setOrderId] = useState(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    //if (!orderId) return;
  
    console.log("✅ Suscribiéndose al canal:", `payment-status-${orderId}`);
    console.log("🌐 Conectando a WebSocket en:", 'http://localhost:4002/order');
  
    const socket = io(BASE_URL.wsPayment, { transports: ["websocket"] });
  
    socket.on("connect", () => {
      console.log("🟢 Conectado al WebSocket con ID:", socket.id);
    });
  
    socket.on(`payment-status-${orderId}`, (data) => {
      console.log('🟢 WebSocket:', `payment-status-${orderId}`, data);
      if (data.status === "COMPLETED") {
        setPaymentCompleted(true);
        setShowSuccessModal(true);
        clearCart();
        setTimeout(() => {
          setShowSuccessModal(false);
          history.push("/shop-left");
        }, 3000); // Cierra el modal automáticamente en 3s
      }
    });
  
    return () => {
      console.log("❌ Desconectando socket...");
      socket.disconnect();
    };
  }, [orderId, clearCart, history]);
  

  const handlePayment = async () => {
    try {
      console.log("💳 Iniciando pago...");
      const paymentData = {
        items: cart,
        totalAmount: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      };
      const cartCreated = await createCart(paymentData);
      const paymentCreated = await createPayment({ idCartBuy: cartCreated._id });
      if (paymentCreated?.status === "CREATED") {
        setOrderId(paymentCreated.id);
        setTimeout(() => {
          window.open(paymentCreated.links[1].href, "_blank");
        }, 500); // Un pequeño retraso para que el estado se propague correctamente
        console.log('🆗 Pago iniciado con orderId:', paymentCreated.id);
      } else {
        alert("❌ Hubo un problema con el pago. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("❌ Error al procesar el pago:", error);
      alert("Hubo un problema con el pago. Intenta nuevamente.");
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="cart-container">
        <h2>Carrito de Compras</h2>
        <p>Tu carrito está vacío.</p>
        <PaymentSuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Carrito de Compras</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item._id}>
              <td className="cart-item">
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-item-image"
                  onError={(e) => (e.target.src = "")}
                />
                <span>{item.title}</span>
              </td>
              <td>S/ {Number(item.price || 0).toFixed(2)}</td>
              <td>
                <button className="btn-quantity" onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                <span className="quantity-value">{item.quantity}</span>
                <button className="btn-quantity" onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
              </td>
              <td>S/ {(item.price * item.quantity).toFixed(2)}</td>
              <td>

                <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item._id)}>
                  <FaTrash style={{ marginRight: "5px" }} /> Eliminar
                </button>


              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="cart-total">
        🏷 Total: S/ {cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
      </h3>
      <div className="cart-actions">
        <button className="btn btn-secondary" onClick={clearCart}>
          <FaTrash style={{ marginRight: "5px" }} /> Vaciar Carrito
        </button>

        <button className="btn btn-success" onClick={handlePayment} disabled={paymentCompleted}>
          {paymentCompleted ? (
            <>
              <FaCheckCircle style={{ marginRight: "5px" }} /> Pago confirmado
            </>
          ) : (
            <>
              <FaCreditCard style={{ marginRight: "5px" }} /> Ir a Pagar
            </>
          )}
        </button>

      </div>
    </div>
  );
};

export default CartContent;
