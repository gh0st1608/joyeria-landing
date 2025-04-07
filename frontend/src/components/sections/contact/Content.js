// src/components/ContactForm.js
import React, { useState } from 'react';
import { sendContactMessage } from '../../servicios/contactUs/contactService';
import '@fortawesome/fontawesome-free/css/all.min.css'; // ✅ Importación de FontAwesome
import ContactModal from './ContactSucessModal'; // Importamos el Modal

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({
    success: false,
    error: false,
    loading: false,
  });

  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
  const [modalMessage, setModalMessage] = useState(''); // Mensaje que se muestra en el modal

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ success: false, error: false, loading: true });

    try {
      const success = await sendContactMessage(formData);

      if (success) {
        setStatus({ success: true, loading: false });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setModalMessage('¡Éxito! Mensaje enviado.');
        setShowModal(true);

        setTimeout(() => {
          setShowModal(false);
        }, 5000);
      } else {
        setStatus({ success: false, error: true, loading: false });
        setModalMessage('Oops! Hubo un error, inténtelo más tarde.');
        setShowModal(true);

        setTimeout(() => {
          setShowModal(false);
        }, 3000);
      }
    } catch (error) {
      console.error('❌ Error al enviar mensaje:', error);
      setStatus({ success: false, error: true, loading: false });
      setModalMessage('Oops! Hubo un error, inténtelo más tarde.');
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
      }, 3000);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Permite cerrar el modal manualmente
  };

  return (
    <section className="contact-part pt-115 pb-115">
      <div className="container">
        {/* Información de contacto */}
        <div className="contact-info row justify-content-center">
          <div className="col-md-4 col-sm-6">
            <div className="info-box">
              <div className="icon"><i className="fa-solid fa-location-dot"></i></div>
              <br />
              <div className="desc">
                <h4>Office Address</h4>
                <p>Avenida los pinos Mz L</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="info-box">
              <div className="icon"><i className="fa-solid fa-phone"></i></div>
              <br />
              <div className="desc">
                <h4>Phone Number</h4>
                <p>+ 97656 8675 7864 7</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="info-box">
              <div className="icon"><i className="fa-solid fa-envelope"></i></div>
              <br />
              <div className="desc">
                <h4>Email Address</h4>
                <p>info@webmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de contacto */}
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="input-group mb-30">
                  <span className="icon"><i className="fa-solid fa-user"></i></span>
                  <input
                    type="text"
                    placeholder="Agregar nombres"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-group mb-30">
                  <span className="icon"><i className="fa-solid fa-envelope"></i></span>
                  <input
                    type="email"
                    placeholder="Agregar email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-group mb-30">
                  <span className="icon"><i className="fa-solid fa-phone"></i></span>
                  <input
                    type="text"
                    placeholder="Agregar celular"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-group mb-30">
                  <span className="icon"><i className="fa-solid fa-book"></i></span>
                  <input
                    type="text"
                    placeholder="Agregar asunto"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="input-group textarea mb-30">
                  <span className="icon"><i className="fa-solid fa-pen"></i></span>
                  <textarea
                    placeholder="Mensaje"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-12 text-center">
                <button type="submit" className="main-btn btn-filled" disabled={status.loading}>
                  {status.loading ? "Sending..." : "Enviar"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Usamos el modal para mostrar los resultados */}
      <ContactModal
        show={showModal}
        handleClose={handleCloseModal}
        message={modalMessage}
        success={status.success}
      />
    </section>
  );
};

export default ContactForm;