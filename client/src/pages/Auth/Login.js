import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { Links, LoginBox, LoginSection } from "../../components/auth/Login";
import { UserContext } from "../../contexts/UserContext";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, setToken } = useContext(UserContext);
  const history = useHistory();

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
        history.push("/user/" + response.uid);
      }
      throw new Error(response.error);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    // !user ? (
    <LoginSection>
      <LoginBox>
        <h1>Log In</h1>
        {error && <div>{error}</div>}
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
          <button disabled={!email || !password}>Log In</button>
        </form>
        <Links>
          <Link to="/signup">Create Account</Link>
          <Link to="/forgot-password">Forgot Password</Link>
        </Links>
      </LoginBox>
    </LoginSection>
    // ) : (
    //   <Redirect to={`/user/${user._id}`} />
    // );
  );
}
