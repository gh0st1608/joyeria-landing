import React, { useState } from "react";
import axios from "axios";
import ENDPOINTS from "../../servicios/contactUs/contactService";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({ success: false, error: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ success: false, error: false });

    try {
      const response = await axios.post(ENDPOINTS.contact, formData);
      if (response.status === 200) {
        setStatus({ success: true });
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("❌ Error sending message:", error);
      setStatus({ error: true });
    }
  };

  return (
    <section className="contact-section">
      <div className="container">
        <h2>Contact Us</h2>
        <p>Have questions? Feel free to reach out to us.</p>

        {status.success && <p className="success-msg">✅ Message sent successfully!</p>}
        {status.error && <p className="error-msg">❌ Failed to send message. Please try again.</p>}

        <form onSubmit={handleSubmit} className="contact-form">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Message:</label>
          <textarea name="message" value={formData.message} onChange={handleChange} required />

          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
