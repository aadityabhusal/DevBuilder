import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { UserContext } from "../../contexts/UserContext";
import {
  DialogAction,
  DialogBox,
  DialogHead,
  DialogOverlay,
  DialogText,
} from "../Editor/components/DialogBox";

const EditContainer = styled.div`
  position: relative;
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
  color: #fff;
  background: #2ecc71;
  text-align: center;
`;

export function EditUserPage({ history }) {
  const [user, setUser] = useState();
  const [password, setPassword] = useState("");
  const [updated, setUpdated] = useState(false);
  const { user: authUser, setUser: setAuthUser } = useContext(UserContext);
  const [dialogBox, setDialogBox] = useState(false);
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
        {dialogBox && (
          <DialogOverlay>
            <DialogBox>
              <DialogHead>
                <svg height="16px" viewBox="0 0 20 20" width="24px" fill="#000">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                </svg>
                Delete Profile
              </DialogHead>
              <DialogText>
                Are you sure you want to delete your profile?
              </DialogText>
              <DialogAction>
                <EditUserButton
                  style={{ background: "#e74c3c" }}
                  onClick={deleteUser}
                >
                  Delete
                </EditUserButton>
                <EditUserButton onClick={(e) => setDialogBox(false)}>
                  Cancel
                </EditUserButton>
              </DialogAction>
            </DialogBox>
          </DialogOverlay>
        )}
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
          onClick={(e) => setDialogBox(true)}
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
