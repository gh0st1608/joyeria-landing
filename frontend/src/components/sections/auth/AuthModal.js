import React, { useState } from "react";
import { useHistory } from "react-router-dom"; // ✅ Usar useHistory en React Router v5
import { loginUser, registerUser } from "../../servicios/auth/authService";

const AuthModal = ({ onClose }) => {
  const history = useHistory(); // ✅ Hook para redireccionar al Dashboard
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
        // ✅ Login
        const response = await loginUser({ email: formData.email, password: formData.password });
        if (response && response.accessToken) {
          localStorage.setItem("accessToken", response.accessToken);
          alert("✅ Login exitoso! Redirigiendo...");
          onClose(); 
          history.push("/dashboard"); // ✅ Redirigir al Dashboard con useHistory()
        } else {
          setError("❌ Credenciales incorrectas. Inténtelo de nuevo.");
        }
      } else {
        // ✅ Registro
        const response = await registerUser(formData);
        if (response?.accessToken) {
          localStorage.setItem("accessToken", response.accessToken);
          alert("✅ Registro exitoso! Ahora puedes iniciar sesión.");
          setIsLogin(true);
        } else {
          setError("❌ Error en el registro. Inténtelo de nuevo.");
        }
      }
    } catch (err) {
      setError("❌ Error en la solicitud.");
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
                placeholder="Nombre Completo" 
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
              placeholder="Correo Electrónico" 
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
          {isLogin ? "¿Aún no tienes cuenta?" : "¿Ya tienes una cuenta?"}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Registrarse" : "Iniciar Sesión"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
