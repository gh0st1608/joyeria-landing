import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom"; // Importa Navigate para redirección en v6
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p className="loading-text">🔄 Cargando...</p>; // Evita redirección prematura

  return (
    <Route
      {...rest}
      element={user ? <Component /> : <Navigate to="/login" />} // Usa Navigate en lugar de Redirect
    />
  );
};

export default PrivateRoute;
