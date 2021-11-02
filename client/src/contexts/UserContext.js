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
    try {
      const { _id, firstName, lastName } = jwt_decode(accessToken);
      return { _id, firstName, lastName } || false;
    } catch (error) {
      return false;
    }
  };

  const authFetch = async (url, method, body = {}, headers = {}) => {
    try {
      if (body.body) body.body = JSON.stringify(body.body);
      let response = await fetch(url, {
        method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.accessToken,
          ...headers,
        },
        ...body,
      });
      return await response.json();
    } catch (error) {
      return error;
    }
  };

  const fetchTokens = async (refreshToken) => {
    return await authFetch(`/auth/refreshToken`, "POST", {
      body: { refreshToken },
    });
  };

  useEffect(() => {
    if (token.refreshToken) {
      const setTokens = async (accessToken, refreshToken) => {
        let currentDate = new Date();
        if (!accessToken) return;
        try {
          let decodedToken = jwt_decode(accessToken);
          if (decodedToken.exp * 1000 < currentDate.getTime()) {
            let data = await fetchTokens(refreshToken);
            if (data.status) data = { accessToken: "", refreshToken: "" };
            setNewToken(data.accessToken, data.refreshToken);
          }
        } catch (error) {}
      };
      setTokens(token.accessToken, token.refreshToken);
    }
  }, [token]);

  return (
    <UserContext.Provider
      value={{ user: isAuthed(), token, authFetch, setNewToken }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
