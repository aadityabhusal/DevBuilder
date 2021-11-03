import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

export function Protected({ component: Component, ...props }) {
  const { user } = useContext(UserContext);

  return (
    <Route
      {...props}
      render={(props) =>
        !user ? (
          <Redirect to="/" />
        ) : user.status === 0 ? (
          <Redirect to="/verify-email" />
        ) : (
          <Component user={user} {...props} />
        )
      }
    />
  );
}
