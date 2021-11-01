import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import { LoginBox, LoginSection } from "../../components/auth/Login";
import { UserContext } from "../../contexts/UserContext";

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
