import React, { createContext, useState, useEffect } from "react";
import {jwtDecode} from 'jwt-decode';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("❌ Error al parsear el usuario desde localStorage:", error);
        localStorage.removeItem("user");
        setUser(null);
      }
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  const login = (token) => {
    const {name, role} = jwtDecode(token);
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("user", name);
    setUser({user: name, role : role });
  };
  
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading ? children : <p>Cargando...</p>}
    </AuthContext.Provider>
  );
};
