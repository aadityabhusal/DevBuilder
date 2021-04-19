import React from "react";
import { Redirect, Route } from "react-router-dom";

export function ProtectedRoute({ user, ...props }) {
  if (!user) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
}
