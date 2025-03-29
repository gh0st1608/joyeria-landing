import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccessModal = ({ isOpen, onClose, clearCart }) => {
  const history = useHistory();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        handleClose();
      }, 5000); // Cierra automáticamente en 5 segundos
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    clearCart();
    onClose();
    history.push("/shop-left"); // Redirige al catálogo
  };

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