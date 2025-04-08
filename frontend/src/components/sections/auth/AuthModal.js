import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { loginUser, registerUser } from "../../servicios/auth/authService";

const AuthModal = ({ onClose }) => {
  const history = useHistory();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        const response = await loginUser({ email: formData.email, password: formData.password });
        if (response?.accessToken) {
          localStorage.setItem("accessToken", response.accessToken);
          onClose(); // Cierra el modal si estás usándolo como overlay
          history.push("/dashboard"); // ✅ Redirige al dashboard
        } else {
          setError("❌ Credenciales inválidas. Intenta nuevamente.");
        }
      } else {
        const response = await registerUser(formData);
        if (response?.accessToken && response?.refreshToken) {
          localStorage.setItem("accessToken", response.accessToken);
          localStorage.setItem("refreshToken", response.refreshToken);
          setIsLogin(true); // cambia a login
        } else {
          setError("❌ No se pudo completar el registro.");
        }
      }
    } catch (err) {
      setError("❌ Error al procesar la solicitud.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{isLogin ? "Iniciar Sesión" : "Registrarse"}</h2>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleSubmit} className="modal-form">
          {!isLogin && (
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Nombre completo"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? "Procesando..." : isLogin ? "Iniciar Sesión" : "Registrarse"}
          </button>
        </form>

        <p className="toggle-auth">
          {isLogin ? "¿Aún no tienes cuenta? " : "¿Ya tienes una cuenta? "}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Regístrate" : "Inicia Sesión"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
