import React, { useState } from "react";
import { loginUser, registerUser } from "../../servicios/auth/authService";

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true); // ✅ Alternar entre Login y Registro
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
        if (response) {
          localStorage.setItem("accessToken", response.accessToken);
          alert("✅ Login successful! Redirecting...");
          onClose();
        } else {
          setError("❌ Invalid credentials. Please try again.");
        }
      } else {
        // ✅ Registro
        const response = await registerUser(formData);
        if (response?.accessToken && response?.refreshToken) {
          localStorage.setItem("accessToken", response.accessToken);
          localStorage.setItem("refreshToken", response.refreshToken);
          alert("✅ Registration successful! You can now log in.");
          setIsLogin(true); // ✅ Cambiar a Login después del registro
        } else {
          setError("❌ Registration failed. Try again.");
        }
      }
    } catch (err) {
      setError("❌ Error processing request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{isLogin ? "Login" : "Register"}</h2>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleSubmit} className="modal-form">
          {!isLogin && (
            <div className="form-group">
              <input 
                type="text" 
                name="name" 
                placeholder="Full Name" 
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
              placeholder="Email Address" 
              value={formData.email} 
              onChange={handleChange} 
              required
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              value={formData.password} 
              onChange={handleChange} 
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? "Processing..." : isLogin ? "Login" : "Registrarse"}
          </button>
        </form>

        <p className="toggle-auth">
          {isLogin ? "Si aun no eta reistrado? " : "Already have an account?"}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Registrarse" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
