import React, { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContext"; // ✅ Ruta corregida

const CheckoutContent = () => {
  const { cart } = useContext(CartContext);

  // Estado para los datos del usuario
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    numeroCard: "",
    direccion: "",
  });

  // Estado para el modal de pago
  const [showModal, setShowModal] = useState(false);

  // Calcular el total del pedido
  const total = cart.reduce((sum, item) => sum + (item.precio * item.quantity), 0);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Mostrar el modal cuando se presiona "Pagar"
  const handlePayClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  // Cerrar el modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Confirmar pago
  const confirmPayment = () => {
    alert(`¡Gracias por tu compra, ${formData.nombre}! Total: $${total.toFixed(2)}`);
    setShowModal(false);
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">
        <span role="img" aria-label="Shopping Cart">🛒</span> Checkout
      </h2>

      {/* Formulario del Cliente */}
      <form className="checkout-form" onSubmit={handlePayClick}>
        <label>Full Name:</label>
        <input type="text" name="nombre" placeholder="Your Name..." value={formData.nombre} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" placeholder="yourmail@email.com" value={formData.email} onChange={handleChange} required />

        <label>Card Number:</label>
        <input type="text" name="numeroCard" placeholder="1234 5678 9012 3456" value={formData.numeroCard} onChange={handleChange} required />

        <label>Address:</label>
        <input type="text" name="direccion" placeholder="Your Address..." value={formData.direccion} onChange={handleChange} required />

        {/* Resumen del Pedido */}
        <div className="order-summary">
          <h3>
            <span role="img" aria-label="Package">📦</span> Order Summary
          </h3>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <span className="item-name">{item.nombre}</span>
                <span className="item-price">${Number(item.precio || 0).toFixed(2)} x {item.quantity}</span>
              </li>
            ))}
          </ul>
          <h2 className="total-price">
            <span role="img" aria-label="Total Amount">💰</span> Total: ${total.toFixed(2)}
          </h2>
        </div>

        {/* Botón de Pago */}
        <button type="submit" className="btn btn-pay">
          <span role="img" aria-label="Credit Card">💳</span> Pay Now
        </button>
      </form>

      {/* ✅ MODAL DE PAGO */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>
              <span role="img" aria-label="Payment Confirmation">💳</span> Payment Confirmation
            </h3>
            <p>
              You are about to pay <strong>${total.toFixed(2)}</strong>. Do you want to continue?
            </p>
            <div className="modal-buttons">
              <button className="btn btn-success" onClick={confirmPayment}>
                <span role="img" aria-label="Check">✅</span> Confirm
              </button>
              <button className="btn btn-danger" onClick={closeModal}>
                <span role="img" aria-label="Cancel">❌</span> Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutContent;
