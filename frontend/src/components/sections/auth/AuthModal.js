import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom"; // ✅ Para redireccionar después del login
import { AuthContext } from "../../../context/AuthContext";
import { loginUser, registerUser } from "../../servicios/auth/authService";
import { jwtDecode } from "jwt-decode"; // ✅ Importa jwt-decode
import { toast, ToastContainer } from "react-toastify"; // Importamos Toastify
import 'react-toastify/dist/ReactToastify.css'; // Importamos los estilos de Toastify

const AuthModal = ({ onClose }) => {
  const { login } = useContext(AuthContext);
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
        // ✅ Login
        const response = await loginUser({ email: formData.email, password: formData.password });
        if (response && response.accessToken) {
          const decoded = jwtDecode(response.accessToken);
          const userData = {
            name: decoded.name,
            role: decoded.role,
            /* email: decoded.email */
          };
          history.push("/dashboard");
          login(userData, response.accessToken); // Guardamos en contexto
          toast.success("✅ Login exitoso!"); // Reemplazamos el alert por una notificación
          onClose();
        } else {
          setError("❌ Credenciales incorrectas o datos faltantes.");
          toast.error("❌ Credenciales incorrectas o datos faltantes."); // Notificación de error
        }
      } else {
        // ✅ Registro
        const response = await registerUser(formData);
        if (response?.accessToken) {
          toast.success("✅ Registro exitoso! Ahora puedes iniciar sesión."); // Notificación de éxito
          setIsLogin(true);
        } else {
          setError("❌ Error en el registro.");
          toast.error("❌ Error en el registro."); // Notificación de error
        }
      }
    } catch (err) {
      setError("❌ Error en la solicitud. Verifica tu conexión.");
      console.log('err',err)
      toast.error("❌ Error en la solicitud. Verifica tu conexión."); // Notificación de error
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
      <ToastContainer /> {/* Agregamos el contenedor de notificaciones */}
    </div>
  );
};

export default AuthModal;
