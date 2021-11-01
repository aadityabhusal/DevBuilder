import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import { SignupBox, SignupSection } from "../../components/auth/SignUp";
import { UserContext } from "../../contexts/UserContext";

export function SignupPage(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      firstName,
      lastName,
      email,
      password,
    };
    try {
      let response = await fetch(`/user/signup`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.error) {
        props.history.push("/login");
      }
      throw new Error(response.error);
    } catch (error) {}
  };

  return !user ? (
    <SignupSection>
      <SignupBox>
        <h1>Signup</h1>
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
          <button>Signup</button>
        </form>
      </SignupBox>
    </SignupSection>
  ) : (
    <Redirect to={`/user/${user._id}`} />
  );
}
