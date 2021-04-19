import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "./useAuth";

export function ProtectedRoute(props) {
  let auth = useAuth();

  if (auth && !auth.isAuthenticated()) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
}
