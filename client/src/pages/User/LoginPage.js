import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import styled from "styled-components";
import { UserContext } from "../../contexts/UserContext";

const LoginSection = styled.div`
  display: flex;
  justify-content: center;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 320px;
  border: 1px solid #bdc3c7;
  margin-top: 40px;
  padding: 20px;
  box-shadow: 0 5px 10px 0 #bdc3c7;

  & h1 {
    text-align: center;
    margin-bottom: 50px;
  }

  & form {
    margin: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  & input,
  button {
    padding: 10px;
    font-size: 16px;
    margin-bottom: 20px;
    border: 1px solid #34495e;
    outline: 0;
  }

  & button {
    background-color: #34495e;
    color: #fff;
    margin-top: 30px;
    cursor: pointer;
    transition: 0.2s ease all;
    box-shadow: 0 5px 10px 0 #bdc3c7;
  }

  & button:hover {
    box-shadow: none;
  }
`;

export function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setToken } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      email,
      password,
    };

    try {
      let response = await (
        await fetch(`/user/login`, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        })
      ).json();

      if (!response.error) {
        localStorage.setItem("token", response.token);
        setToken(response.token);
        props.history.push("/user/" + response.uid);
      }
      throw new Error(response.error);
    } catch (error) {}
  };

  return !user ? (
    <LoginSection>
      <LoginBox>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} method="POST">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button>Login</button>
        </form>
      </LoginBox>
    </LoginSection>
  ) : (
    <Redirect to={`/user/${user._id}`} />
  );
}
