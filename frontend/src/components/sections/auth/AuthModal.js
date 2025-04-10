import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { loginUser, registerUser } from "../../servicios/auth/authService";
import { AuthContext } from "../../../context/AuthContext";

const AuthModal = ({ onClose }) => {  // Añade onClose como prop
  const history = useHistory();
  const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ 
    email: "", 
    password: "", 
    name: "" 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let response;
      if (isLogin) {
        response = await loginUser({ 
          email: formData.email, 
          password: formData.password 
        });
      } else {
        if (!formData.name || !formData.email || !formData.password) {
          throw new Error("Todos los campos son obligatorios");
        }
        response = await registerUser(formData);
      }

      if (response?.accessToken) {
        login(response.user, response.accessToken);
        history.push("/dashboard");
      } else {
        setError(response?.message || "❌ Credenciales inválidas o registro fallido.");
      }
    } catch (err) {
      setError(err.message || "❌ Error al procesar la solicitud.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <button className="close-button" onClick={onClose} aria-label="Cerrar modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="#1D252C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6L18 18" stroke="#1D252C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-header">
            <h2>{isLogin ? "Iniciar Sesión" : "Registrarse"}</h2>
          </div>

          {error && <div className="error-message">{error}</div>}

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Nombre completo</label>
              <div className="input-container">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <div className="input-container">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="input-container">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? (
              <span className="loading-spinner"></span>
            ) : isLogin ? (
              "INICIAR SESIÓN"
            ) : (
              "REGISTRARSE"
            )}
          </button>

          <div className="toggle-auth">
            {isLogin ? "¿No tienes cuenta? " : "¿Ya tienes una cuenta? "}
            <button type="button" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Regístrate" : "Inicia sesión"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;