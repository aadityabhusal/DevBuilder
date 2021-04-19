import React, { useState } from "react";
import styled from "styled-components";

const SignupSection = styled.div`
  display: flex;
  justify-content: center;
`;

const SignupBox = styled.div`
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

export function SignupPage(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      firstName,
      lastName,
      email,
      password,
    };
    try {
      await fetch(`/user/signup`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      props.history.push("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
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
  );
}
