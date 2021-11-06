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
      const { _id, firstName, lastName, status } = jwt_decode(accessToken);
      return { _id, firstName, lastName, status } || false;
    } catch (error) {
      return false;
    }
  };

  const innerFetch = async (url, method, token, body = {}) => {
    try {
      if (body.body) body.body = JSON.stringify(body.body);
      let response = await fetch(url, {
        method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        ...body,
      });
      return await response.json();
    } catch (error) {
      return { status: 401, message: "Unathorized Access" };
    }
  };

  const getNewTokens = async ({ accessToken, refreshToken }) => {
    try {
      let currentDate = new Date();
      if (!accessToken || !refreshToken) return ["", ""];
      let decodedToken = jwt_decode(accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        let data = await innerFetch(
          `/api/auth/refreshToken`,
          "POST",
          accessToken,
          {
            body: { refreshToken },
          }
        );

        if (data.status) return ["", ""];
        return [data.accessToken, data.refreshToken];
      }
      return [accessToken, refreshToken];
    } catch (error) {
      return ["", ""];
    }
  };

  const authFetch = async (url, method, body = {}, headers = {}) => {
    try {
      let [accessToken, refreshToken] = await getNewTokens(token);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      let result = await innerFetch(url, method, accessToken, body, headers);
      if (result.status) window.location.href = window.origin;
      else return result;
    } catch (error) {
      return { status: 401, message: "Unathorized Access" };
    }
  };

  useEffect(() => {
    async function checkTokens() {
      let [accessToken, refreshToken] = await getNewTokens(token);
      setNewToken(accessToken, refreshToken);
    }
    checkTokens();
  }, []);

  return (
    <UserContext.Provider
      value={{ user: isAuthed(), token, authFetch, setNewToken }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
