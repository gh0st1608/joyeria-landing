import React, { useState } from "react";
import { sendContactMessage } from "../../servicios/contactUs/contactService";
import ReCAPTCHA from "react-google-recaptcha";
import { Alert } from "react-bootstrap";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    success: false,
    error: false,
    loading: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ success: false, error: false, loading: true });

    try {
      console.log("📡 Enviando mensaje...", formData);
      const response = await sendContactMessage(formData);
      console.log('response',response)

      if (response?.success) {
        setStatus({ success: true, loading: false });
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setStatus({ success: false, error: true, loading: false });
      }
    } catch (error) {
      console.error("❌ Error al enviar mensaje:", error);
      setStatus({ success: false, error: true, loading: false });
    }
  };

  return (
    <section className="contact-part pt-115 pb-115">
      <div className="container">

        <div className="contact-info row justify-content-center">
          <div className="col-md-4 col-sm-6">
            <div className="info-box">
              <div className="icon"><i className="flaticon-home" /></div>
              <br />
              <div className="desc">
                <h4>Office Address</h4>
                <p>Avenida los pinos Mz L</p>

              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="info-box">
              <div className="icon"><i className="flaticon-phone" /></div>
              <br />
              <div className="desc">
                <h4>Phone Number</h4>
                <p>+ 97656 8675 7864 7 </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="info-box">
              <div className="icon"><i className="flaticon-message" /></div>
              <br />
              <div className="desc">
                <h4>Email Address</h4>
                <p>info@webmail.com </p>
              </div>
            </div>
          </div>
        </div> 



        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="input-group mb-30">
                  <span className="icon"><i className="far fa-user" /></span>
                  <input type="text" placeholder="Agregar nombres" name="name" value={formData.name} onChange={handleChange} required />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-group mb-30">
                  <span className="icon"><i className="far fa-envelope" /></span>
                  <input type="email" placeholder="Agregar email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-group mb-30">
                  <span className="icon"><i className="far fa-phone" /></span>
                  <input type="text" placeholder="Agregar celular" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-group mb-30">
                  <span className="icon"><i className="far fa-book" /></span>
                  <input type="text" placeholder="Agregar asunto" name="subject" value={formData.subject} onChange={handleChange} required />
                </div>
              </div>
              <div className="col-12">
                <div className="input-group textarea mb-30">
                  <span className="icon"><i className="far fa-pen" /></span>
                  <textarea placeholder="Mensaje" name="message" value={formData.message} onChange={handleChange} required />
                </div>
              </div>
              <div className="col-12 text-center">
                <ReCAPTCHA sitekey="6LdxUhMaAAAAAIrQt-_6Gz7F_58S4FlPWaxOh5ib" size="invisible" />
                <button type="submit" className="main-btn btn-filled" disabled={status.loading}>
                  {status.loading ? "Sending..." : "Enviar"}
                </button>
                {status.success && (
                  <Alert variant="danger" className="mt-3">
                    Oops! Hubo un error, intentelo mas tarde.
                  </Alert>
                )}
                {status.error && (
                  <Alert variant="success" className="mt-3">
                    Exito! Mensaje enviado.
                  </Alert>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
