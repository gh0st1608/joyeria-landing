import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { loginUser, registerUser } from "../../servicios/auth/authService";
import { AuthContext } from "../../../context/AuthContext";

const AuthModal = () => {
  const history = useHistory();
  const { login } = useContext(AuthContext); // usa el login global
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
      const response = isLogin
        ? await loginUser({ email: formData.email, password: formData.password })
        : await registerUser(formData);

      if (response?.accessToken) {
        login(response.accessToken); // actualiza el contexto global
        history.push("/dashboard"); // redirige
      } else {
        setError("❌ Credenciales inválidas o registro fallido.");
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
        </div>

        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleSubmit} className="modal-form">
          {!isLogin && (
            <div className="form-group">
              <input type="text" name="name" placeholder="Nombre completo" onChange={handleChange} required />
            </div>
          )}
          <div className="form-group">
            <input type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Procesando..." : isLogin ? "Iniciar Sesión" : "Registrarse"}
          </button>
        </form>

        <p className="toggle-auth">
          {isLogin ? "¿No tienes cuenta? " : "¿Ya tienes una cuenta? "}
          <button type="button" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Regístrate" : "Inicia sesión"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
