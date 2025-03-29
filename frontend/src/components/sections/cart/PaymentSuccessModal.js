import React, { useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccessModal = ({ isOpen, onClose, clearCart }) => {
  const history = useHistory();

<<<<<<< HEAD
  const handleClose = useCallback(() => {
    clearCart();
    onClose();
    history.push("/shop-left");
  }, [clearCart, onClose, history]);
=======
  // Usamos useCallback para evitar que handleClose se redefina en cada renderizado
  const handleClose = useCallback(() => {
    clearCart();
    onClose();
    history.push("/shop-left"); // Redirige al catálogo
  }, [clearCart, onClose, history]);  // Asegúrate de incluir estas dependencias
>>>>>>> 6bd13572511ebc67fe8074794f47193a762e4923

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
<<<<<<< HEAD
  }, [isOpen, handleClose]);
=======
  }, [isOpen, handleClose]); // Usamos handleClose como dependencia
>>>>>>> 6bd13572511ebc67fe8074794f47193a762e4923

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
