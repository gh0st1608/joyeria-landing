import React, { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContext"; // ✅ Ruta corregida
// import "../../../css/style.css"; // Asegúrate de que los estilos se importan correctamente

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
    alert(`¡Gracias por tu compra, ${formData.nombre}! 🛒 Total: $${total.toFixed(2)}`);
    setShowModal(false);
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">🛒 Checkout</h2>

      {/* Formulario del Cliente */}
      <form className="checkout-form" onSubmit={handlePayClick}>
        <label>Nombre Completo:</label>
        <input type="text" name="nombre" placeholder="Tu nombre..." value={formData.nombre} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" placeholder="tucorreo@email.com" value={formData.email} onChange={handleChange} required />

        <label>Targeta:</label>
        <input type="numeroCard" name="numeroCard" placeholder="Number" value={formData.email} onChange={handleChange} required />

        <label>Dirección:</label>
        <input type="text" name="direccion" placeholder="Tu dirección..." value={formData.direccion} onChange={handleChange} required />

        {/* Resumen del Pedido */}
        <div className="order-summary">
          <h3>📦 Resumen del Pedido</h3>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <span className="item-name">{item.nombre}</span>
                <span className="item-price">${Number(item.precio || 0).toFixed(2)} x {item.quantity}</span>
              </li>
            ))}
          </ul>
          <h2 className="total-price">Total: ${total.toFixed(2)}</h2>
        </div>

        {/* Botón de Pago */}
        <button type="submit" className="btn btn-pay">💳 Pagar</button>
      </form>

      {/* ✅ MODAL DE PAGO */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>💳 Confirmación de Pago</h3>
            <p>Estás a punto de pagar <strong>${total.toFixed(2)}</strong>. ¿Deseas continuar?</p>
            <div className="modal-buttons">
              <button className="btn btn-success" onClick={confirmPayment}>✅ Confirmar</button>
              <button className="btn btn-danger" onClick={closeModal}>❌ Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutContent;
