import { useContext, useState } from "react";
import { Redirect } from "react-router";
import { SignupBox, SignupSection } from "../../components/auth/SignUp";
import { UserContext } from "../../contexts/UserContext";

export function ResetPassword({ location }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { user } = useContext(UserContext);
  const search = location.search;
  const passwordResetKey = new URLSearchParams(search).get("passwordResetKey");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await (
        await fetch(`/auth/reset-password`, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password, passwordResetKey }),
        })
      ).json();

      if (response.status) setError(response.message);
      else {
        setPassword("");
        setConfirmPassword("");
        setSuccess(true);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return !user && passwordResetKey ? (
    <SignupSection>
      <SignupBox>
        <h1>Reset Password</h1>
        {error && <div style={{ color: "#c0392b" }}>Error: {error}</div>}
        {success ? (
          <div style={{ color: "#27ae60", textAlign: "center" }}>
            Password Reset Successful
          </div>
        ) : (
          <form onSubmit={handleSubmit} method="POST">
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
            <button disabled={!password || password !== confirmPassword}>
              Reset Password
            </button>
          </form>
        )}
      </SignupBox>
    </SignupSection>
  ) : (
    <Redirect to="/" />
  );
}
