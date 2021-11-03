import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Redirect } from "react-router-dom";

export function VerifyEmail() {
  const { user } = useContext(UserContext);
  console.log(user);
  return user && user.status === 0 ? (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <h1>Thanks for signing up</h1>
      <p>A verification email is sent to the email address you provided</p>
      <p>Please verify your email to continue using the site.</p>
    </div>
  ) : (
    <Redirect to="/" />
  );
}
