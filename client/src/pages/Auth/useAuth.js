import { useEffect, useState } from "react";

export const useAuth = () => {
  const [auth, setAuth] = useState(null);
  const [loggedIn, setLoggedIn] = useState();
  useEffect(() => {
    (async () => {
      try {
        if (!loggedIn) {
          let response = await fetch(`/user/auth`, {
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
          let user = await response.json();
          if (!user.error) {
            setAuth(user);
            setLoggedIn(true);
          }
        }
      } catch (error) {}
    })();
  }, [loggedIn]);

  return { auth, setAuth, loggedIn, setLoggedIn };
};
