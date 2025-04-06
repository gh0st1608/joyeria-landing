import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Cambiado de useHistory a useNavigate (para react-router-dom v6+)

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate(); // useNavigate reemplaza a useHistory en v6+
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("❌ Error al parsear `user` desde localStorage:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken"); // También eliminamos el token por consistencia
        setUser(null);
      }
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  const login = (userData, token) => {
    if (!userData || !token) {
      console.error("❌ Error: Datos de usuario o token inválidos.");
      return;
    }

    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    
    // Redirigir solo si no está ya en el dashboard
    if (window.location.pathname !== "/dashboard") {
      navigate("/dashboard");
    }
  };
  
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);

    // Redirigir solo si no está ya en el login
    if (window.location.pathname !== "/login") {
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading ? children : <p>Cargando...</p>}
    </AuthContext.Provider>
  );
};