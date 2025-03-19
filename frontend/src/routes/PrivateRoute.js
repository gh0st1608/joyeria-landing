import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p className="loading-text">🔄 Cargando...</p>; // ✅ Evita redirección prematura

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
