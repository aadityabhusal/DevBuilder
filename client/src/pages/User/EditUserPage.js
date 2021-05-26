import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { UserContext } from "../../contexts/UserContext";

const EditContainer = styled.div`
  margin-top: 20px;
  flex: 0 0 400px;
  padding: 20px;
  box-shadow: 0 5px 20px 0 #444;
`;

export const Form = styled.form`
  margin: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const EditUserInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #666;
  border-radius: 3px;
  margin-bottom: 10px;
  outline: 0;
  font-size: 15px;
`;

export const EditUserButton = styled.button`
  padding: 10px;
  border-radius: 3px;
  border: none;
  color: #fff;
  background-color: #34495e;
  cursor: pointer;
  outline: 0;
`;

export const SuccessMessage = styled.div`
  padding: 10px;
  border: 1px solid 34495e;
  box-shadow: 0 2px 5px 0 #444;
  margin-bottom: 20px;
  color: #34495e;
  text-align: center;
`;

export function EditUserPage({ history }) {
  const [user, setUser] = useState();
  const [password, setPassword] = useState("");
  const [updated, setUpdated] = useState(false);
  const { user: authUser, setUser: setAuthUser, setToken } = useContext(
    UserContext
  );
  const { userId } = useParams();

  useEffect(() => {
    setUser(authUser);
  }, [authUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.trim() !== "") {
      user.password = password;
    }
    try {
      let response = await (
        await fetch(`/user/${userId}`, {
          method: "put",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
      ).json();
      if (!response.error) {
        setAuthUser(response);
        setUpdated(true);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleInput = (e, field) => {
    setUser((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const deleteUser = async () => {
    try {
      let response = await fetch(`/user/${userId}`, {
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.error) {
        localStorage.removeItem("token");
        window.location = "http://localhost:3000";
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return user ? (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <EditContainer>
        <h1 style={{ textAlign: "center" }}>Update your profile</h1>
        {updated && <SuccessMessage>Your profile was updated!</SuccessMessage>}
        <Form onSubmit={handleSubmit} method="POST">
          <EditUserInput
            type="text"
            placeholder="Enter your First Name"
            value={user.firstName}
            onChange={(e) => handleInput(e, "firstName")}
            required
          ></EditUserInput>
          <EditUserInput
            type="text"
            placeholder="Enter your Last Name"
            value={user.lastName}
            onChange={(e) => handleInput(e, "lastName")}
            required
          ></EditUserInput>
          <EditUserInput
            type="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={(e) => handleInput(e, "email")}
            required
          ></EditUserInput>
          <EditUserInput
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></EditUserInput>
          <EditUserButton>Update Profile</EditUserButton>
        </Form>
        <EditUserButton
          onClick={deleteUser}
          style={{
            marginTop: "20px",
            width: "100%",
            border: "none",
            background: "#e74c3c",
          }}
        >
          Delete Profile
        </EditUserButton>
      </EditContainer>
    </div>
  ) : (
    <h2>Loading...</h2>
  );
}
