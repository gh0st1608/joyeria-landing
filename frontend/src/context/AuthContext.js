import React, { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; // Usa useHistory

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const history = useHistory(); // Usa useHistory
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
        localStorage.removeItem("user"); // Eliminar datos corruptos
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
    if (history.location.pathname !== "/dashboard") { 
      history.push("/dashboard"); // Usa history.push
    } 
  };
  
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);

    if (history.location.pathname !== "/login") {
      history.push("/login"); // Usa history.push
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading ? children : <p>Cargando...</p>}
    </AuthContext.Provider>
  );
};
;