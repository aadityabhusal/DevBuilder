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

export function EditUserPage() {
  const [user, setUser] = useState();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { authFetch, setNewToken } = useContext(UserContext);
  const [dialogBox, setDialogBox] = useState(false);
  const { userId } = useParams();

  useEffect(() => {
    const getUser = async (userId) => {
      try {
        let { email, firstName, lastName } = await authFetch(
          `/user/${userId}`,
          "GET"
        );
        setUser({ email, firstName, lastName });
      } catch (error) {}
    };
    getUser(userId);
  }, [userId, authFetch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.trim() !== "") {
      user.password = password;
    }
    try {
      let response = await authFetch(`/user/${userId}`, "PUT", {
        body: user,
      });
      if (response.status) setError(response.message);
      else {
        const { accessToken, refreshToken } = response;
        setNewToken(accessToken, refreshToken);
        setSuccess(true);
      }
    } catch (error) {}
  };

  const handleInput = (e, field) => {
    setUser((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const deleteUser = async () => {
    try {
      let response = await authFetch(`/user/${userId}`, "DELETE", {
        body: user,
      });

      if (response.status) setError(response.message);
      else {
        setNewToken("", "");
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
        {success && <SuccessMessage>Your profile was updated</SuccessMessage>}
        {error && <div>{error}</div>}
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
    <h2 style={{ textAlign: "center" }}>Loading...</h2>
  );
}
