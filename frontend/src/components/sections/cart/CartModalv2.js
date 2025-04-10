import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { createCart, createPayment, verifyPayment } from "../../servicios/payment/paymentService"; 
import { useHistory, useLocation } from "react-router-dom";
import { FaTrash, FaCreditCard, FaCheckCircle } from "react-icons/fa";
import PaymentSuccessModal from "./PaymentSuccessModal";
import { io } from "socket.io-client";
import { BASE_URL } from "../../servicios/endpoints";

const CartContent = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const [orderId, setOrderId] = useState(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  
  // Estado para controlar si ya se ha redirigido
  const [redirected, setRedirected] = useState(false);

  // Conectar al WebSocket solo si el orderId está disponible
  useEffect(() => {
    if (!orderId) return;

    console.log("🌐 Conectando a WebSocket en: ", BASE_URL.wsPayment);

    const socket = io(BASE_URL.wsPayment, { transports: ["websocket"] });

    socket.on("connect", () => {
      console.log("🟢 Conectado al WebSocket con ID:", socket.id);
    });

    socket.on(`payment-status-${orderId}`, (data) => {
      console.log("🟢 WebSocket:", `payment-status-${orderId}`, data);
      if (data.status === "COMPLETED" && !redirected) {
        setPaymentCompleted(true);
        setShowSuccessModal(true);
        clearCart();
        setRedirected(true);  // Aseguramos que solo se redirige una vez
        setTimeout(() => {
          setShowSuccessModal(false);  // Cierra el modal después de 5 segundos
          history.replace("/cart");   // Esto reemplaza la URL sin recargar la página ni cambiarla
        }, 5000); // Espera 5 segundos antes de redirigir
      }
    });

    return () => {
      console.log("❌ Desconectando socket...");
      socket.disconnect();
    };
  }, [orderId, clearCart, history, redirected]); // Dependemos de `redirected`

  // Captura los parámetros de la URL para verificar el pago
  useEffect(() => {
    // Eliminar parámetros si están presentes en la URL después de la recarga
    const queryParams = new URLSearchParams(location.search);
    const payerId = queryParams.get("PayerID");
    const token = queryParams.get("token");

    if (payerId && token) {
      // Llamada a la función que verifica el pago con los parámetros
      const verifyPaymentStatus = async () => {
        try {
          const response = await verifyPayment(payerId, token);
          if (response.success) {
            setPaymentStatus("success");
            setPaymentCompleted(true);
            setShowSuccessModal(true);
            clearCart(); // Limpiar el carrito si el pago es exitoso
            setRedirected(true); // Aseguramos que solo se redirige una vez
            setTimeout(() => {
              setShowSuccessModal(false); // Cerrar el modal después de 5 segundos
              history.replace("/cart");   // Reemplazamos la URL para eliminar los parámetros de la URL
            }, 5000); // Espera 5 segundos antes de redirigir
          } else {
            setPaymentStatus("failure");
            setShowSuccessModal(true);
          }
        } catch (error) {
          console.error("Error al verificar el pago:", error);
          setPaymentStatus("failure");
          setShowSuccessModal(true);
        }
      };

      verifyPaymentStatus();
    }

    // Al recargar la página, eliminar los parámetros PayerID y token de la URL
    if (payerId || token) {
      history.replace("/cart");  // Esto reemplaza la URL sin los parámetros
    }
  }, [location, clearCart, history, redirected]); // Dependemos de `redirected`

  const handlePayment = async () => {
    try {
      const paymentData = {
        items: cart,
        totalAmount: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      };
      const cartCreated = await createCart(paymentData);
      const paymentCreated = await createPayment({ idCartBuy: cartCreated._id });
      if (paymentCreated?.status === "CREATED") {
        setOrderId(paymentCreated.id);
        setTimeout(() => {
          window.location.href = paymentCreated.links[1].href; // Redirigir al usuario a la página de pago
        }, 500);
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
        <PaymentSuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} clearCart={clearCart} />
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
              <td>$ {Number(item.price || 0).toFixed(2)}</td>
              <td>
                <button className="btn-quantity" onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                <span className="quantity-value">{item.quantity}</span>
                <button className="btn-quantity" onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
              </td>
              <td>$ {(item.price * item.quantity).toFixed(2)}</td>
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
        🏷 Total: $ {cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
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
      <PaymentSuccessModal
        isOpen={showSuccessModal}
        status={paymentStatus}  // Mostrar el estado del pago
        onClose={() => setShowSuccessModal(false)}
        clearCart={clearCart}
      />
    </div>
  );
};

export default CartContent;
