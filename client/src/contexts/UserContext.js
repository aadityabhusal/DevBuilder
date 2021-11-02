import React, { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [token, setToken] = useState(() => ({
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
  }));

  const setNewToken = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setToken({ accessToken, refreshToken });
  };

  const isAuthed = () => {
    let { accessToken } = token;
    if (!accessToken) return false;
    const { _id, email, firstName, lastName } = jwt_decode(accessToken);
    return { _id, email, firstName, lastName } || false;
  };

  const fetchTokens = async (accessToken, refreshToken) => {
    return await (
      await fetch(`/auth/refreshToken`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      })
    ).json();
  };

  useEffect(() => {
    if (token.refreshToken) {
      const setTokens = async (accessToken, refreshToken) => {
        let currentDate = new Date();
        if (!accessToken) return;
        let decodedToken = jwt_decode(accessToken);
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          const data = await fetchTokens(accessToken, refreshToken);
          setNewToken(data.accessToken, data.refreshToken);
        }
        return;
      };
      setTokens(token.accessToken, token.refreshToken);
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ user: isAuthed(), token, setNewToken }}>
      {props.children}
    </UserContext.Provider>
  );
};
