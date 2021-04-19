import { useEffect, useState } from "react";
import Auth from "./auth";

export const useAuth = () => {
  const [auth, setAuth] = useState();

  useEffect(() => {
    setAuth(new Auth());
  }, []);

  return auth;
};
