// src/components/Modal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import '../../../assets/css/contact-modal.css'; // Asegúrate de importar tus estilos

const ContactModal = ({ show, handleClose, message, success }) => {
  return (
    <Modal show={show} onHide={handleClose} centered className="custom-modal">
      <div className="modal-overlay">
        <div className="modal-content">
          <FaCheckCircle className={`modal-icon ${success ? 'success' : 'error'}`} />
          <h2 className="modal-title">
            {success ? '¡Mensaje Enviado!' : 'Error'}
          </h2>
          <p>{message}</p>
          <Button variant="primary" onClick={handleClose} className="modal-btn">
            OK
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ContactModal;
