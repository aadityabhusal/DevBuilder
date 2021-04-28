import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

export function ProtectedRoute({ component: Component, ...props }) {
  const { isAuthenticated } = useContext(UserContext);

  return (
    <Route
      {...props}
      render={(props) =>
        isAuthenticated() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}
