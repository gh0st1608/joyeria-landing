import React, { useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccessModal = ({ isOpen, onClose, clearCart }) => {
  const history = useHistory();

  // Usamos useCallback para evitar que handleClose se redefina en cada renderizado
  const handleClose = useCallback(() => {
    clearCart();
    onClose();
    history.push("/shop-left"); // Redirige al catálogo
  }, [clearCart, onClose, history]);  // Asegúrate de incluir estas dependencias

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        handleClose();
      }, 5000); // Cierra automáticamente en 5 segundos
      return () => clearTimeout(timer);
    }
  }, [isOpen, handleClose]); // Usamos handleClose como dependencia

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <FaCheckCircle className="modal-icon" />
        <h2>¡Pago Exitoso!</h2>
        <p>Tu pago ha sido confirmado correctamente.</p>
        <button className="btn btn-primary" onClick={handleClose}>OK</button>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;
