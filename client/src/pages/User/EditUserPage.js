import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  EditContainer,
  EditUserButton,
  EditUserInput,
  Form,
  SuccessMessage,
} from "../../components/user/EditUser";
import { UserContext } from "../../contexts/UserContext";
import {
  DialogAction,
  DialogBox,
  DialogHead,
  DialogOverlay,
  DialogText,
} from "../../components/common/DialogBox";

export function EditUserPage({ history, user: authUser }) {
  const [user, setUser] = useState();
  const [password, setPassword] = useState("");
  const [updated, setUpdated] = useState(false);
  const { token, setNewToken } = useContext(UserContext);
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
        setNewToken("", token.refreshToken);
        setUpdated(true);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {}
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
    } catch (error) {}
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
