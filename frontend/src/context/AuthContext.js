import React, { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; // ✅ Para redirigir al usuario

// Crear el contexto de autenticación
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const history = useHistory(); // ✅ Hook para redirigir

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token"); // ✅ Eliminar token
    setIsAuthenticated(false);
    history.push("/login"); // ✅ Redirigir a la página de login
  };

  if (loading) {
    return <div style={{ color: "white", textAlign: "center", marginTop: "20%" }}>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
