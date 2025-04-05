import React, { useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccessModal = ({ isOpen, onClose, clearCart }) => {
  const history = useHistory();

  // Memoizamos handleClose para que no cambie en cada render
  const handleClose = useCallback(() => {
    clearCart();
    onClose();
    history.push("/shop-left"); // Redirige al catálogo
  }, [clearCart, onClose, history]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        handleClose(); // Llamada a handleClose
      }, 5000); // Cierra automáticamente en 5 segundos
      return () => clearTimeout(timer);
    }
  }, [isOpen, handleClose]); // Usamos handleClose que está memorizado

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
