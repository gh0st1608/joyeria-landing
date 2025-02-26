import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { loginUser } from "../../servicios/authService"; // ✅ Importa el servicio de autenticación

const LoginContent = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Manejo de cambios en los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // ✅ Actualiza el estado correctamente
    });
  };

  // ✅ Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginUser(formData);
      if (response?.token) {
        localStorage.setItem("token", response.token); // ✅ Guarda el token en localStorage
        history.push("/account"); // ✅ Redirige a la cuenta del usuario
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Error logging in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-section">
      <div className="container">
        <div className="login-box">
          <h2>Login to Your Account</h2>
          {error && <p className="error-msg">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange} // ✅ Maneja cambios en el input
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange} // ✅ Maneja cambios en el input
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p>
            Don't have an account? <a href="/register">Sign up</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginContent;
