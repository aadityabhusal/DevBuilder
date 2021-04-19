import { useEffect, useState } from "react";

export const useAuth = () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let response = await fetch(`/user/auth`, {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        let user = await response.json();
        if (!user.error) {
          setAuth(user);
        }
      } catch (error) {}
    })();
  }, []);

  return auth;
};
