import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { Links } from "../../components/auth/Login";
import { SignupBox, SignupSection } from "../../components/auth/SignUp";
import { UserContext } from "../../contexts/UserContext";

export function Signup(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { user, setNewToken } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      firstName,
      lastName,
      email,
      password,
    };

    try {
      let response = await (
        await fetch(`/auth/register`, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
      ).json();

      if (response.status) setError(response.message);
      else {
        const { accessToken, refreshToken } = response;
        setNewToken(accessToken, refreshToken);
      }
    } catch (error) {}
  };

  return !user ? (
    <SignupSection>
      <SignupBox>
        <h1>Sign Up</h1>
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit} method="POST">
          <input
            type="text"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></input>
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
          <input
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
          <button
            disabled={!email || !password || password !== confirmPassword}
          >
            Sign Up
          </button>
        </form>
        <Links>
          <div>Already have an account?</div>
          <Link to="/login">Log In</Link>
        </Links>
      </SignupBox>
    </SignupSection>
  ) : (
    <Redirect to={`/user/${user._id}`} />
  );
}
